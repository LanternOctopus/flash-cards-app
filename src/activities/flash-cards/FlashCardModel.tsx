import { ActivityModel } from "./../Models";

const isNonEmptyString = (
    value: unknown,
): value is string =>
    typeof value === "string" && value.trim().length > 0;

export type FlashCardItem = {
    id: string;

    // ✅ prompt
    prompt_en: string;
    prompt_targetLang: string;
    prompt_phonetics?: string;

    // ✅ answer
    answer: string;
    answer_targetLang: string;
    answer_phonetics?: string;

    // ✅ distractors
    distractors: {
        en: string[];
        targetLang: string[];
        phonetics: string[];
    };

    learningHint: string;
};

export class FlashCardModel extends ActivityModel<FlashCardItem> {
    constructor(
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) {
        super(raw, scorechangeCallback);
        console.log("raw", raw);
    }

    protected isValidItem(
        item: unknown,
    ): item is FlashCardItem {
        if (typeof item !== "object" || item === null) {
            console.log("item is not an object");
            return false;
        }

        const it = item as Record<string, unknown>;

        // ✅ prompts
        if (!isNonEmptyString(it.prompt_en)) {
            console.log("prompt_en invalid");
            return false;
        }

        if (!isNonEmptyString(it.prompt_targetLang)) {
            console.log("prompt_targetLang invalid");
            return false;
        }

        if (
            it.prompt_phonetics !== undefined &&
            !isNonEmptyString(it.prompt_phonetics)
        ) {
            console.log("prompt_phonetics invalid");
            return false;
        }

        // ✅ answers
        if (!isNonEmptyString(it.answer)) {
            console.log("answer invalid");
            return false;
        }

        if (!isNonEmptyString(it.answer_targetLang)) {
            console.log("answer_targetLang invalid");
            return false;
        }

        if (
            it.answer_phonetics !== undefined &&
            !isNonEmptyString(it.answer_phonetics)
        ) {
            console.log("answer_phonetics invalid");
            return false;
        }

        // ✅ distractors
        if (
            typeof it.distractors !== "object" ||
            it.distractors === null
        ) {
            console.log("distractors missing");
            return false;
        }

        const d = it.distractors as Record<string, unknown>;

        if (
            !Array.isArray(d.en) ||
            !Array.isArray(d.targetLang) ||
            !Array.isArray(d.phonetics)
        ) {
            console.log("distractors arrays missing");
            return false;
        }

        const len = d.en.length;

        if (
            len === 0 ||
            d.targetLang.length !== len ||
            d.phonetics.length !== len
        ) {
            console.log("distractors length mismatch");
            return false;
        }

        if (
            !d.en.every(isNonEmptyString) ||
            !d.targetLang.every(isNonEmptyString) ||
            !d.phonetics.every(isNonEmptyString)
        ) {
            console.log("distractors invalid values");
            return false;
        }

        // ✅ learning hint
        if (!isNonEmptyString(it.learningHint)) {
            console.log("learningHint invalid");
            return false;
        }

        return true;
    }
}
