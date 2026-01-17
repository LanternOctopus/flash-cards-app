import { globalGetimageURL } from "../../utils/utils";
import "./codingwitch.css";
import { useState, useEffect } from "react";
export function CodingWitch({
    correct,
}: {
    correct?: boolean | undefined;
}) {
    const [showGlow, setShowGlow] = useState(false);
    useEffect(() => {
        if (correct) {
            setTimeout(() => {
                setShowGlow(true);
            }, 1000);
        }
    }, [correct]);
    return (
        <div className="character-container">
            {correct && (
                <div
                    className="speech-bubble"
                    id="feedback-bubble"
                >
                    Great job! You found a verb!
                </div>
            )}
            {correct === false && (
                <div
                    className="speech-bubble"
                    id="feedback-bubble"
                >
                    Oh no! You didn't find all the verbs.
                </div>
            )}
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
                className="codingWitch"
            >
                <img
                    style={{
                        transform: "scaleX(-1)",
                        height: "100%",
                    }}
                    src={globalGetimageURL(
                        "codingwitch/codingwitch.png"
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
                        "codingwitch/bluecat.png"
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
                        "codingwitch/bushfairy.png"
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
                        "codingwitch/axolotl.png"
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
                        "codingwitch/octopus.png"
                    )}
                    alt="octopus"
                />
            </div>
        </div>
    );
}
