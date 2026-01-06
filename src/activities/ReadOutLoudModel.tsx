import { ActivityModel } from "./Models";
type ReadOutLoudItem = {
    text: string;
    phonemes: string[];
};

export class ReadOutLoudModel extends ActivityModel<ReadOutLoudItem> {
    protected isValidItem(
        item: unknown
    ): item is ReadOutLoudItem {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        return (
            typeof it.text === "string" &&
            Array.isArray(it.phonemes) &&
            it.phonemes.every(
                (p: any) => typeof p === "string"
            )
        );
    }
}
