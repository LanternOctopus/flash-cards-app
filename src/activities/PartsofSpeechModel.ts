import { ActivityModel } from "./Models";
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

    constructor(raw: unknown) {
        super(raw);
        this.remainingAnswers = [];
        this.wrongAnswerCount = 0;
        this.checkCorrectness =
            this.checkCorrectness.bind(this);
        Object.values(this.rawData).every((set) =>
            set.every((item) => this.addWords(item))
        );
    }
    protected isValidItem(
        item: unknown
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
    checkCorrectness(rawWord: string) {
        const words = stripPunctuation(
            expandContractions(rawWord)
        ).split(" ");
        console.log("words", words);
        // Find the first remaining answer that matches one of the words
        const matched = this.remainingAnswers.find((ans) =>
            words.includes(ans)
        );
        console.log("matched", matched);

        if (matched) {
            // Remove the matched word from remainingAnswers
            this.remainingAnswers =
                this.remainingAnswers.filter(
                    (a) => a !== matched
                );

            const done = this.remainingAnswers.length === 0;
            return { correct: true, done };
        }

        this.wrongAnswerCount++;
        const done = this.wrongAnswerCount >= 3;
        return { correct: false, done };
    }

    nextItem() {
        if (!this._generator)
            return { item: null, done: true };
        const iteratorResult = this._generator.next();
        console.log("iteratorResult", iteratorResult);
        const { value, done } = iteratorResult;

        if (!done && value) {
            console.log("value", value);
            this.remainingAnswers = Array.isArray(
                value.answer
            )
                ? [...value.answer]
                : [value.answer];
            console.log(
                "this.remainingAnswers",
                this.remainingAnswers
            );
            this.wrongAnswerCount = 0;
            this.currentItem = value;
        }

        return iteratorResult;
    }
}
