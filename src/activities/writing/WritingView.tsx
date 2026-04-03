import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
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

export const Canvas = forwardRef<
    HTMLCanvasElement,
    CanvasProps
>(({ strokes }, ref) => {
    const internalRef = useRef<HTMLCanvasElement>(null);

    // Forward the ref so parent can access the actual canvas element
    useImperativeHandle(ref, () => internalRef.current!);

    useEffect(() => {
        const canvas = internalRef.current;
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

    return (
        <canvas
            ref={internalRef}
            width={200}
            height={200}
        />
    );
});

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
function getBezier(t: number, p: readonly number[]) {
    const n = 1 - t;
    return {
        x:
            n ** 3 * p[0] +
            3 * n ** 2 * t * p[2] +
            3 * n * t ** 2 * p[4] +
            t ** 3 * p[6],
        y:
            n ** 3 * p[1] +
            3 * n ** 2 * t * p[3] +
            3 * n * t ** 2 * p[5] +
            t ** 3 * p[7],
    };
}
function animateGuide(
    strokes: readonly Stroke[],
    gCtx: CanvasRenderingContext2D,
    progress: number,
) {
    gCtx.clearRect(0, 0, 320, 320);
    gCtx.strokeStyle = "#cbd5e1";
    gCtx.lineWidth = 14;
    gCtx.lineCap = "round";

    const strokeDur = 1 / strokes.length;
    strokes.forEach((s, i) => {
        const start = i * strokeDur;
        if (progress < start) return;
        const pStep = Math.min(
            (progress - start) / strokeDur,
            1,
        );
        const pts = s.pts.map((v) => v * 2.5 + 35); // Scale to canvas

        gCtx.beginPath();
        gCtx.moveTo(pts[0], pts[1]);
        if (s.type === "line") {
            gCtx.lineTo(
                pts[0] + (pts[2] - pts[0]) * pStep,
                pts[1] + (pts[3] - pts[1]) * pStep,
            );
        } else {
            for (let j = 0; j <= pStep; j += 0.02) {
                const b = getBezier(j, pts);
                gCtx.lineTo(b.x, b.y);
            }
        }
        gCtx.stroke();
    });
}
export function HandwritingView() {
    const animationIdRef = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const item = useQuestion<HandwritingItem>();
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();
    const [userInput, setUserInput] = useState("");

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
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const strokes = item.strokes;
        animateGuide(strokes, ctx, 0);
        animationIdRef.current = requestAnimationFrame(
            (t) => animateGuide(strokes, ctx, t),
        );

        return () => {
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [item]);
    if (!item) return <div>No word</div>;

    return (
        <article>
            <Canvas
                strokes={item.strokes}
                ref={canvasRef}
            />
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
