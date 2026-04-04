export const LETTER_STROKES = {
    A: [
        { type: "line", pts: [50, 20, 20, 80] },
        { type: "line", pts: [50, 20, 80, 80] },
        { type: "line", pts: [35, 55, 65, 55] },
    ],
    B: [
        { type: "line", pts: [30, 20, 30, 80] },
        {
            type: "curve",
            pts: [30, 20, 75, 20, 75, 50, 30, 50],
        },
        {
            type: "curve",
            pts: [30, 50, 85, 50, 85, 80, 30, 80],
        },
    ],
    C: [
        {
            type: "curve",
            pts: [75, 30, 20, 10, 20, 90, 75, 70],
        },
    ],
    D: [
        { type: "line", pts: [30, 20, 30, 80] },
        {
            type: "curve",
            pts: [30, 20, 85, 20, 85, 80, 30, 80],
        },
    ],
    E: [
        { type: "line", pts: [30, 20, 30, 80] },
        { type: "line", pts: [30, 20, 70, 20] },
        { type: "line", pts: [30, 50, 60, 50] },
        { type: "line", pts: [30, 80, 70, 80] },
    ],
    F: [
        { type: "line", pts: [30, 20, 30, 80] },
        { type: "line", pts: [30, 20, 70, 20] },
        { type: "line", pts: [30, 50, 60, 50] },
    ],
    G: [
        {
            type: "curve",
            pts: [70, 30, 20, 10, 20, 90, 70, 70],
        },
        { type: "line", pts: [70, 70, 70, 50] },
        { type: "line", pts: [70, 50, 50, 50] },
    ],
    H: [
        { type: "line", pts: [30, 20, 30, 80] },
        { type: "line", pts: [70, 20, 70, 80] },
        { type: "line", pts: [30, 50, 70, 50] },
    ],
    I: [
        { type: "line", pts: [50, 20, 50, 80] },
        { type: "line", pts: [30, 20, 70, 20] },
        { type: "line", pts: [30, 80, 70, 80] },
    ],
    J: [
        { type: "line", pts: [60, 20, 60, 70] },
        {
            type: "curve",
            pts: [60, 70, 60, 90, 20, 90, 20, 70],
        },
    ],
    K: [
        { type: "line", pts: [30, 20, 30, 80] },
        { type: "line", pts: [70, 20, 30, 50] },
        { type: "line", pts: [30, 50, 70, 80] },
    ],
    L: [
        { type: "line", pts: [35, 20, 35, 80] },
        { type: "line", pts: [35, 80, 70, 80] },
    ],
    M: [
        { type: "line", pts: [20, 80, 20, 20] },
        { type: "line", pts: [20, 20, 50, 50] },
        { type: "line", pts: [50, 50, 80, 20] },
        { type: "line", pts: [80, 20, 80, 80] },
    ],
    N: [
        { type: "line", pts: [30, 80, 30, 20] },
        { type: "line", pts: [30, 20, 70, 80] },
        { type: "line", pts: [70, 80, 70, 20] },
    ],
    O: [
        {
            type: "curve",
            pts: [50, 20, 90, 20, 90, 80, 50, 80],
        },
        {
            type: "curve",
            pts: [50, 80, 10, 80, 10, 20, 50, 20],
        },
    ],
    P: [
        { type: "line", pts: [30, 20, 30, 80] },
        {
            type: "curve",
            pts: [30, 20, 80, 20, 80, 50, 30, 50],
        },
    ],
    Q: [
        {
            type: "curve",
            pts: [50, 20, 90, 20, 90, 80, 50, 80],
        },
        {
            type: "curve",
            pts: [50, 80, 10, 80, 10, 20, 50, 20],
        },
        { type: "line", pts: [60, 65, 85, 90] },
    ],
    R: [
        { type: "line", pts: [30, 20, 30, 80] },
        {
            type: "curve",
            pts: [30, 20, 80, 20, 80, 50, 30, 50],
        },
        { type: "line", pts: [30, 50, 75, 80] },
    ],
    S: [
        {
            type: "curve",
            pts: [75, 30, 75, 10, 20, 30, 50, 50],
        },
        {
            type: "curve",
            pts: [50, 50, 80, 70, 25, 90, 25, 70],
        },
    ],
    T: [
        { type: "line", pts: [30, 20, 70, 20] },
        { type: "line", pts: [50, 20, 50, 80] },
    ],
    U: [
        {
            type: "curve",
            pts: [25, 20, 25, 100, 75, 100, 75, 20],
        },
    ],
    V: [
        { type: "line", pts: [25, 20, 50, 80] },
        { type: "line", pts: [50, 80, 75, 20] },
    ],
    W: [
        { type: "line", pts: [15, 20, 30, 80] },
        { type: "line", pts: [30, 80, 50, 40] },
        { type: "line", pts: [50, 40, 70, 80] },
        { type: "line", pts: [70, 80, 85, 20] },
    ],
    X: [
        { type: "line", pts: [25, 20, 75, 80] },
        { type: "line", pts: [75, 20, 25, 80] },
    ],
    Y: [
        { type: "line", pts: [20, 20, 50, 50] },
        { type: "line", pts: [80, 20, 50, 50] },
        { type: "line", pts: [50, 50, 50, 85] },
    ],
    Z: [
        { type: "line", pts: [25, 20, 75, 20] },
        { type: "line", pts: [75, 20, 25, 80] },
        { type: "line", pts: [25, 80, 75, 80] },
    ],
} as const;
