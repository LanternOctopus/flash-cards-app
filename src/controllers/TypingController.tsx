import typingDataRaw from "../data/TypingChallenge.json";
import { TypingItem, Activity } from "../types";
import { shuffle } from "../utils/shuffle";
const typingData = typingDataRaw as readonly TypingItem[]

export class TypingController{
    private shuffled:readonly TypingItem[];
    constructor(){
        this.shuffled = shuffle(typingData.slice(1));
    }

    *getActivities():Generator <Extract<Activity, {type:"typing"}>>{
        for (const entry of this.shuffled){
            yield{
                type:"typing" as const,
                data:entry
            }
        }
    }
}