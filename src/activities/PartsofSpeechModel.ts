import { ActivityModel, CheckResult } from "./Models";
import expandContractions from "../utils/expandContractions";
import { stripPunctuation } from "../utils/utils";
type PartsofSpeechItemNew = {
    id: string;
    text: string;
    answer: string[];
    words: string[];
};
export class PartsofSpeechModel extends ActivityModel<PartsofSpeechItemNew> {
    protected remainingAnswers: string[];
    protected wrongAnswerCount: number;
    protected currentItem: PartsofSpeechItemNew | null =
        null;

    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        console.log("raw", raw);
        super(raw, scorechangeCallback);
        this.remainingAnswers = [];
        this.wrongAnswerCount = 0;
        this.checkCorrectness =
            this.checkCorrectness.bind(this);
        Object.values(this.rawData).every((set) =>
            set.every((item) => this.addWords(item)),
        );
    }
    protected isValidItem(
        item: unknown,
    ): item is PartsofSpeechItemNew {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        if (typeof it.text !== "string") {
            console.log("text is not a string");
            return false;
        }
        if (!Array.isArray(it.answer)) {
            console.log("answer is not an array");
            return false;
        }
        return true;
    }
    protected addWords(item: PartsofSpeechItemNew) {
        const splitWords = item.text.split(" ");
        item.words = splitWords;
        return true;
    }
    checkCorrectness = (rawWord: string): CheckResult => {
        const words = stripPunctuation(
            expandContractions(rawWord),
        ).split(" ");
        const matched = this.remainingAnswers.find((ans) =>
            words.includes(ans),
        );

        if (matched) {
            this.remainingAnswers =
                this.remainingAnswers.filter(
                    (a) => a !== matched,
                );
            return {
                correct: true,
                done: this.remainingAnswers.length === 0,
            };
        }

        this.wrongAnswerCount++;
        return {
            correct: false,
            done: this.wrongAnswerCount >= 3,
        };
    };

    nextItem(): IteratorResult<any> {
        if (!this._generator)
            return { value: null, done: true };

        const iteratorResult = this._generator.next();
        const { value, done } = iteratorResult;

        if (!done && value) {
            this.remainingAnswers = Array.isArray(
                value.answer,
            )
                ? [...value.answer]
                : [value.answer];
            this.wrongAnswerCount = 0;
            this.currentItem = value;
        }

        return iteratorResult;
    }
}
