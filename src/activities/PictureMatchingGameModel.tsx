import { ActivityModel } from "./Models";
type PictureItem = {
    id: string;
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

        if (typeof it.picture !== "string") {
            console.log("picture is not a string");
            return false;
        }

        if (typeof it.answer !== "string") {
            console.log("answer is not a string");
            return false;
        }
        if (typeof it.question !== "string") {
            console.log("question is not a string");
            return false;
        }
        if (typeof it.ansOptions !== "object") {
            console.log("ansOptions is not an object");
            return false;
        }
        if (!Array.isArray(it.ansOptions.choices)) {
            console.log(
                "ansOptions.choices is not an array"
            );
            return false;
        }
        if (it.ansOptions.choices.length === 0) {
            console.log("ansOptions.choices is empty");
            return false;
        }
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
