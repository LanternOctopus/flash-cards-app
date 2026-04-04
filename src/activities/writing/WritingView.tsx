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

// 1. Extend the standard HTML attributes for a canvas
type CanvasProps =
    React.CanvasHTMLAttributes<HTMLCanvasElement> & {
        strokes: Stroke[];
    };

export const Canvas = forwardRef<
    HTMLCanvasElement,
    CanvasProps
>(
    // 2. Destructure strokes and use "...rest" for onMouseDown, etc.
    ({ strokes, ...rest }, ref) => {
        const internalRef = useRef<HTMLCanvasElement>(null);

        useImperativeHandle(
            ref,
            () => internalRef.current!,
        );

        useEffect(() => {
            const canvas = internalRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height,
            );

            // Set styles here so they apply to the strokes
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";

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
                    ctx.bezierCurveTo(
                        x1,
                        y1,
                        x2,
                        y2,
                        x3,
                        y3,
                    );
                }
                ctx.stroke();
            });
        }, [strokes]);

        return (
            <canvas
                ref={internalRef}
                width={320} // Match your animateGuide size
                height={320}
                // 3. Spread the rest of the props (onMouseDown, onTouchStart, etc.)
                {...rest}
            />
        );
    },
);

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
    const guideCanvasRef = useRef<HTMLCanvasElement>(null);
    const userCanvasRef = useRef<HTMLCanvasElement>(null);
    const item = useQuestion<HandwritingItem>();

    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<
        { x: number; y: number }[]
    >([]);

    // --- 1. Guide Animation Logic ---
    useEffect(() => {
        const canvas = guideCanvasRef.current;
        if (!canvas || !item) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let startTime: number | null = null;
        const duration = 2000;

        const frame = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(
                (timestamp - startTime) / duration,
                1,
            );

            // This only clears and draws on the BOTTOM canvas
            animateGuide(item.strokes, ctx, progress);

            if (progress < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    }, [item]);

    // --- 2. User Drawing Logic ---
    const handleMove = (
        e: React.MouseEvent | React.TouchEvent,
    ) => {
        if (!isDrawing || !userCanvasRef.current) return;

        const rect =
            userCanvasRef.current.getBoundingClientRect();
        const x =
            ("touches" in e
                ? e.touches[0].clientX
                : e.clientX) - rect.left;
        const y =
            ("touches" in e
                ? e.touches[0].clientY
                : e.clientY) - rect.top;

        const newPoint = { x, y };
        setPoints((prev) => [...prev, newPoint]);

        const ctx = userCanvasRef.current.getContext("2d");
        if (ctx) {
            ctx.strokeStyle = "#000"; // Black ink for user
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };

    const handleStart = (
        e: React.MouseEvent | React.TouchEvent,
    ) => {
        setIsDrawing(true);
        const ctx = userCanvasRef.current?.getContext("2d");
        if (ctx) ctx.beginPath();
        handleMove(e);
    };
    const { checkCorrectness, handleNext } = useAnswer();

    const handleCheck = () => {
        // 1. Run the similarity check from your model
        // We pass the points array and the target letter text
        const result = checkCorrectness(points, item.text);

        if (result.correct) {
            // 1. Clear the "Ink" from the User Canvas immediately
            const ctx =
                userCanvasRef.current?.getContext("2d");
            ctx?.clearRect(0, 0, 320, 320);

            // 2. Reset the points array so the next letter starts fresh
            setPoints([]);

            // 3. Give the user a "Good Job" alert
            // (Alternatively, you could set a 'success' state to show a green checkmark)
            alert(`🌟 Excellent! Score: ${result.score}%`);
            // 4  If the score is >= 70 (defined in your model), go to next
            handleNext?.();
        } else {
            // 5. If they missed too many spots, give feedback
            alert(
                `Almost! Your accuracy was ${result.score}%. Try to stay inside the lines!`,
            );

            // Optional: Clear the user's ink so they can try again fresh
            const ctx =
                userCanvasRef.current?.getContext("2d");
            ctx?.clearRect(0, 0, 320, 320);
            setPoints([]);
        }
    };
    return (
        <article
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: 320,
                    height: 320,
                    background: "#fff",
                }}
            >
                {/* LAYER 1: The Guide (Bottom) */}
                <canvas
                    ref={guideCanvasRef}
                    width={320}
                    height={320}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        opacity: 0.5,
                    }}
                />

                {/* LAYER 2: The User Drawing (Top) */}
                <canvas
                    ref={userCanvasRef}
                    width={320}
                    height={320}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        touchAction: "none",
                    }}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={() => setIsDrawing(false)}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={() => setIsDrawing(false)}
                />
            </div>
            <button
                onClick={handleCheck}
                style={{
                    padding: "12px 24px",
                    backgroundColor: "#22c55e",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Check My Writing
            </button>
            <button
                onClick={() => {
                    const ctx =
                        userCanvasRef.current?.getContext(
                            "2d",
                        );
                    ctx?.clearRect(0, 0, 320, 320);
                    setPoints([]);
                }}
            >
                Clear My Drawing
            </button>
        </article>
    );
}
