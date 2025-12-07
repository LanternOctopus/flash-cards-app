import yaml from "js-yaml";
import fs from "fs";
import path from "path";
export interface ActivityN {
    type: string;
    data: any;
}

// Picture matching game

export interface PictureMatchingGame extends ActivityN {
    type: "picturematchinggame";
    data: { picture: string; answer: string }[];
}
type PictureItem = {
    picture: string;
    answer: string;
};
type PictureMatchingGameDataRaw = {
    [setName: string]: PictureItem[];
};
export class PictureMatchingGameModel {
    private rawData: PictureMatchingGameDataRaw;
    constructor(
        filePath: string = "./data/PictureMatchingGame.yaml"
    ) {
        this.rawData = this.loadSource(filePath);
    }
    private loadSource(
        filePath: string
    ): PictureMatchingGameDataRaw {
        const full = path.resolve(process.cwd(), filePath);
        const file = fs.readFileSync(full, "utf8");
        return yaml.load(
            file
        ) as PictureMatchingGameDataRaw;
    }
    private getFirstSetName(): string {
        return Object.keys(this.rawData)[0];
    }
    private getSet(setName?: string): PictureItem[]{
        const key = setName ?? this.getFirstSetName();
        return this.rawData[key];
    }
    getSetData(setName?: string): PictureItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.getSet(key);
    }
}
const game = new PictureMatchingGameModel();
