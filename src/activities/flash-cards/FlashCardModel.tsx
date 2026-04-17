import { ActivityModel } from "./../Models";
import { WithId } from "./../Models";
const isNonEmptyString = (
    value: unknown,
): value is string =>
    typeof value === "string" && value.trim().length > 0;
export type FlashCardItem = {
    id: string;
    question: string; // was verb
    english: string;
    targetLang: string;
    phonetics?: string;
    wrongAnswers: string[];
    learningHint: string;
    meta: Record<string, string>;
};

export class FlashCardModel<
    TItem extends WithId,
> extends ActivityModel<TItem> {
    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        super(raw, scorechangeCallback);
        console.log("raw", raw);
    }

    protected isValidItem(item: unknown): item is TItem {
        if (typeof item !== "object" || item === null) {
            console.log("item is not an object");
            return false;
        }

        const it = item as Record<string, unknown>;

        if (!isNonEmptyString(it.question)) {
            console.log("question is missing or invalid");
            return false;
        }

        if (!isNonEmptyString(it.english)) {
            console.log("english is missing or invalid");
            return false;
        }

        if (!isNonEmptyString(it.targetLang)) {
            console.log("targetLang is missing or invalid");
            return false;
        }

        if (
            it.phonetics !== undefined &&
            !isNonEmptyString(it.phonetics)
        ) {
            console.log("phonetics is invalid");
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

        // ✅ meta validation
        if (
            typeof it.meta !== "object" ||
            it.meta === null
        ) {
            console.log("meta is missing or invalid");
            return false;
        }

        const meta = it.meta as Record<string, unknown>;

        if (!isNonEmptyString(meta.subject)) {
            console.log(
                "meta.subject is missing or invalid",
            );
            return false;
        }

        if (!isNonEmptyString(meta.tense)) {
            console.log("meta.tense is missing or invalid");
            return false;
        }

        return true;
    }
}
