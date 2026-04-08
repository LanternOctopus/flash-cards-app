export interface WithId {
    id: string;
}
export type CheckResult = {
    correct: boolean;
    done: boolean;
};
export type ActivityModelClass<TItem extends WithId> = new (
    raw: unknown,
) => ActivityModel<TItem>;
function genKey() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10)
    );
}

export abstract class ActivityModel<TItem extends WithId> {
    protected rawData!: Record<string, TItem[]>;
    protected _generator: Generator<any> | null = null;
    protected answers: Record<string, boolean> = {};
    private CACHE_KEY = this.getProgressCacheKey();
    private TTL = 60 * 60 * 1000; // 1 hour
    private currentId: string | null = null;
    protected answer: any = null;
    public score: number = 0;
    onScoreChange: (score: number) => void;
    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        const cached = this.getCache(this.CACHE_KEY);
        this.onScoreChange = scorechangeCallback;
        const cachedScores = this.getCache(
            this.getScoreCacheKey(),
        );
        if (cached) {
            this.currentId = cached.lastQuestionId;
            this.rawData = this.resumeFromLast(cached);
            if (cachedScores && cachedScores.scores) {
                this.answers = cachedScores.scores; // Sync the local answers record
                this.score = this.countCorrectAnswers(
                    this.answers,
                ); // Calculate initial score
                this.onScoreChange(this.score); // Tell the UI what the score is immediately
            }
            return;
        }

        if (!this.isValidSet(raw)) {
            throw new Error("Invalid activity data");
        }

        Object.values(raw).forEach((set) =>
            set.forEach((item) => this.addId(item)),
        );

        this.rawData = raw as Record<string, TItem[]>;

        this.setCache(this.CACHE_KEY, {
            data: this.rawData,
            lastQuestionId: null,
        });
    }

    // ------------------------
    // Cache helpers
    // ------------------------
    private getProgressCacheKey(): string {
        return `activity_progress_${window.location.hash}`;
    }

    private getScoreCacheKey(): string {
        return `activity_score_${window.location.hash}`;
    }
    private getCache(key: string) {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (Date.now() > parsed.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return parsed;
    }

    private setCache(
        key: string,
        data: Record<string, any>,
    ) {
        localStorage.setItem(
            key,
            JSON.stringify({
                ...data,
                expiry: Date.now() + this.TTL,
            }),
        );
    }
    protected updateProgress(id: string) {
        const cache = this.getCache(
            this.getProgressCacheKey(),
        ) || { lastQuestionId: null };
        cache.lastQuestionId = id;
        this.setCache(this.getProgressCacheKey(), cache);
    }

    protected getProgress() {
        const cache = this.getCache(
            this.getProgressCacheKey(),
        );
        return cache?.lastQuestionId ?? null;
    }
    protected saveScore(id: string, correct: boolean) {
        const cache = this.getCache(
            this.getScoreCacheKey(),
        ) || { scores: {} };
        cache.scores[id] = correct;
        this.setCache(this.getScoreCacheKey(), cache);
    }
    countCorrectAnswers = (
        scores: Record<string, boolean>,
    ): number => {
        return Object.values(scores).filter(
            (v) => v === true,
        ).length;
    };
    protected getScore(id?: string) {
        const cache = this.getCache(
            this.getScoreCacheKey(),
        );
        console.log("Cache", cache);
        if (!cache) return null;
        console.log(
            "Loaded scores from cache:",
            cache.scores,
        );

        if (id) return cache.scores[id] ?? null;
        return cache.scores; // return all scores if no id
    }
    // ------------------------
    // Resume logic
    // ------------------------

    private resumeFromLast(cache: {
        data: Record<string, TItem[]>;
        lastQuestionId: string | null;
        answers?: Record<string, { correct: boolean }>; // optional score info
    }): Record<string, TItem[]> {
        if (!cache.lastQuestionId) return cache.data;

        const result: Record<string, TItem[]> = {};

        for (const key in cache.data) {
            const set = cache.data[key];
            const index = set.findIndex(
                (item) => item.id === cache.lastQuestionId,
            );

            if (index === -1) {
                result[key] = set;
            } else {
                // slice from the last question + include its state
                const sliced = set.slice(index);

                // attach score info if available
                result[key] = sliced.map((item) => ({
                    ...item,
                    // @ts-ignore – only attach if we have it
                    answeredCorrectly:
                        cache.answers?.[item.id]?.correct ??
                        null,
                }));
            }
        }

        return result;
    }
    protected isValidSet(
        data: unknown,
    ): data is Record<string, TItem[]> {
        if (typeof data !== "object" || data === null)
            return false;

        return Object.values(data).every(
            (set) =>
                Array.isArray(set) &&
                set.every((item) => this.isValidItem(item)),
        );
    }
    protected addId(item: TItem) {
        item.id = genKey();
        return item;
    }
    protected abstract isValidItem(
        item: unknown,
    ): item is TItem;

    protected getFirstSetName(): string {
        return Object.keys(this.rawData)[0];
    }

    protected getSet(setName?: string): TItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.rawData[key];
    }

    *getGenerator(setName?: string): Generator<TItem> {
        const set = this.getSet(setName);
        for (const item of set) yield item;
    }
    initializeGenerator() {
        this._generator = this.getGenerator();
    }
    nextItem(): IteratorResult<any> {
        if (!this._generator)
            return { value: null, done: true }; // always "value"

        return this._generator.next(); // generator already returns { value, done }
    }

    goNext() {
        const result = this.nextItem();

        if (!result.done && result.value?.id) {
            this.currentId = result.value.id;
            this.answer = result.value.answer; // assuming each item has an 'answer' property
            this.updateProgress(result.value.id);
        }

        return result;
    }
    checkCorrectness = (userAnswer: any): CheckResult => {
        if (this.answer == undefined) {
            console.warn(
                "checkCorrectness called before answer is set",
            );
            return { correct: false, done: false }; // or whatever default
        }

        if (Array.isArray(this.answer)) {
            const correct =
                Array.isArray(userAnswer) &&
                userAnswer.length === this.answer.length &&
                userAnswer.every(
                    (v, i) => v === this.answer[i],
                );
            return { correct, done: correct };
        }

        return {
            correct: userAnswer === this.answer,
            done: true,
        };
    };
    submitAnswer = (userAnswer: any): any => {
        const correct = this.checkCorrectness(userAnswer);
        const cache = this.getCache(
            this.getScoreCacheKey(),
        );
        if (this.currentId) {
            this.answers[this.currentId] = correct.correct;
            this.saveScore(this.currentId, correct.correct);
            this.score = this.countCorrectAnswers(
                this.answers || {},
            );
            this.onScoreChange(this.score);
        } else {
            console.warn(
                "submitAnswer called but currentId is null",
            );
        }
        return correct; // for UI to consume
    };
    getImageUrl = (image: string) => {
        return `${process.env.PUBLIC_URL}/images/${image}`;
    };
    getTotalScore() {
        console.log(
            "Calculating total score from rawData",
            this.rawData,
        );
        return this.getSet().length;
    }
}
