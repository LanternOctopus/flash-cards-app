import { ActivityModel } from "./Models";
import { phonemize } from "phonemize";
import { stripPunctuation } from "../utils/utils";
type ReadOutLoudItem = {
    text: string;
    phonemes: string[];
    id: string;
    chunks: string[];
    picture?: string;
    caption?: string;
    alt?: string;
};

export class ReadOutLoudModel extends ActivityModel<ReadOutLoudItem> {
    protected currentItem: ReadOutLoudItem | null = null;
    constructor(raw: unknown) {
        super(raw);
        this.checkCorrectness =
            this.checkCorrectness.bind(this);
        Object.values(this.rawData).every((set) =>
            set.every((item) => this.addChunks(item)),
        );
    }
    protected addChunks(item: ReadOutLoudItem) {
        const chunks = item.text.split(/(?<=[.!?\n])/g);
        item.chunks = chunks;
        return true;
    }

    checkCorrectness(
        rawphrase: string,
        target: string,
        setSpokenPhones: any,
    ) {
        const phrase = stripPunctuation(rawphrase);
        const spokenPhones = phonemize(phrase);
        const targetPhones = phonemize(
            stripPunctuation(target),
        );

        setSpokenPhones(rawphrase);
        const correctans = targetPhones.split(" ");
        const spoken = spokenPhones.split(" ");

        const matches = spoken.filter((p) =>
            correctans.includes(p),
        ).length;
        const ratio = matches / correctans.length;

        return { correct: ratio >= 0.5 };
    }
    protected isValidItem(
        item: unknown,
    ): item is ReadOutLoudItem {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        return (
            typeof it.text === "string" &&
            Array.isArray(it.phonemes) &&
            it.phonemes.every(
                (p: any) => typeof p === "string",
            )
        );
    }
    getImageUrl(image: string) {
        return `${process.env.PUBLIC_URL}/images/readoutloud/${image}`;
    }
}
