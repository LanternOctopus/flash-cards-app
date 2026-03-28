import { loadSource } from "../utils/loadFile";

type Entry = [string, string, string];
type Translation = [string, string];

class LexiconModel {
    protected data: Record<string, Translation[]> = {}; // now an array of senses

    constructor(private rawData: Record<string, Entry[]>) {
        if (!this.isValidLexicon(rawData)) {
            throw new Error("Invalid lexicon data");
        }

        const lexicon: Record<string, Translation[]> = {};

        Object.values(rawData).forEach((set: Entry[]) => {
            set.forEach(
                ([word, malayalam, transliteration]) => {
                    if (!lexicon[word]) lexicon[word] = [];
                    lexicon[word].push([
                        malayalam,
                        transliteration,
                    ]);
                },
            );
        });

        this.data = Object.freeze(lexicon);
    }

    protected isValidLexicon(
        item: any,
    ): item is Record<string, Entry[]> {
        if (item instanceof Promise) {
            throw new Error(
                "Lexicon must be resolved before validation",
            );
        }

        if (typeof item !== "object" || item === null) {
            console.log("lexicon is not an object");
            return false;
        }

        return Object.values(item).every(
            (set) =>
                Array.isArray(set) &&
                set.every(this.isValidEntry),
        );
    }

    protected isValidEntry(item: any): item is Entry {
        if (!Array.isArray(item))
            console.log("entry is not an array");
        if (item.length !== 3)
            console.log("entry has invalid length");
        if (!item.every((v: any) => typeof v === "string"))
            console.log("entry has invalid type");
        return (
            Array.isArray(item) &&
            item.length === 3 &&
            item.every((v) => typeof v === "string")
        );
    }

    public hasWord(word: string): boolean {
        return word in this.data;
    }

    public getTranslation(
        word: string,
    ): Translation[] | null {
        return this.data[word] ?? null;
    }

    public getAllWords(): string[] {
        return Object.keys(this.data);
    }
}

export const Lexicon = new LexiconModel(
    await loadSource<Record<string, Entry[]>>(
        "lexicon/lexicon_ml.yaml",
    ),
);
