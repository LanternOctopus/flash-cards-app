// App.js
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Conversations from "./dalit-history-month/conversation/View";
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
import { LanguageProvider } from "./providers/LanguageProvider";
import { HandwritingScreen } from "./activities/writing/WritingView";
import GabbilamEntryPoint from "./dalit-history-month/GabbilamEntryPoint";
import ConversationEntryPoint from "./dalit-history-month/conversation/ConversationEntryPoint";
import RegularSite from "./components/regularsite/RegularSite";
import { AudioProvider } from "./providers/AudioProvider";
import { PlayAudio } from "./components/PlayAudio";
const App: React.FC = () => {
    return (
        <LanguageProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RegularSite>
                            {" "}
                            <Home />{" "}
                        </RegularSite>
                    }
                />

                <Route
                    path="/partsofspeech"
                    element={
                        <RegularSite>
                            <PartsOfSpeechScreen />
                        </RegularSite>
                    }
                />

                <Route
                    path="/scrambler"
                    element={
                        <RegularSite>
                            <Scrambler />
                        </RegularSite>
                    }
                />

                <Route
                    path="/picturematchinggame"
                    element={
                        <RegularSite>
                            <PictureMatchingGameScreen />
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud"
                    element={
                        <RegularSite>
                            <ReadOutLoudScreen />
                        </RegularSite>
                    }
                />
                <Route
                    path="/sentenceactivities"
                    element={
                        <RegularSite>
                            <SentenceActivitiesIndex />
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/whimsicalcontractions"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/adognamedchai"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/learningcanchangeus"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/thebusydayoflittlesteps"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/wordsthattravel"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/wordsyoucandoatyourdesk"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/readoutloud/whatmybodycando"
                    element={
                        <RegularSite>
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/hindi"
                    element={
                        <RegularSite>
                            <HindiExample />
                        </RegularSite>
                    }
                />
                <Route
                    path="/flashcards"
                    element={
                        <RegularSite>
                            <FlashCardScreen />
                        </RegularSite>
                    }
                />
                <Route
                    path="/letter/alphabet"
                    element={
                        <RegularSite>
                            <AudioProvider>
                                <ParentScreen
                                    itemPath="letter/learnthealphabet.yaml"
                                    configPath="config/alphabet.yaml"
                                    storageKey="alphabetMatching"
                                    modelClass={
                                        ReadOutLoudModel
                                    }
                                >
                                    <PlayAudio />
                                    <ReadOutLoud />
                                </ParentScreen>
                            </AudioProvider>
                        </RegularSite>
                    }
                />
                <Route
                    path="/letter/alphabetmatching"
                    element={
                        <RegularSite>
                            {" "}
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
                        </RegularSite>
                    }
                />
                <Route
                    path="/handwriting"
                    element={
                        <RegularSite>
                            <HandwritingScreen />
                        </RegularSite>
                    }
                />
                <Route
                    path="/dalit-history-month/gabbilamu"
                    element={
                        <div className="Dalit-history-month">
                            <GabbilamEntryPoint />
                        </div>
                    }
                />
                <Route
                    path="/dalit-history-month/leather"
                    element={
                        <div className="Dalit-history-month">
                            <ConversationEntryPoint />
                        </div>
                    }
                />
            </Routes>
        </LanguageProvider>
    );
};

export default App;
