// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Conversations from "./components/Conversations";
import Scrambler from "./components/Scrambler";
import { PictureMatchingGameScreen } from "./activities/PictureMatchingGame";
import { ReadOutLoudScreen } from "./activities/ReadOutLoudView";
import { PartsOfSpeechScreen } from "./activities/PartsofSpeechNew";
import { SentenceActivitiesIndex } from "./pages/SentenceActivitiesIndex";
import { ParentScreen } from "./activities/ParentScreen";
import { ReadOutLoudModel } from "./activities/ReadOutLoudModel";
import { ReadOutLoud } from "./activities/ReadOutLoudView";
import HindiExample from "./pages/HindiExample";
import { FlashCardScreen } from "./activities/flash-cards/FlashCardView";
const App: React.FC = () => {
    return (
        <>
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
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <li>
                            <Link to="/sentenceactivities">
                                Sentence Activities
                            </Link>
                        </li>
                        <li>
                            <details className="dropdown">
                                <summary>
                                    Activities
                                </summary>
                                <ul dir="rtl">
                                    <li>
                                        <Link to="/allactivities">
                                            Combined
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/flashcards">
                                            Flash Cards
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/typing">
                                            Typing
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/scrambler">
                                            Scrambler
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/sequences">
                                            Sequences
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/picturematchinggame">
                                            Picture Matching
                                            Game
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/readoutloud">
                                            Read Out Loud
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/partsofspeech">
                                            Parts Of Speech
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </nav>
            </header>
            <Routes>
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
                    element={<PictureMatchingGameScreen />}
                />
                <Route
                    path="/readoutloud"
                    element={<ReadOutLoudScreen />}
                />
                <Route
                    path="/sentenceactivities"
                    element={<SentenceActivitiesIndex />}
                />
                <Route
                    path="/readoutloud/whimsicalcontractions"
                    element={
                        <ParentScreen
                            itemPath="whimsicalcontractions.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/adognamedchai"
                    element={
                        <ParentScreen
                            itemPath="adognamedchai.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/learningcanchangeus"
                    element={
                        <ParentScreen
                            itemPath="learningcanchangeus.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/thebusydayoflittlesteps"
                    element={
                        <ParentScreen
                            itemPath="thebusydayoflittlesteps.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/wordsthattravel"
                    element={
                        <ParentScreen
                            itemPath="wordsthattravel.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/wordsyoucandoatyourdesk"
                    element={
                        <ParentScreen
                            itemPath="wordsyoucandoatyourdesk.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
                        >
                            <ReadOutLoud />
                        </ParentScreen>
                    }
                />
                <Route
                    path="/readoutloud/whatmybodycando"
                    element={
                        <ParentScreen
                            itemPath="whatmybodycando.yaml"
                            configPath="ReadOutLoudConfig.yaml"
                            storageKey="readOutLoud"
                            modelClass={ReadOutLoudModel}
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
                <small>© 2026 All Rights Reserved.</small>
            </footer>
        </>
    );
};

export default App;
