import { FlashCardModel } from "../activities/flash-cards/FlashCardModel";

const isNonEmptyString = (
    value: unknown,
): value is string =>
    typeof value === "string" && value.trim().length > 0;
export type GabbilamItem = {
    id: string;
    question: string;
    wrongAnswers: string[];
    learningHint: string;
    answer: string;
    passage: string;
};

export class GabbilamModel extends FlashCardModel<GabbilamItem> {
    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        super(raw, scorechangeCallback);
        console.log("raw", raw);
    }

    protected isValidItem(
        item: unknown,
    ): item is GabbilamItem {
        if (typeof item !== "object" || item === null) {
            console.log("item is not an object");
            return false;
        }

        const it = item as Record<string, unknown>;

        if (!isNonEmptyString(it.question)) {
            console.log("question is missing or invalid");
            return false;
        }

        if (!Array.isArray(it.wrongAnswers)) {
            console.log("wrongAnswers is not an array");
            return false;
        }

        if (
            it.wrongAnswers.length === 0 ||
            !it.wrongAnswers.every(isNonEmptyString)
        ) {
            console.log(
                "wrongAnswers must be a non-empty array of strings",
            );
            return false;
        }

        if (!isNonEmptyString(it.learningHint)) {
            console.log(
                "learningHint is missing or invalid",
            );
            return false;
        }

        return true;
    }
}
