import { ActivityModel } from "./../Models";

const isNonEmptyString = (
    value: unknown,
): value is string =>
    typeof value === "string" && value.trim().length > 0;
export type FlashCardItem = {
    id: string;
    question: string;
    english: string;
    targetLang: string;
    phonetics?: string;

    distractors: {
        choices: string[];
        translations: string[];
        transliterations: string[];
    };

    learningHint: string;

    meta?: {
        subject?: string;
        tense?: string;
        [key: string]: string | undefined;
    };
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

        if (!isNonEmptyString(it.question)) {
            console.log("question invalid");
            return false;
        }

        if (!isNonEmptyString(it.english)) {
            console.log("english invalid");
            return false;
        }

        if (!isNonEmptyString(it.targetLang)) {
            console.log("targetLang invalid");
            return false;
        }

        if (
            it.phonetics !== undefined &&
            !isNonEmptyString(it.phonetics)
        ) {
            console.log("phonetics invalid");
            return false;
        }

        // ✅ distractors (replaces wrongAnswers + ansOptions)
        if (
            typeof it.distractors !== "object" ||
            it.distractors === null
        ) {
            console.log("distractors missing");
            return false;
        }

        const d = it.distractors as Record<string, unknown>;

        if (
            !Array.isArray(d.choices) ||
            !Array.isArray(d.translations) ||
            !Array.isArray(d.transliterations)
        ) {
            console.log("distractors arrays missing");
            return false;
        }

        const len = d.choices.length;

        if (
            len === 0 ||
            d.translations.length !== len ||
            d.transliterations.length !== len
        ) {
            console.log("distractors length mismatch");
            return false;
        }

        if (
            !d.choices.every(isNonEmptyString) ||
            !d.translations.every(isNonEmptyString) ||
            !d.transliterations.every(isNonEmptyString)
        ) {
            console.log("distractors invalid values");
            return false;
        }

        if (!isNonEmptyString(it.learningHint)) {
            console.log("learningHint invalid");
            return false;
        }

        // ✅ meta optional
        if (it.meta !== undefined) {
            if (
                typeof it.meta !== "object" ||
                it.meta === null
            ) {
                console.log("meta invalid");
                return false;
            }

            const meta = it.meta as Record<string, unknown>;

            if (
                meta.subject !== undefined &&
                !isNonEmptyString(meta.subject)
            ) {
                console.log("meta.subject invalid");
                return false;
            }

            if (
                meta.tense !== undefined &&
                !isNonEmptyString(meta.tense)
            ) {
                console.log("meta.tense invalid");
                return false;
            }
        }

        return true;
    }
}
