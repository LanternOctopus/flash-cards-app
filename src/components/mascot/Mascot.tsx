import React, { useEffect, useRef, useState } from "react";
import { useScore } from "../../providers/ScoreProvider";

type BlobState = {
    color: string;
    browL: number[];
    browR: number[];
    mouth: number[];
    pupilY: number;
    pupilR: number;
    anim: string;
    tear: boolean;
    stars: boolean;
};

const STATES: Record<"idle" | "happy" | "sad", BlobState> =
    {
        idle: {
            color: "#6fcf4a",
            browL: [29, 37, 36, 34, 42, 36],
            browR: [58, 36, 64, 34, 71, 37],
            mouth: [44, 61, 50, 65, 56, 61],
            pupilY: 45.5,
            pupilR: 5,
            anim: "breathe",
            tear: false,
            stars: false,
        },

        happy: {
            color: "#6fcf4a",
            browL: [29, 36, 36, 33, 42, 35],
            browR: [58, 35, 64, 33, 71, 36],
            mouth: [42, 60, 50, 68, 58, 60],
            pupilY: 44.5,
            pupilR: 5,
            anim: "bounce",
            tear: false,
            stars: false,
        },

        sad: {
            color: "#7ab85a",
            browL: [29, 39, 36, 37, 42, 40],
            browR: [58, 40, 64, 37, 71, 39],
            mouth: [44, 63, 50, 58, 56, 63],
            pupilY: 47,
            pupilR: 4.5,
            anim: "droop",
            tear: true,
            stars: false,
        },
    };

const DURATION = 280;

const lerp = (a: number, b: number, t: number) =>
    a + (b - a) * t;

const ease = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const pathD = (pts: number[]) =>
    `M${pts[0]},${pts[1]} Q${pts[2]},${pts[3]} ${pts[4]},${pts[5]}`;

export default function Mascot() {
    const { mood, moodEventId } = useScore();

    const frameRef = useRef<number | null>(null);

    const resetRef = useRef<NodeJS.Timeout | null>(null);

    const [active, setActive] = useState<
        "idle" | "happy" | "sad"
    >("idle");

    const [face, setFace] = useState({
        browL: STATES.idle.browL,
        browR: STATES.idle.browR,
        mouth: STATES.idle.mouth,
        pupilY: STATES.idle.pupilY,
        pupilR: STATES.idle.pupilR,
    });

    const animateTo = (
        target: "idle" | "happy" | "sad",
    ) => {
        const state = STATES[target];

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        const from = {
            browL: [...face.browL],
            browR: [...face.browR],
            mouth: [...face.mouth],
            pupilY: face.pupilY,
            pupilR: face.pupilR,
        };

        const start = performance.now();

        const animate = (now: number) => {
            const t = ease(
                Math.min((now - start) / DURATION, 1),
            );

            setFace({
                browL: from.browL.map((v, i) =>
                    lerp(v, state.browL[i], t),
                ),

                browR: from.browR.map((v, i) =>
                    lerp(v, state.browR[i], t),
                ),

                mouth: from.mouth.map((v, i) =>
                    lerp(v, state.mouth[i], t),
                ),

                pupilY: lerp(from.pupilY, state.pupilY, t),

                pupilR: lerp(from.pupilR, state.pupilR, t),
            });

            if (t < 1) {
                frameRef.current =
                    requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        setActive(target);
    };

    useEffect(() => {
        if (!mood) return;
        console.log("Mood changed:", mood);
        animateTo(mood);

        if (resetRef.current) {
            clearTimeout(resetRef.current);
        }

        resetRef.current = setTimeout(() => {
            animateTo("idle");
        }, 1000);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            if (resetRef.current) {
                clearTimeout(resetRef.current);
            }
        };
    }, [moodEventId]);

    const current = STATES[active];

    return (
        <>
            <style>{`
                .blob-wrap {
                    display: flex;
                    justify-content: center;
                    padding: 1rem 0;
                }

                .blob-svg {
                    width: 100px;
                    height: 100px;
                    overflow: visible;
                    transform-origin: 50px 50px;
                }

                .anim-breathe {
                    animation: blobBreathe 2.4s ease-in-out infinite;
                }

                .anim-bounce {
                    animation: blobBounce 0.65s ease-in-out infinite;
                }

                .anim-droop {
                    animation: blobDroop 1s ease-in-out infinite;
                }

                @keyframes blobBreathe {
                    0%,100% {
                        transform: scale(1);
                    }

                    50% {
                        transform: scale(1.05);
                    }
                }

                @keyframes blobBounce {
                    0%,100% {
                        transform: translateY(0);
                    }

                    35% {
                        transform: translateY(-16px)
                            scale(0.93,1.1);
                    }
                }

                @keyframes blobDroop {
                    0%,100% {
                        transform: scaleY(1);
                    }

                    50% {
                        transform: scaleY(0.9)
                            translateY(5px);
                    }
                }
            `}</style>

            <div className="blob-wrap">
                <svg
                    viewBox="0 0 100 100"
                    className={`blob-svg anim-${current.anim}`}
                >
                    <path
                        d="M50,15 C69,15 81,29 81,50 C81,71 69,82 50,82 C31,82 19,71 19,50 C19,29 31,15 50,15 Z"
                        fill={current.color}
                    />

                    <circle
                        cx="36"
                        cy="44"
                        r="9"
                        fill="white"
                    />

                    <circle
                        cx="64"
                        cy="44"
                        r="9"
                        fill="white"
                    />

                    <circle
                        cx="37.5"
                        cy={face.pupilY}
                        r={face.pupilR}
                        fill="#1a1a1a"
                    />

                    <circle
                        cx="65.5"
                        cy={face.pupilY}
                        r={face.pupilR}
                        fill="#1a1a1a"
                    />

                    <path
                        d={pathD(face.browL)}
                        stroke="#1a1a1a"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                    />

                    <path
                        d={pathD(face.browR)}
                        stroke="#1a1a1a"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                    />

                    <path
                        d={pathD(face.mouth)}
                        stroke="#1a1a1a"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {current.tear && (
                        <circle
                            cx="66"
                            cy="56"
                            r="2.2"
                            fill="#a8d8f0"
                        />
                    )}
                </svg>
            </div>
        </>
    );
}
