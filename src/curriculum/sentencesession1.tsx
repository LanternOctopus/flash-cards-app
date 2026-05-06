import { FlashCardModel } from "../activities/flash-cards/FlashCardModel";
import { FlashCardView } from "../activities/flash-cards/FlashCardView";
import { PartsofSpeechModel } from "../activities/PartsofSpeechModel";
import { PartsOfSpeechNew } from "../activities/PartsofSpeechNew";
import { ReadOutLoudModel } from "../activities/ReadOutLoudModel";
import { ReadOutLoud } from "../activities/ReadOutLoudView";
import { PictureMatchingGameModel } from "../activities/PictureMatchingGameModel";
import { PictureMatch } from "../activities/PictureMatchingGame";
import { Step } from "../providers/SessionProvider";
export const session1Steps: Step[] = [
    // ADJECTIVES
    {
        type: "activity",
        path: "/sentence/session1/adjectives/mcq",
        itemPath:
            "cirriculum/sentence/session-one/adjectives/mcq.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    // {
    //     type: "activity",
    //     path: "/sentence/session1/adjectives/mcq-opposites",
    //     itemPath:
    //         "cirriculum/sentence/session-one/adjectives/mcq-opposites.yaml",
    //     configPath: "config/flashcardsconfig.yaml",
    //     storageKey: "mcq",
    //     modelClass: FlashCardModel,
    //     children: <FlashCardView />,
    // },
    {
        type: "activity",
        path: "/sentence/session1/adjectives/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/adjectives/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adjectives/reading",
        itemPath:
            "cirriculum/sentence/session-one/adjectives/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },

    // ADVERBS
    {
        type: "activity",
        path: "/sentence/session1/adverbs/mcq",
        itemPath:
            "cirriculum/sentence/session-one/adverbs/mcq.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/mcq-opposites",
        itemPath:
            "cirriculum/sentence/session-one/adverbs/mcq-opposites.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/adverbs/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/reading",
        itemPath:
            "cirriculum/sentence/session-one/adverbs/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },

    // NOUNS
    {
        type: "activity",
        path: "/sentence/session1/nouns/mcq",
        itemPath:
            "cirriculum/sentence/session-one/nouns/mcq.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/nouns/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/nouns/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/nouns/reading",
        itemPath:
            "cirriculum/sentence/session-one/nouns/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },

    // PREPOSITIONS
    {
        type: "activity",
        path: "/sentence/session1/prepositions/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/prepositions/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/prepositions/picturematching",
        itemPath:
            "cirriculum/sentence/session-one/prepositions/picturematch.yaml",
        configPath: "config/PictureMatchingGameConfig.yaml",
        storageKey: "pictureMatchingGame",
        modelClass: PictureMatchingGameModel,
        children: <PictureMatch />,
    },

    // PRONOUNS
    {
        type: "activity",
        path: "/sentence/session1/pronouns/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/pronouns/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/pronouns/reading",
        itemPath:
            "cirriculum/sentence/session-one/pronouns/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },

    // VERBS
    {
        type: "activity",
        path: "/sentence/session1/verbs/partsofspeech",
        itemPath:
            "cirriculum/sentence/session-one/verbs/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/reading",
        itemPath:
            "cirriculum/sentence/session-one/verbs/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/mcq",
        itemPath:
            "cirriculum/sentence/session-one/verbs/mcq.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/mcq-subject-verbagreement",
        itemPath:
            "cirriculum/sentence/session-one/verbs/subjectverbagreement/mcq.yaml",
        configPath: "config/flashcardsconfig.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
];
