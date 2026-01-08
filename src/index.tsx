import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
// import App from "./App";
// import { PictureMatchingGameScreen } from "./activities/PictureMatchingGame";
import { PartsOfSpeechScreen } from "./activities/PartsofSpeechNew";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <HashRouter>
            <PartsOfSpeechScreen />
        </HashRouter>
    </React.StrictMode>
);
