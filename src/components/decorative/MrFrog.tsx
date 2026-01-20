import { useState, useEffect } from "react";
import { globalGetimageURL } from "../../utils/utils";

export default function MrFrog({
    correct,
}: {
    correct: boolean | undefined;
}) {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const resetTimer = () => {
            if (timer) clearTimeout(timer);
            // Hide the hint again if the user interacts
            setShowHint(false);

            if (correct === undefined) {
                timer = setTimeout(() => {
                    setShowHint(true);
                }, 60000);
            }
        };

        resetTimer();
        document.addEventListener("click", resetTimer);

        return () => {
            document.removeEventListener(
                "click",
                resetTimer,
            );
            clearTimeout(timer);
        };
    }, [correct]);

    return (
        <div
            className="instruction-wrapper"
            style={{
                position: "relative",
                height: "320px",
                display: "flex",
                justifyContent: "flex-end",
                overflow: "hidden",
            }}
        >
            <div
                className="instruction-bubble"
                style={{
                    position: "absolute",
                    top: "0",
                    bottom: "60px",
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    zIndex: "1",
                }}
            >
                <p>
                    <b>
                        {correct === true &&
                            "Yay you got it right!"}
                        {correct === false &&
                            "Sorry, you got it wrong."}
                        {correct === undefined &&
                            (showHint
                                ? "Need a hand? Here is a hint..."
                                : "Keep trying!")}
                    </b>
                </p>
            </div>
            <div className="frog-mascot">
                <img
                    style={{
                        width: "260px",
                        display: "block",
                        right: "-42px",
                        position: "relative",
                    }}
                    src={globalGetimageURL(
                        `picturematchinggame/frog-${correct === undefined ? "neutral" : correct ? "happy" : "sad"}.png`,
                    )}
                    alt={`Mr.Frog is ${correct === undefined ? "waiting for" : correct ? "happy about" : "sad about"} your answer`}
                />
            </div>
        </div>
    );
}
