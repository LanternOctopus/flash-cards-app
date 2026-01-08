import { Activity, ScramblerItem } from "../types";
import { shuffle } from "../utils/utils";
import scramblerDataRaw from "../data/ScramblerIsAre.json";
const scrambler = scramblerDataRaw as ScramblerItem[];

export class ScramblerController {
    private shuffled: readonly ScramblerItem[];

    constructor() {
        this.shuffled = shuffle(scrambler.slice(1)); // randomize order
    }

    *getActivities(): Generator<
        Extract<Activity, { type: "scrambler" }>
    > {
        for (const item of this.shuffled) {
            yield {
                type: "scrambler" as const,
                data: item,
            };
        }
    }
}
