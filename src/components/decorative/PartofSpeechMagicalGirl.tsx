import { globalGetimageURL } from "../../utils/utils";
import { useState, useEffect, useRef } from "react";
import SpeechBubble from "./SpeechBubble";
import "./partofspeechmagicalgirl.css";
import { TTS } from "../../utils/TTS";
let globalFreeze = false;
export function PartOfSpeechMagicalGirl({
    partOfSpeech,
}: {
    partOfSpeech?: string;
}) {
    const TTSRef = useRef<TTS | null>(null);
    console.log("partOfSpeech", partOfSpeech);
    const [message, setMessage] = useState<string>("");

    function getArticle(word: string) {
        const vowels = ["a", "e", "i", "o", "u"];
        return vowels.includes(word.charAt(0).toLowerCase())
            ? "an"
            : "a";
    }

    useEffect(() => {
        if (!partOfSpeech) return;
        if (globalFreeze) return;

        const article = getArticle(partOfSpeech);

        const text = `That's ${article} ${partOfSpeech}.`;

        setMessage(text);

        TTSRef.current?.speak(text);

        globalFreeze = true;

        setTimeout(() => {
            setMessage("");
            globalFreeze = false;
        }, 3000);
    }, [partOfSpeech]);

    function handler(e: MouseEvent) {
        if (globalFreeze) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    useEffect(() => {
        document.addEventListener("click", handler, true);

        return () =>
            document.removeEventListener(
                "click",
                handler,
                true,
            );
    }, []);

    return (
        <div className="character-container">
            {message && <SpeechBubble text={message} />}
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
                    className="wizard-img"
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
                        transform: "scaleX(-1)",
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
                    alt="Octopus"
                />
            </div>
        </div>
    );
}
