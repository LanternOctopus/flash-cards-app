import { useState, useEffect, useRef } from "react";
import { useVisibilityGate } from "../../components/VisibilityGateContext";
import { useAnswer } from "./../AnswerProvider";
import { useQuestion } from "./../QuestionContext";
import { ParentScreen } from "./../ParentScreen";
import {
    HandwritingModel,
    HandwritingItem,
    Stroke,
} from "./WritingModel";

type CanvasProps = {
    strokes: Stroke[];
};

export function Canvas({ strokes }: CanvasProps) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        strokes.forEach((stroke) => {
            ctx.beginPath();
            if (stroke.type === "line") {
                const [x1, y1, x2, y2] = stroke.pts;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            } else {
                const [x0, y0, x1, y1, x2, y2, x3, y3] =
                    stroke.pts;
                ctx.moveTo(x0, y0);
                ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
            }
            ctx.stroke();
        });
    }, [strokes]);

    return <canvas ref={ref} width={200} height={200} />;
}
export function HandwritingScreen() {
    return (
        <ParentScreen
            itemPath="letter/writingalphabet.yaml"
            configPath="config/writing.yaml"
            storageKey="handwriting"
            modelClass={HandwritingModel}
        >
            <HandwritingView />
        </ParentScreen>
    );
}

export function HandwritingView() {
    const item = useQuestion<HandwritingItem>();
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();
    const [userInput, setUserInput] = useState("");

    if (!item) return <div>No word</div>;

    const handleSubmit = () => {
        const result = checkCorrectness(
            userInput,
            item.text,
        );
        if (result.correct) {
            handleNext?.();
        } else {
            alert("Try again!");
        }
    };
    console.log("Strokes for item:", item.strokes);
    return (
        <article>
            <Canvas strokes={item.strokes} />
            <input
                type="text"
                value={userInput}
                onChange={(e) =>
                    setUserInput(e.target.value)
                }
            />

            <button onClick={handleSubmit}>Check</button>
        </article>
    );
}
