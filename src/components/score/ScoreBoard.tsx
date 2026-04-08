import React, { useState, useEffect } from "react";
import { ScoreComponent } from "./ScoreComponent";
type ScoreBoardProps = {
    score: number;
    total?: number;
};
export function ScoreBoard({
    score,
    total,
}: ScoreBoardProps) {
    const [mascotExpression, setMascotExpression] =
        useState("neutral");
    useEffect(() => {
        const expression =
            score === 0
                ? "neutral"
                : score > 0
                  ? "happy"
                  : "sad";
        setMascotExpression(expression);
        const timeout = setTimeout(() => {
            setMascotExpression("neutral");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [score]);
    return (
        <div className="score-board">
            <h2>Score Board</h2>
            <ScoreComponent
                score={score}
                maxScore={total}
            />
            {total !== undefined && <p>Total: {total}</p>}
            <div className={`mascot ${mascotExpression}`}>
                {mascotExpression}
            </div>
        </div>
    );
}
