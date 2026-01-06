import { ActivityModel } from "./Models";
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
