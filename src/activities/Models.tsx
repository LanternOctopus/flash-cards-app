export type ActivityModelClass<TItem> = new (
    raw: unknown
) => ActivityModel<TItem>;

export abstract class ActivityModel<TItem> {
    protected rawData!: Record<string, TItem[]>;

    constructor(raw: unknown) {
        if (!this.isValidSet(raw)) {
            throw new Error("Invalid activity data");
        }
        this.rawData = raw;
    }

    protected isValidSet(
        data: unknown
    ): data is Record<string, TItem[]> {
        if (typeof data !== "object" || data === null)
            return false;

        return Object.values(data).every(
            (set) =>
                Array.isArray(set) &&
                set.every((item) => this.isValidItem(item))
        );
    }

    protected abstract isValidItem(
        item: unknown
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
}
type PictureItem = {
    picture: string;
    answer: string;
    question: string;
    translation?: string;
    transliteration?: string;
    meta?: Record<string, { value: any }>;
    ansOptions?: Record<string, string[]>;
};

export class PictureMatchingGameModel extends ActivityModel<PictureItem> {
    protected isValidItem(
        item: unknown
    ): item is PictureItem {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        if (typeof it.picture !== "string") return false;
        if (typeof it.answer !== "string") return false;

        if (it.ansOptions) {
            if (
                typeof it.ansOptions !== "object" ||
                !Object.values(it.ansOptions).every(
                    (v) =>
                        Array.isArray(v) &&
                        v.every(
                            (s) => typeof s === "string"
                        )
                )
            )
                return false;
        }

        return true;
    }
}
