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
import { ReadOutLoudScreen } from "./activities/readoutloud/ReadOutLoudView";
import {
    PartsOfSpeechNew,
    PartsOfSpeechScreen,
} from "./activities/PartsofSpeechNew";
import { SentenceActivitiesIndex } from "./pages/SentenceActivitiesIndex";
import { ParentScreen } from "./activities/ParentScreen";
import { ReadOutLoudModel } from "./activities/readoutloud/ReadOutLoudModel";
import { ReadOutLoud } from "./activities/readoutloud/ReadOutLoudView";
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
import {
    SessionProvider,
    Step,
} from "./providers/SessionProvider";
import "./ananda-english.scss";
import { session1Steps } from "./curriculum/sentencesession1";
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="readOutLoud"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="alphabetMatching"
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
                                modelClass={
                                    ReadOutLoudModel
                                }
                                storageKey="alphabetMatching"
                            >
                                <ReadOutLoud />
                            </ParentScreen>
                        }
                    />
                    <Route
                        path="/handwriting"
                        element={<HandwritingScreen />}
                    />
                    {session1Steps
                        .filter(
                            (
                                step,
                            ): step is Extract<
                                Step,
                                { type: "activity" }
                            > => step.type === "activity",
                        )
                        .map((step) => (
                            <Route
                                key={step.path}
                                path={step.path}
                                element={
                                    <ParentScreen
                                        itemPath={
                                            step.itemPath
                                        }
                                        configPath={
                                            step.configPath
                                        }
                                        modelClass={
                                            step.modelClass
                                        }
                                        storageKey={
                                            step.storageKey
                                        }
                                    >
                                        {step.children}
                                    </ParentScreen>
                                }
                            />
                        ))}
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
