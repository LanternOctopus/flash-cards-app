import { globalGetimageURL } from "../../utils/utils";
import "./partofspeechmagicalgirl.css";
import { useState, useEffect, useRef } from "react";
import nlp from "compromise";
import { possessives } from "../../utils/wordbank";
import {
    stripPunctuation,
    capitalizeFirstLetter,
} from "../../utils/utils";
import { TTS } from "../../utils/TTS";
let globalFreeze = false;
export function PartOfSpeechMagicalGirl({
    correct,
    word,
    phrase,
}: {
    correct?: boolean | undefined;
    word?: string;
    phrase?: string;
}) {
    function handler(e: MouseEvent) {
        if (globalFreeze) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    const TTSRef = useRef<TTS | null>(null);
    // attach listener once
    useEffect(() => {
        document.addEventListener("click", handler, true);
        return () =>
            document.removeEventListener(
                "click",
                handler,
                true,
            );
    }, []);
    const [showGlow, setShowGlow] = useState(false);
    useEffect(() => {
        if (correct) {
            setTimeout(() => {
                setShowGlow(true);
            }, 1000);
        }
    }, [correct]);
    const [identifiedPOS, setIdentifiedPOS] =
        useState<React.ReactNode>();
    useEffect(() => {
        if (phrase && word) {
            const doc = nlp(phrase);
            const normalizedword = stripPunctuation(word);
            const found = doc
                .match(normalizedword)
                .terms()
                .json()[0];

            if (!found) return;
            if (globalFreeze) return;
            // Pick the first tag as the "primary" POS
            let primaryTag =
                found.terms[0].tags[0] || "Unknown";

            // Force common sense for plurals/determiners
            const words = phrase.split(" ");
            const index = words.findIndex(
                (w) =>
                    w.toLowerCase() ===
                    normalizedword.toLowerCase(),
            );
            const prev = words[index - 1]?.toLowerCase();
            if (possessives.includes(prev)) {
                primaryTag = "Noun";
            }

            setIdentifiedPOS(
                <>
                    {capitalizeFirstLetter(normalizedword)}{" "}
                    is a <strong>{primaryTag}</strong>
                </>,
            );
            TTSRef.current?.speak(
                word + " is a " + primaryTag,
            );
            globalFreeze = true;
            setTimeout(() => {
                setIdentifiedPOS(""); // clear after 3 seconds
                globalFreeze = false;
            }, 3000);
        }
    }, [phrase, word]);

    return (
        <div className="character-container">
            <div
                className="speech-bubble"
                id="feedback-bubble"
                style={{
                    minHeight: "3rem",
                    visibility: identifiedPOS
                        ? "visible"
                        : "hidden",
                    opacity: identifiedPOS ? 1 : 0,
                    transition: "opacity 0.3s ease",
                }}
            >
                {correct && `Great job! ${identifiedPOS}!`}
                {identifiedPOS && identifiedPOS}
            </div>
            <div
                style={{
                    position: "relative",
                    height: "300px",
                    width: "300px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    filter: "contrast(1.1) saturate(1.1)",
                }}
                className="partOfSpeechMagicalGirl"
            >
                <img
                    style={{
                        transform: "scaleX(-1)",
                        height: "100%",
                    }}
                    src={globalGetimageURL(
                        "partofspeechmagicalgirl/partofspeechmagicalgirl.png",
                    )}
                    alt="Coding Witch"
                    className={`wizard-img ${
                        showGlow && "glow-animate"
                    }`}
                />
                <img
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        zIndex: "2",
                        height: "60px",
                    }}
                    className="float-item"
                    src={globalGetimageURL(
                        "partofspeechmagicalgirl/bluecat.png",
                    )}
                    alt="Blue Cat"
                />
                <img
                    style={{
                        position: "absolute",
                        top: "60px",
                        right: "240px",
                        zIndex: "2",
                        height: "60px",

                        transform: "scalex(-1)",
                    }}
                    className="float-item"
                    src={globalGetimageURL(
                        "partofspeechmagicalgirl/bushfairy.png",
                    )}
                    alt="Bush Fairy"
                />
                <img
                    style={{
                        position: "absolute",
                        top: "140px",
                        right: "40px",
                        zIndex: "2",
                        height: "60px",
                    }}
                    className="float-item"
                    src={globalGetimageURL(
                        "partofspeechmagicalgirl/axolotl.png",
                    )}
                    alt="Axolotl"
                />
                <img
                    style={{
                        position: "absolute",
                        top: "200px",
                        right: "150px",
                        zIndex: "2",
                        height: "60px",
                    }}
                    className="float-item"
                    src={globalGetimageURL(
                        "partofspeechmagicalgirl/octopus.png",
                    )}
                    alt="octopus"
                />
            </div>
        </div>
    );
}
