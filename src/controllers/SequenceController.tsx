import { BaseChallenge, SequenceItem } from "../types";
import { shuffle } from "../utils/utils";
import sequenceDataRaw from "../data/Sequence.json";
const sequenceData =
    sequenceDataRaw as readonly SequenceItem[];
// console.log(sequenceData)
export class SequenceController {
    private shuffled: readonly SequenceItem[];

    constructor() {
        this.shuffled = shuffle(sequenceData.slice(0)); // randomize order
    }
    *getSequence(
        challenges: BaseChallenge[]
    ): Generator<BaseChallenge> {
        for (const challenge of challenges) {
            yield challenge;
        }
    }

    *getActivities(): Generator<Generator<BaseChallenge>> {
        for (const sequence of this.shuffled) {
            yield this.getSequence(sequence.challenges);
        }
    }
}
