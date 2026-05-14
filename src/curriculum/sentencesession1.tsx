import { FlashCardModel } from "../activities/flash-cards/FlashCardModel";
import { FlashCardView } from "../activities/flash-cards/FlashCardView";
import { PartsofSpeechModel } from "../activities/PartsofSpeechModel";
import { PartsOfSpeechNew } from "../activities/PartsofSpeechNew";
import { ReadOutLoudModel } from "../activities//readoutloud/ReadOutLoudModel";
import { ReadOutLoud } from "../activities/readoutloud/ReadOutLoudView";
import { PictureMatchingGameModel } from "../activities/PictureMatchingGameModel";
import { PictureMatch } from "../activities/PictureMatchingGame";
import { Step } from "../providers/SessionProvider";
export const session1Steps: Step[] = [
    // ADJECTIVES
    {
        type: "activity",
        path: "/sentence/session1/adjectives/mcq",
        itemPath:
            "curriculum/sentence/session-one/adjectives/mcq/mcq.yaml",
        configPath:
            "curriculum/sentence/session-one/adjectives/mcq/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adjectives/mcq-opposites",
        itemPath:
            "curriculum/sentence/session-one/adjectives/mcq-opposites/mcq-opposites.yaml",
        configPath:
            "curriculum/sentence/session-one/adjectives/mcq-opposites/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adjectives/partsofspeech",
        itemPath:
            "curriculum/sentence/session-one/adjectives/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },

    {
        type: "activity",
        path: "/sentence/session1/adjectives/reading",
        itemPath:
            "curriculum/sentence/session-one/adjectives/reading.yaml",
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
            "curriculum/sentence/session-one/adverbs/mcq/mcq.yaml",
        configPath:
            "curriculum/sentence/session-one/adverbs/mcq/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/mcq-opposites",
        itemPath:
            "curriculum/sentence/session-one/adverbs/mcq-opposites/mcq-opposites.yaml",
        configPath:
            "curriculum/sentence/session-one/adverbs/mcq-opposites/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/partsofspeech",
        itemPath:
            "curriculum/sentence/session-one/adverbs/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/adverbs/reading",
        itemPath:
            "curriculum/sentence/session-one/adverbs/reading.yaml",
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
            "curriculum/sentence/session-one/nouns/mcq/mcq.yaml",
        configPath:
            "curriculum/sentence/session-one/nouns/mcq/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/nouns/partsofspeech",
        itemPath:
            "curriculum/sentence/session-one/nouns/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/nouns/reading",
        itemPath:
            "curriculum/sentence/session-one/nouns/reading.yaml",
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
            "curriculum/sentence/session-one/prepositions/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/prepositions/picturematching",
        itemPath:
            "curriculum/sentence/session-one/prepositions/picturematch.yaml",
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
            "curriculum/sentence/session-one/pronouns/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/pronouns/reading",
        itemPath:
            "curriculum/sentence/session-one/pronouns/reading.yaml",
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
            "curriculum/sentence/session-one/verbs/partsofspeech.yaml",
        configPath: "config/PartsofSpeechConfig.yaml",
        storageKey: "partsofSpeech",
        modelClass: PartsofSpeechModel,
        children: <PartsOfSpeechNew />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/reading",
        itemPath:
            "curriculum/sentence/session-one/verbs/reading.yaml",
        configPath: "config/ReadOutLoudConfig.yaml",
        storageKey: "reading",
        modelClass: ReadOutLoudModel,
        children: <ReadOutLoud />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/mcq",
        itemPath:
            "curriculum/sentence/session-one/verbs/mcq/mcq.yaml",
        configPath:
            "curriculum/sentence/session-one/verbs/mcq/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
    {
        type: "activity",
        path: "/sentence/session1/verbs/mcq-subject-verbagreement",
        itemPath:
            "curriculum/sentence/session-one/verbs/subjectverbagreement/mcq.yaml",
        configPath:
            "curriculum/sentence/session-one/verbs/subjectverbagreement/config.yaml",
        storageKey: "mcq",
        modelClass: FlashCardModel,
        children: <FlashCardView />,
    },
];
