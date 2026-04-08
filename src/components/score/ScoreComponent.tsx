import React, { useEffect, useState, useRef } from "react";
import "./score.css"; // Import the CSS for styling and animations
// Props for the component
interface ScoreComponentProps {
    score: number; // current score
    maxScore?: number; // optional max score for bar fill percentage
}

export const ScoreComponent: React.FC<
    ScoreComponentProps
> = ({ score, maxScore = 100 }) => {
    const [displayScore, setDisplayScore] =
        useState<number>(score);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationQueue = useRef<number[]>([]);

    const circleRef = useRef<HTMLSpanElement>(null);
    const barFillRef = useRef<HTMLDivElement>(null);

    // Queue system for multiple score updates
    useEffect(() => {
        if (score !== displayScore) {
            animationQueue.current.push(score);
            if (!isAnimating) processQueue();
        }
    }, [score]);

    const processQueue = () => {
        if (animationQueue.current.length === 0) {
            setIsAnimating(false);
            return;
        }

        setIsAnimating(true);
        const nextScore = animationQueue.current.shift()!;
        setDisplayScore(nextScore);

        // Trigger animation
        if (circleRef.current) {
            circleRef.current.classList.add("animate");
            setTimeout(() => {
                circleRef.current!.classList.remove(
                    "animate",
                );
                processQueue();
            }, 400); // duration of burst animation
        }

        // Animate bar fill
        if (barFillRef.current) {
            const percent = Math.min(
                (nextScore / maxScore) * 100,
                100,
            );
            barFillRef.current.style.width = `${percent}%`;
        }
    };

    return (
        <div
            className="score-container"
            style={{
                display: "flex",
                alignItems: "center",
            }}
        >
            {/* Circle */}
            <div
                className="score-circle"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle at 30% 30%, #ff7f7f, #ff3f3f)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginRight: 16,
                }}
            >
                <span
                    ref={circleRef}
                    className="score-number"
                    style={{
                        fontFamily:
                            "'Fredoka One', cursive",
                        fontSize: "2rem",
                        transition:
                            "transform 0.4s ease-out, text-shadow 0.4s",
                    }}
                >
                    {displayScore}
                </span>
            </div>

            {/* Rectangle bar */}
            <div
                className="score-bar-bg"
                style={{
                    flex: 1,
                    height: 40,
                    borderRadius: 20,
                    background: "#f0c0c0",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div
                    ref={barFillRef}
                    className="score-bar-fill"
                    style={{
                        width: `${(displayScore / maxScore) * 100}%`,
                        height: "100%",
                        background:
                            "linear-gradient(to right, #ff9f9f, #ff4f4f)",
                        transition: "width 0.5s ease-out",
                        borderRadius: 20,
                    }}
                ></div>
            </div>
        </div>
    );
};
