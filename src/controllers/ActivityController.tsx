import typingData from "../data/TypingChallenge.json";
import flashcardData from "../data/Flashcard.json";
import posData from "../data/PartsOfSpeech.json";

export interface Activity {
  activityType: string;
  data: any;
}

class ActivityController {
  private static instance: ActivityController;
  activities: Activity[] = [];

  private constructor() {
    this.loadAllActivities();
  }

  static getInstance() {
    if (!ActivityController.instance) {
      ActivityController.instance = new ActivityController();
    }
    return ActivityController.instance;
  }
  private shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

  private loadAllActivities() {
const sources: { type: string; data: any[] }[] = [
  { type: "flashcard", data: flashcardData },
  { type: "partsofspeech", data: posData },
];
    const isDesktop = typeof window !== "undefined" ? window.innerWidth >= 768 : true;
    if(isDesktop){
      sources.push({ type: "typing", data: typingData })
    }
    sources.forEach((source) => {
      if (!Array.isArray(source.data) || source.data.length < 2) return;
      const type = source.type;
      source.data.slice(1).forEach((entry: any) => {
        this.activities.push({ activityType: type, data: entry });
      });
    });
    this.shuffleArray(this.activities);
  }

  getActivity(index: number) {
    return this.activities[index];
  }

  getAllActivities() {
    return this.activities;
  }
}

export default ActivityController.getInstance();
