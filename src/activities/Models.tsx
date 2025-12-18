export interface ActivityN {
    type: string;
    data: any;
}
export interface PictureMatchingGameSet extends ActivityN {
    type: "picturematchinggame";
    data: PictureItem[];
}
export interface PictureMatchingGameSetAll
    extends ActivityN {
    type: "picturematchinggame";
    data: PictureMatchingGameDataRaw;
}
type AnswerOptions = Record<string, string[]>;

type PictureItem = {
    picture: string;
    answer: string;
    question: string;
    translation?: string;
    transliteration?: string;
    meta?: Record<
        string,
        { value: any; canToggle?: boolean }
    >;
    ansOptions?: AnswerOptions;
};

type PictureMatchingGameDataRaw = {
    [setName: string]: PictureItem[];
};
export class PictureMatchingGameModel {
    private rawData!: PictureMatchingGameDataRaw;

    constructor(raw: unknown) {
        console.log(
            "PictureMatchingGameModel constructor",
            raw
        );
        if (!this.isPictureMatchingGameData(raw)) {
            throw new Error(
                "Invalid PictureMatchingGame data"
            );
        }
        this.rawData = raw;
    }

    private isPictureMatchingGameData(
        data: unknown
    ): data is PictureMatchingGameDataRaw {
        console.log("isPictureMatchingGameData", data);
        if (typeof data !== "object" || data === null)
            return false;

        return Object.values(data).every(
            (set) =>
                Array.isArray(set) &&
                set.every((item) =>
                    this.isPictureItem(item)
                )
        );
    }
    private isPictureItem(
        item: unknown
    ): item is PictureItem {
        if (typeof item !== "object" || item === null)
            return false;

        const it = item as any;

        if (typeof it.picture !== "string") return false;
        if (typeof it.answer !== "string") return false;

        if (it.ansOptions) {
            if (typeof it.ansOptions !== "object")
                return false;
            if (
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

    private getFirstSetName(): string {
        return Object.keys(this.rawData)[0];
    }
    private getSet(setName?: string): PictureItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.rawData[key];
    }
    getSetData(setName?: string): PictureItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.getSet(key);
    }
    getAllSets(): PictureMatchingGameDataRaw {
        return this.rawData;
    }
    *getGenerator(
        setName?: string
    ): Generator<PictureItem> {
        const set = this.getSet(setName);
        for (const item of set) {
            yield item;
        }
    }
    getSingle({
        setName,
        random = false,
    }: {
        setName?: string;
        random?: boolean;
    }): PictureItem {
        const set = this.getSet(setName);
        if (random) {
            const index = Math.floor(
                Math.random() * set.length
            );
            return set[index];
        } else {
            return set[0];
        }
    }
    get typedSet(): PictureMatchingGameSet {
        return {
            type: "picturematchinggame",
            data: this.getSetData(),
        };
    }
    get typedSetAll(): PictureMatchingGameSetAll {
        return {
            type: "picturematchinggame",
            data: this.getAllSets(),
        };
    }
}
