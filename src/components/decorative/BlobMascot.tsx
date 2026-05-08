import React, { useEffect, useRef, useState } from "react";

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

const STATES: Record<string, BlobState> = {
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

    veryhappy: {
        color: "#5dbd38",
        browL: [28, 35, 36, 31, 42, 34],
        browR: [58, 34, 64, 31, 72, 35],
        mouth: [41, 59, 50, 69, 59, 59],
        pupilY: 43.5,
        pupilR: 5.5,
        anim: "bigbounce",
        tear: false,
        stars: true,
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

export default function BlobMascot() {
    const frameRef = useRef<number | null>(null);

    const [active, setActive] = useState("idle");

    const [face, setFace] = useState({
        browL: STATES.idle.browL,
        browR: STATES.idle.browR,
        mouth: STATES.idle.mouth,
        pupilY: STATES.idle.pupilY,
        pupilR: STATES.idle.pupilR,
    });

    useEffect(() => {
        return () => {
            if (frameRef.current)
                cancelAnimationFrame(frameRef.current);
        };
    }, []);

    const go = (name: string) => {
        const target = STATES[name];

        if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
        }

        const from = { ...face };

        const start = performance.now();

        const animate = (now: number) => {
            const raw = Math.min(
                (now - start) / DURATION,
                1,
            );
            const t = ease(raw);

            setFace({
                browL: from.browL.map((v, i) =>
                    lerp(v, target.browL[i], t),
                ),

                browR: from.browR.map((v, i) =>
                    lerp(v, target.browR[i], t),
                ),

                mouth: from.mouth.map((v, i) =>
                    lerp(v, target.mouth[i], t),
                ),

                pupilY: lerp(from.pupilY, target.pupilY, t),

                pupilR: lerp(from.pupilR, target.pupilR, t),
            });

            if (raw < 1) {
                frameRef.current =
                    requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        setActive(name);
    };

    const current = STATES[active];

    return (
        <>
            <style>{`
        .blob-wrap{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:2rem;
          padding:2rem 0;
        }

        .blob-btns{
          display:flex;
          gap:1rem;
          flex-wrap:wrap;
          justify-content:center;
        }

        .blob-btn{
          padding:8px 20px;
          border-radius:999px;
          border:1.5px solid var(--color-border-secondary,#ccc);
          background:var(--color-background-primary,#fff);
          color:var(--color-text-primary,#111);
          font-size:14px;
          cursor:pointer;
          transition:background 0.15s,border-color 0.15s;
        }

        .blob-btn:hover{
          background:var(--color-background-secondary,#f5f5f5);
        }

        .blob-btn.active{
          background:#6fcf4a;
          border-color:#4aaa28;
          color:#1a3a0a;
        }

        .blob-svg{
          width:180px;
          height:180px;
          overflow:visible;
          transform-origin:50px 50px;
        }

        .anim-breathe{
          animation:blobBreathe 2.4s ease-in-out infinite;
        }

        .anim-bounce{
          animation:blobBounce 0.65s ease-in-out infinite;
        }

        .anim-bigbounce{
          animation:blobBig 0.5s ease-in-out infinite;
        }

        .anim-droop{
          animation:blobDroop 2s ease-in-out infinite;
        }

        .star{
          animation:starPop 0.9s ease-out infinite;
        }

        .tear{
          animation:tearDrop 1.2s ease-in infinite;
        }

        @keyframes blobBreathe{
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.05)}
        }

        @keyframes blobBounce{
          0%,100%{
            transform:translateY(0) scale(1,1)
          }

          35%{
            transform:translateY(-16px) scale(0.93,1.1)
          }

          65%{
            transform:translateY(-6px) scale(0.97,1.04)
          }
        }

        @keyframes blobBig{
          0%,100%{
            transform:translateY(0) scale(1,1)
          }

          25%{
            transform:translateY(-24px) scale(0.88,1.14)
          }

          50%{
            transform:translateY(-4px) scale(1.06,0.94)
          }

          75%{
            transform:translateY(-18px) scale(0.91,1.1)
          }
        }

        @keyframes blobDroop{
          0%,100%{
            transform:scaleY(1) translateY(0)
          }

          50%{
            transform:scaleY(0.9) translateY(5px)
          }
        }

        @keyframes starPop{
          0%{
            opacity:0;
            transform:scale(0);
          }

          50%{
            opacity:1;
            transform:scale(1.3);
          }

          100%{
            opacity:0;
            transform:scale(0.6);
          }
        }

        @keyframes tearDrop{
          0%{
            transform:translateY(0);
            opacity:1;
          }

          100%{
            transform:translateY(14px);
            opacity:0;
          }
        }
      `}</style>

            <div className="blob-wrap">
                <svg
                    viewBox="0 0 100 100"
                    className={`blob-svg anim-${current.anim}`}
                >
                    <ellipse
                        cx="50"
                        cy="58"
                        rx="32"
                        ry="7"
                        fill="rgba(0,0,0,0.08)"
                    />

                    <path
                        d="M50,15 C69,15 81,29 81,50 C81,71 69,82 50,82 C31,82 19,71 19,50 C19,29 31,15 50,15 Z"
                        fill={current.color}
                    />

                    <circle
                        cx="36"
                        cy="44"
                        r="9"
                        fill="white"
                        opacity="0.95"
                    />

                    <circle
                        cx="64"
                        cy="44"
                        r="9"
                        fill="white"
                        opacity="0.95"
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

                    <circle
                        cx="39"
                        cy="43.5"
                        r="1.8"
                        fill="white"
                    />

                    <circle
                        cx="67"
                        cy="43.5"
                        r="1.8"
                        fill="white"
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

                    <circle
                        cx="50"
                        cy="57"
                        r="1.5"
                        fill="rgba(0,0,0,0.2)"
                    />

                    <path
                        d={pathD(face.mouth)}
                        stroke="#1a1a1a"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {current.stars && (
                        <>
                            <text
                                x="78"
                                y="32"
                                fontSize="10"
                                fill="#f5c018"
                                textAnchor="middle"
                                className="star"
                            >
                                ✦
                            </text>

                            <text
                                x="22"
                                y="30"
                                fontSize="8"
                                fill="#f5c018"
                                textAnchor="middle"
                                className="star"
                                style={{
                                    animationDelay: "0.3s",
                                }}
                            >
                                ✦
                            </text>

                            <text
                                x="80"
                                y="52"
                                fontSize="7"
                                fill="#f5c018"
                                textAnchor="middle"
                                className="star"
                                style={{
                                    animationDelay: "0.6s",
                                }}
                            >
                                ✦
                            </text>
                        </>
                    )}

                    {current.tear && (
                        <circle
                            cx="66"
                            cy="56"
                            r="2.2"
                            fill="#a8d8f0"
                            className="tear"
                        />
                    )}
                </svg>

                <div className="blob-btns">
                    {Object.keys(STATES).map((name) => (
                        <button
                            key={name}
                            onClick={() => go(name)}
                            className={`blob-btn ${
                                active === name
                                    ? "active"
                                    : ""
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
