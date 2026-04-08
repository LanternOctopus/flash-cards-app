// App.js
import React, { use } from "react";
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
import { LanguageSwitcher } from "./activities/languageswitcher/LanguageSwitcher";
import { LanguageProvider } from "./activities/languageswitcher/LanguageProvider";
import { HandwritingScreen } from "./activities/writing/WritingView";
import {
    InventoryProvider,
    useInventory,
} from "./components/inventory/InventoryProvider";
const QuestCheck = () => {
    const { hasItem, addToInventory } = useInventory();

    const checkQuestItem = () => {
        if (hasItem("Stone", 3)) {
            alert("Quest can proceed!");
        } else {
            alert("You need 3 Stones!");
        }
    };

    return (
        <div>
            <button
                onClick={() => addToInventory("Stone", 2)}
            >
                Add 2 Stones
            </button>
            <button onClick={checkQuestItem}>
                Check Quest Item
            </button>
        </div>
    );
};
const InventoryDashboard = () => {
    const {
        getGold,
        addGold,
        subtractGold,
        getInventory,
        addToInventory,
        removeFromInventory,
    } = useInventory();

    return (
        <div>
            <h2>Gold: {getGold()}</h2>
            <button onClick={() => addGold(100)}>
                Add 100 Gold
            </button>
            <button onClick={() => subtractGold(50)}>
                Spend 50 Gold
            </button>

            <h2>Inventory:</h2>
            <ul>
                {getInventory().map((item) => (
                    <li key={item.name}>
                        {item.name} x{item.quantity}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => addToInventory("Potion", 3)}
            >
                Add 3 Potions
            </button>
            <button
                onClick={() =>
                    removeFromInventory("Potion", 1)
                }
            >
                Remove 1 Potion
            </button>
        </div>
    );
};
const App: React.FC = () => {
    return (
        <>
            <LanguageProvider>
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
            </LanguageProvider>
            <InventoryProvider>
                <InventoryDashboard />
                <QuestCheck />
            </InventoryProvider>
        </>
    );
};

export default App;
