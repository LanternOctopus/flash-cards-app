import React, { useEffect, useState } from 'react';

interface TypingViewProps {
  data: {
    answer: string;
    [key: string]: any;
  };
  updateSuccess: (success: boolean) => void;
}

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const answer = data.answer;
  const letters = answer.split("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<(null | "correct" | "wrong")[]>(
    Array(letters.length).fill(null)
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const expected = letters[currentIndex]?.toLowerCase();
      const pressed = e.key.toLowerCase();

      if (pressed.length !== 1) return;

      setStatuses((prev) => {
        const updated = [...prev];
        updated[currentIndex] =
          pressed === expected ? "correct" : "wrong";
        return updated;
      });

      if (pressed === expected) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex === letters.length) {
          updateSuccess(true);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, letters, updateSuccess]);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "20px",
          color: "#444",
          fontWeight: 700,
        }}
      >
        Type This!
      </h2>

      <div
        style={{
          display: "inline-block",
          padding: "20px 30px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        {letters.map((char, idx) => {
          const status = statuses[idx];
          const baseStyle: React.CSSProperties = {
            fontSize: "40px",
            fontWeight: "700",
            margin: "0 4px",
            marginBottom: "10px",
            padding: "4px 6px",
            minWidth: "30px",
            display: "inline-block",
            borderRadius: "8px",
            userSelect: "none",
            transition: "all 150ms ease",
          };

          let style = { ...baseStyle };

          if (status === "correct") {
            style.background = "#d4ffd4";
            style.color = "#0a7a0a";
            style.boxShadow = "0 0 10px rgba(0,255,0,0.3)";
          } else if (status === "wrong") {
            style.background = "#ffe0e0";
            style.color = "#b30000";
            style.boxShadow = "0 0 10px rgba(255,0,0,0.3)";
          } else {
            style.background = "#eee";
            style.color = "#777";
          }

          // Highlight the active letter
          if (idx === currentIndex) {
            style.outline = "3px solid #8ab6ff";
            style.background = "#e8f0ff";
            style.boxShadow = "0 0 12px rgba(100,150,255,0.5)";
          }

          return (
            <span key={idx} style={style}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      <p
        style={{
          marginTop: "10px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Start typing — each letter will light up!
      </p>
    </div>
  );
};

export default TypingView;
