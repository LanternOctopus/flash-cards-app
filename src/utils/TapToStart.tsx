import { useAudio } from "../providers/AudioProvider";

export const TapToStart = () => {
    const { soundsAllowed, toggleSoundsAllowed } =
        useAudio();

    if (soundsAllowed) return null;

    return (
        <div
            onClick={() => toggleSoundsAllowed(true)}
            style={{
                position: "fixed",
                inset: 0, // shorthand for top/left/right/bottom
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0,0,0,0.6)",
                zIndex: 9999, // 👈 this is what puts it above EVERYTHING
            }}
        >
            <button
                style={{
                    padding: "1rem 2rem",
                    fontSize: "1.5rem",
                    borderRadius: "12px",
                    border: "none",
                    background: "#ffffff",
                    color: "#000",
                    cursor: "pointer",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s ease",
                }}
                onMouseDown={(e) =>
                    (e.currentTarget.style.transform =
                        "scale(0.95)")
                }
                onMouseUp={(e) =>
                    (e.currentTarget.style.transform =
                        "scale(1)")
                }
            >
                Tap to Start 🔊
            </button>
        </div>
    );
};
