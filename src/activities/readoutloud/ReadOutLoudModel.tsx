import { ActivityModel, CheckResult } from "../Models";
import { stripPunctuation } from "../../utils/utils";
type ReadOutLoudItem = {
    answer: string;
    phonemes: string[];
    id: string;
    chunks: string[];
    picture?: string;
    caption?: string;
    alt?: string;
};

export class ReadOutLoudModel extends ActivityModel<ReadOutLoudItem> {
    protected currentItem: ReadOutLoudItem | null = null;
    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        super(raw, scorechangeCallback);
        this.checkCorrectness =
            this.checkCorrectness.bind(this);
        Object.values(this.rawData).every((set) =>
            set.every((item) => this.addChunks(item)),
        );
    }
    protected addChunks(item: ReadOutLoudItem) {
        const chunks = item.answer.split(/(?<=[.!?\n])/g);
        item.chunks = chunks;
        return true;
    }

    checkCorrectness = (
        userAnswer: [string, string],
    ): CheckResult => {
        const [rawPhrase, target] = userAnswer;
        const spokenWords = stripPunctuation(rawPhrase)
            .toLowerCase()
            .split(" ");
        const targetWords = stripPunctuation(target)
            .toLowerCase()
            .split(" ");
        const matches = spokenWords.filter((w) =>
            targetWords.includes(w),
        ).length;
        const ratio = matches / targetWords.length;

        return { correct: ratio >= 0.6, done: true }; // done is always true for single-answer activities
    };
    protected isValidItem(
        item: unknown,
    ): item is ReadOutLoudItem {
        console.log("Validating item:", item);
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        return typeof it.answer === "string";
    }

    getImageUrl = (imageName: string) => {
        return `${process.env.PUBLIC_URL}/images/readoutloud/${imageName}`;
    };
}
