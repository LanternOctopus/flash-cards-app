import { ActivityModel } from "./Models";
import expandContractions from "../utils/expandContractions";
type PartsofSpeechItemNew = {
    text: string;
    answer: string[];
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
    }
    protected isValidItem(
        item: unknown
    ): item is PartsofSpeechItemNew {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        if (typeof it.text !== "string") return false;
        if (!Array.isArray(it.answer)) return false;
        return true;
    }
    checkCorrectness(rawWord: string) {
        const word = expandContractions(rawWord);

        const isCorrect =
            this.remainingAnswers.includes(word);

        if (isCorrect) {
            this.remainingAnswers =
                this.remainingAnswers.filter(
                    (a) => a !== word
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
        const { value, done } = iteratorResult;

        if (!done && value) {
            this.remainingAnswers = Array.isArray(
                value.answer
            )
                ? [...value.answer]
                : [value.answer];
            this.wrongAnswerCount = 0;
            this.currentItem = value;
        }

        return iteratorResult;
    }
}
