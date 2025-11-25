import partofspeechDataRaw from "../data/PartsOfSpeech.json";
import {Activity, PartsofSpeechItem} from "../types"
import { shuffle } from "../utils/shuffle";

const partsofspeechData = partofspeechDataRaw as readonly PartsofSpeechItem[];

export class PartsofSpeechController {
    private shuffled: readonly PartsofSpeechItem[];
    constructor(){
        this.shuffled = shuffle(partsofspeechData.slice(1));
    }
    *getActivities(): Generator<Extract<Activity,{type:"partsofspeech"}>>{
        for(const entry of this.shuffled){
            yield{
                type:"partsofspeech" as const,
                data:entry
            }
        }
    }
}