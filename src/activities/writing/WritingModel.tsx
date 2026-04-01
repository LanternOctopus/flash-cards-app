import { ActivityModel } from "./../Models";
import { LETTER_STROKES } from "../../utils/letterStrokes";
type Point = { x: number; y: number };
export type Stroke = {
    type: "line" | "curve";
    readonly pts: readonly number[];
};
export type HandwritingItem = {
    text: string; // word or sentence
    repeat: number;
    strokes: Stroke[]; // ideal strokes for the text
    id: string;
};
export class HandwritingModel extends ActivityModel<any> {
    protected currentItem: any | null = null;

    // Ideal alphabet strokes (just an example, fill with your data)
    alphabet: Record<string, readonly Stroke[]> =
        LETTER_STROKES;

    constructor(raw: unknown) {
        super(raw);
        Object.values(this.rawData).forEach((set) =>
            set.forEach((item) => {
                (item as any).strokes =
                    this.getStrokesForText(item.text);
            }),
        );
        this.checkCorrectness =
            this.checkCorrectness.bind(this);
    }

    protected getNormalizedPoints(
        points: Point[],
    ): Point[] {
        if (!points.length) return [];

        // Compute bounding box
        const xs = points.map((p) => p.x);
        const ys = points.map((p) => p.y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);

        const width = maxX - minX || 1;
        const height = maxY - minY || 1;

        // Normalize points to 0-100 canvas space
        return points.map((p) => ({
            x: ((p.x - minX) / width) * 100,
            y: ((p.y - minY) / height) * 100,
        }));
    }

    protected getIdealPoints(
        strokes: readonly Stroke[],
    ): Point[] {
        const idealPoints: Point[] = [];
        strokes.forEach((s) => {
            const pts = s.pts.map((v) => v * 2.5 + 35);
            for (let t = 0; t <= 1; t += 0.05) {
                if (s.type === "line") {
                    idealPoints.push({
                        x: pts[0] + (pts[2] - pts[0]) * t,
                        y: pts[1] + (pts[3] - pts[1]) * t,
                    });
                } else {
                    idealPoints.push(
                        this.getBezier(t, pts),
                    );
                }
            }
        });
        return this.getNormalizedPoints(idealPoints);
    }

    protected getBezier(t: number, pts: number[]): Point {
        const [x0, y0, x1, y1, x2, y2, x3, y3] = pts;
        const x =
            Math.pow(1 - t, 3) * x0 +
            3 * Math.pow(1 - t, 2) * t * x1 +
            3 * (1 - t) * Math.pow(t, 2) * x2 +
            Math.pow(t, 3) * x3;
        const y =
            Math.pow(1 - t, 3) * y0 +
            3 * Math.pow(1 - t, 2) * t * y1 +
            3 * (1 - t) * Math.pow(t, 2) * y2 +
            Math.pow(t, 3) * y3;
        return { x, y };
    }

    checkCorrectness(
        userPoints: Point[],
        letterKey: string,
    ): { correct: boolean; score: number } {
        const idealPoints = this.getIdealPoints(
            this.alphabet[letterKey] || [],
        );
        const normalizedUserPoints =
            this.getNormalizedPoints(userPoints);

        if (!normalizedUserPoints.length)
            return { correct: false, score: 0 };

        let totalDistance = 0;

        normalizedUserPoints.forEach((uPt) => {
            let minDist = Infinity;
            idealPoints.forEach((iPt) => {
                const dist = Math.hypot(
                    uPt.x - iPt.x,
                    uPt.y - iPt.y,
                );
                if (dist < minDist) minDist = dist;
            });
            totalDistance += minDist;
        });

        const avgDist =
            totalDistance / normalizedUserPoints.length;

        // Non-linear scoring for beginner-friendly feel
        const score = Math.round(
            100 * Math.exp(-avgDist / 20),
        );

        return { correct: score >= 70, score }; // 70+ is considered correct
    }
    protected isValidItem(
        item: unknown,
    ): item is HandwritingItem {
        return (
            typeof item === "object" &&
            item !== null &&
            "text" in item
        );
    }
    getStrokesForText(text: string): Stroke[] {
        const letters = text.toUpperCase().split("");

        return letters.flatMap((l) => {
            return this.alphabet[l] || [];
        });
    }
}
