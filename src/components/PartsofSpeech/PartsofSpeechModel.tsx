import { v4 as uuidv4 } from "uuid";
import partofspeechDataRaw from "../../data/PartsOfSpeech.json";
import { Activity, PartsofSpeechItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import expandContractions from "../../utils/expandContractions";
import normalizeStr from "../../utils/normalizeStr";

const partsofspeechData =
    partofspeechDataRaw as readonly PartsofSpeechItem[];

export class PartsofSpeechModel {
    private shuffled: readonly PartsofSpeechItem[];

    constructor() {
        this.shuffled = shuffle(partsofspeechData.slice(1));
    }

    *getActivities(): Generator<
        Extract<Activity, { type: "partsofspeech" }>
    > {
        for (const entry of this.shuffled) {
            // Clean text for splitting
            const normalizedText = normalizeStr(entry.text);
            const rawWords = entry.text.split(/\s+/);
            const normWords = normalizedText.split(/\s+/);

            const wordObjects = rawWords.map((raw, i) => {
                const normalized = normWords[i];
                const expanded =
                    expandContractions(normalized);

                return {
                    id: uuidv4(),
                    raw: raw,
                    normalized: expanded,
                    isAnswer:
                        entry.answer.includes(expanded),
                };
            });

            yield {
                type: "partsofspeech",
                data: {
                    text: entry.text,
                    answer: entry.answer,
                    learningHint: entry.learningHint,
                    words: wordObjects,
                },
            };
        }
    }
}
