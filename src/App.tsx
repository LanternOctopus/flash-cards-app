// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Conversations from "./components/Conversations";
import Scrambler from "./components/Scrambler";
import {
    PictureMatch,
    PictureMatchingGameScreen,
} from "./activities/PictureMatchingGame";
import { ReadOutLoudScreen } from "./activities/ReadOutLoudView";
import {
    PartsOfSpeechNew,
    PartsOfSpeechScreen,
} from "./activities/PartsofSpeechNew";
import { SentenceActivitiesIndex } from "./pages/SentenceActivitiesIndex";
import { ParentScreen } from "./activities/ParentScreen";
import { ReadOutLoudModel } from "./activities/ReadOutLoudModel";
import { ReadOutLoud } from "./activities/ReadOutLoudView";
import HindiExample from "./pages/HindiExample";
import {
    FlashCardScreen,
    FlashCardView,
} from "./activities/flash-cards/FlashCardView";
import { LanguageSwitcher } from "./activities/languageswitcher/LanguageSwitcher";
import { LanguageProvider } from "./activities/languageswitcher/LanguageProvider";
import { HandwritingScreen } from "./activities/writing/WritingView";
import { FlashCardModel } from "./activities/flash-cards/FlashCardModel";
import { PartsofSpeechModel } from "./activities/PartsofSpeechModel";
import { SentenceSessions } from "./pages/SentenceSessions";
import { PictureMatchingGameModel } from "./activities/PictureMatchingGameModel";
import { Track } from "./components/Track";
import { SessionProvider } from "./providers/SessionProvider";
const App: React.FC = () => {
    return (
        <LanguageProvider>
            <SessionProvider>
                <header
                    style={{
                        padding: "0 1rem",
                        background:
                            "var(--pico-background-color)",
                    }}
                >
                    <nav>
                        <ul
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                width: "100%",
                            }}
                        >
                            <li>
                                <Link
                                    to="/"
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                        color: "#333",
                                        textDecoration:
                                            "none",
                                    }}
                                >
                                    🌟 Ananda English
                                </Link>
                            </li>
                            <li className="languageSwitcher">
                                <LanguageSwitcher />
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route
                        path="/track"
                        element={<Track />}
                    />
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/partsofspeech"
                        element={<PartsOfSpeechScreen />}
                    />
                    <Route
                        path="/conversations"
                        element={<Conversations />}
                    />
                    <Route
                        path="/scrambler"
                        element={<Scrambler />}
                    />

                    <Route
                        path="/picturematchinggame"
                        element={
                            <PictureMatchingGameScreen />
                        }
                    />
                    <Route
                        path="/readoutloud"
                        element={<ReadOutLoudScreen />}
                    />
                    <Route
                        path="/sentenceactivities"
                        element={
                            <SentenceActivitiesIndex />
                        }
                    />
                    <Route
                        path="/sentencesessions"
                        element={<SentenceSessions />}
                    />
                    <Route
                        path="/readoutloud/whimsicalcontractions"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/whimsicalcontractions.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/adognamedchai"
                        element={
                            <ParentScreen
                                itemPath="reading/intermediate/adognamedchai.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/learningcanchangeus"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/learningcanchangeus.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/thebusydayoflittlesteps"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/thebusydayoflittlesteps.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/wordsthattravel"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/wordsthattravel.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/wordsyoucandoatyourdesk"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/wordsyoucandoatyourdesk.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/readoutloud/whatmybodycando"
                        element={
                            <ParentScreen
                                itemPath="verbs/identification/whatmybodycando.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="readOutLoud"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/hindi"
                        element={<HindiExample />}
                    />
                    <Route
                        path="/flashcards"
                        element={<FlashCardScreen />}
                    />
                    <Route
                        path="/letter/alphabet"
                        element={
                            <ParentScreen
                                itemPath="letter/learnthealphabet.yaml"
                                configPath="config/alphabet.yaml"
                                storageKey="alphabetMatching"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/letter/alphabetmatching"
                        element={
                            <ParentScreen
                                itemPath="letter/mcq.yaml"
                                configPath="config/alphabetmatching.yaml"
                                storageKey="alphabetMatching"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/handwriting"
                        element={<HandwritingScreen />}
                    />
                    <Route
                        path="/sentence/session1/adjectives/mcq"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adjectives/mcq.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adjectives/mcq-opposites"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adjectives/mcq-opposites.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adjectives/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adjectives/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adjectives/reading"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adjectives/reading.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="reading"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adverbs/mcq"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adverbs/mcq.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adverbs/mcq-opposites"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adverbs/mcq-opposites.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adverbs/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adverbs/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/adverbs/reading"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/adverbs/reading.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="reading"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/nouns/mcq"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/nouns/mcq.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />

                    <Route
                        path="/sentence/session1/nouns/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/nouns/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/nouns/reading"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/nouns/reading.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="reading"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/prepositions/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/prepositions/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/prepositions/picturematching"
                        element={
                            <ParentScreen
                                itemPath={
                                    "cirriculum/sentence/session-one/prepositions/picturematch.yaml"
                                }
                                configPath="config/PictureMatchingGameConfig.yaml"
                                storageKey="pictureMatchingGame"
                                modelClass={
                                    PictureMatchingGameModel
                                }
                            >
                                <PictureMatch />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/pronouns/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/pronouns/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/pronouns/reading"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/pronouns/reading.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="reading"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/verbs/partsofspeech"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/verbs/partsofspeech.yaml"
                                configPath="config/PartsofSpeechConfig.yaml"
                                storageKey="partsofSpeech"
                                modelClass={
                                    PartsofSpeechModel
                                }
                            >
                                <PartsOfSpeechNew />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/verbs/reading"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/verbs/reading.yaml"
                                configPath="config/ReadOutLoudConfig.yaml"
                                storageKey="reading"
                                modelClass={
                                    ReadOutLoudModel
                                }
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/verbs/mcq"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/verbs/mcq.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/sentence/session1/verbs/mcq-subject-verbagreement"
                        element={
                            <ParentScreen
                                itemPath="cirriculum/sentence/session-one/verbs/subjectverbagreement/mcq.yaml"
                                configPath="config/flashcardsconfig.yaml"
                                storageKey="mcq"
                                modelClass={FlashCardModel}
                            >
                                <FlashCardView />
                            </ParentScreen>
                        }
                    />
                </Routes>

                <footer
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexFlow: "column",
                        background:
                            "var(--pico-background-color)",
                        alignContent: "center",
                        padding: "1rem",
                        textAlign: "center",
                    }}
                >
                    <small>
                        May this offering contribute to the
                        freedom of all sentient beings.
                    </small>
                    <small>
                        © 2026 All Rights Reserved.
                    </small>
                </footer>
            </SessionProvider>
        </LanguageProvider>
    );
};

export default App;
