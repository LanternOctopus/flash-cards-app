import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
// import App from "./App";
import { ReadOutLoudScreen } from "./activities/ReadOutLoudView";

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");

const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <HashRouter>
            <ReadOutLoudScreen />
        </HashRouter>
    </React.StrictMode>
);
