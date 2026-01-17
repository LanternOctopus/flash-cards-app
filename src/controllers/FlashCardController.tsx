import flashcardDataRaw from "../data/Flashcard.json";
import { Activity, FlashcardItem } from ".././types";
import { shuffle } from "../utils/utils";
const flashcardData =
    flashcardDataRaw as readonly FlashcardItem[];

export class FlashcardController {
    private shuffled: readonly FlashcardItem[];
    constructor() {
        this.shuffled = shuffle(flashcardData.slice(1));
    }
    *getActivities(): Generator<
        Extract<Activity, { type: "flashcard" }>
    > {
        for (const entry of this.shuffled) {
            yield {
                type: "flashcard" as const,
                data: entry,
            };
        }
    }
}
