export type FlashcardItem = {
    subject?: string;
    tense?: string;
    partofspeech?: string;
    english: string;
    malayalam?: string;
    transliteration?: string;
    wrongAnswers: string[];
};

type PartsOfSpeech = readonly [
    "verb",
    "noun",
    "adverb",
    "preposition",
    "adjective",
];
export type PartsofSpeechItem = {
    pos?: PartsOfSpeech[number];
    text: string;
    answer: string[];
    learningHint?: string;
};

export type TypingItem = {
    answer: string;
};

export interface BaseChoice {
    text: string;
    next: string;
}

export interface BasePassage {
    text: string;
    choices?: BaseChoice[];
    speakerName?: string;
    speakerRole?: string;
    speakerImage?: string;
}

export interface BaseConversation {
    start: string;
    defaultSpeakerName?: string;
    defaultSpeakerRole?: string;
    defaultSpeakerImage?: string;
    passages?: Record<string, BasePassage>;
}

export type ScramblerItem = {
    sentence: string;
    number?: number;
    malayalam?: string;
    transliteration?: string;
};
export type BaseChallenge = {
    english: string;
    malayalam?: string;
    transliteration?: string;
    wrongAnswers: string[];
    malayalamDistractors?: Record<string, string[]>;
};
export type SequenceItem = {
    verb: string;
    conjugations: string[];
    challenges: BaseChallenge[];
};

export type Activity =
    | { type: "flashcard"; data: FlashcardItem }
    | { type: "partsofspeech"; data: PartsofSpeechItem }
    | { type: "typing"; data: TypingItem }
    | { type: "scrambler"; data: ScramblerItem }
    | { type: "sequence"; data: SequenceItem };
