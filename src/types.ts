export type FlashcardItem = {
  subject?: string;
  tense?: string;
  partofspeech?: string;
  english: string;
  malayalam: string;
  transliteration: string;
  wrongAnswers: string[];
}

type PartsOfSpeech = readonly ['verb','noun','adverb','preposition','adjective']
export type PartsofSpeechItem = {
    pos?:PartsOfSpeech[number];
    text: string;
    answer: string[];
    learningHint?: string;
};

export type TypingItem = {
  answer: string;
}

export type Activity =
| {type: "flashcard"; data:FlashcardItem}
| {type: "partsofspeech"; data:PartsofSpeechItem}
| {type: "typing"; data: TypingItem};