import React, { useEffect, useRef, useState } from "react";

interface TypingViewProps {
  data: {
    answer: string;
    [key: string]: any;
  };
  updateSuccess: (success: boolean) => void;
}

const KEY_ROWS: string[][] = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
  ["Space"],
];

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const answer = data.answer || "";
  const letters = answer.split("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<(null | "correct" | "wrong")[]>(
    Array(letters.length).fill(null)
  );

  // which key was just pressed (for brief flash)
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Focus hidden input on mount (mobile)
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // normalize a char to the key label used in keyboard
  const charToKeyLabel = (c: string) => {
    if (!c) return "";
    if (c === " ") return "Space";
    return c.toLowerCase();
  };

  // handle a key press (both physical and svg taps)
  const handleKey = (key: string) => {
    if (currentIndex >= letters.length) return;
    if (!key) return;

    // normalize pressed char
    const pressed = key.length === 1 ? key.toLowerCase() : key;

    setPressedKey(pressed);
    // flash pressed key briefly
    window.setTimeout(() => setPressedKey(null), 180);

    const expected = (letters[currentIndex] || "").toLowerCase();
    // treat space equivalently
    const pressedNormalized = pressed === " " ? " " : pressed;
    const expectedNormalized = expected === " " ? " " : expected;

    // only single character or "Space" label allowed
    const pressedChar = pressed === "Space" ? " " : pressedNormalized;

    if (pressedChar.length !== 1) return;

    setStatuses((prev) => {
      const updated = [...prev];
      updated[currentIndex] =
        pressedChar === expectedNormalized ? "correct" : "wrong";
      return updated;
    });

    if (pressedChar === expectedNormalized) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex === letters.length) {
        // small timeout so last key flash visible
        setTimeout(() => updateSuccess(true), 150);
      }
    }
  };

  // Listen to real keyboard events
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // ignore modifier keys
      if (e.key.length > 1 && e.key !== " ") return;
      handleKey(e.key === " " ? "Space" : e.key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, letters]);

  // current expected key label (Space or single char)
  const expectedChar = letters[currentIndex] || "";
  const expectedKeyLabel = charToKeyLabel(expectedChar);

  // ---------- SVG keyboard rendering ----------
  // Layout math
  const svgWidth = 800;
  const rowHeights = 64;
  const keyGap = 8;
  const sidePadding = 12;

  // helper to create key rect + label
  const renderKey = (
    keyLabel: string,
    x: number,
    y: number,
    w: number,
    h: number,
    index: number
  ) => {
    const isExpected =
      keyLabel.toLowerCase() === expectedKeyLabel.toLowerCase();
    const isPressed =
      pressedKey &&
      (pressedKey.toLowerCase() === keyLabel.toLowerCase() ||
        (pressedKey === "Space" && keyLabel === "Space"));

    const baseFill = isExpected ? "#e8f4ff" : "#ffffff";
    const stroke = isExpected ? "#2f80ed" : "#cfcfcf";
    const strokeWidth = isExpected ? 3 : 1;
    const rx = 8;

    // pressed overlay color
    const overlayFill = isPressed ? "rgba(47,128,237,0.14)" : "transparent";

    const label =
      keyLabel === "Space" ? "Space" : keyLabel.toUpperCase();

    return (
      <g
        key={keyLabel + index}
        transform={`translate(${x}, ${y})`}
        style={{ cursor: "pointer" }}
        onClick={() => {
          // Tap triggers same handler as keyboard
          handleKey(keyLabel === "Space" ? "Space" : keyLabel);
        }}
      >
        <rect
          x={0}
          y={0}
          rx={rx}
          ry={rx}
          width={w}
          height={h}
          fill={baseFill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        <rect x={0} y={0} width={w} height={h} fill={overlayFill} rx={rx} ry={rx} />
        <text
          x={w / 2}
          y={h / 2 + 6}
          fontSize={18}
          fontFamily="system-ui, Arial, sans-serif"
          fill={isExpected ? "#0b57b9" : "#111"}
          textAnchor="middle"
        >
          {label}
        </text>
      </g>
    );
  };

  // Compute keys positions row-by-row
  const rows = KEY_ROWS;
  const svgRows: React.ReactNode[] = [];
  let yCursor = 10;

  rows.forEach((row, rowIndex) => {
    // compute widths: last row "Space" wider
    const totalGaps = (row.length - 1) * keyGap;
    const availableWidth = svgWidth - sidePadding * 2 - totalGaps;
    let keyWidth = (availableWidth / row.length) | 0;

    // If row contains Space make it big
    let keyWidths: number[] = row.map((k) =>
      k === "Space" ? keyWidth * 3 + keyGap * 2 : keyWidth
    );

    // If Space present adjust others to fit
    if (row.includes("Space")) {
      const nonSpaceCount = row.filter((k) => k !== "Space").length;
      const usedBySpace = keyWidths[row.indexOf("Space")];
      const remainingWidth = svgWidth - sidePadding * 2 - usedBySpace - (nonSpaceCount - 1) * keyGap;
      const normalKeyW = Math.max(40, (remainingWidth / Math.max(1, nonSpaceCount)) | 0);
      keyWidths = row.map((k) => (k === "Space" ? usedBySpace : normalKeyW));
    }

    let xCursor = sidePadding;

    row.forEach((keyLabel, keyIndex) => {
      const w = keyWidths[keyIndex];
      svgRows.push(renderKey(keyLabel, xCursor, yCursor, w, rowHeights - 10, rowIndex * 10 + keyIndex));
      xCursor += w + keyGap;
    });

    yCursor += rowHeights;
  });

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        textAlign: "center",
        padding: 20,
        userSelect: "none",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden input to open mobile keyboard */}
      <input
        ref={inputRef}
        type="text"
        value={""}
        onChange={(e) => {
          // take last char typed by mobile keyboard
          const v = e.target.value;
          const last = v.slice(-1);
          if (!last) return;
          handleKey(last === " " ? "Space" : last);
          // clear value so next onChange yields single char
          if (inputRef.current) inputRef.current.value = "";
        }}
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
        }}
        autoFocus
      />

      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Type this:</h2>

      <div
        style={{
          display: "inline-block",
          padding: 16,
          borderRadius: 10,
          background: "#fafafa",
          marginBottom: 14,
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        }}
      >
        {letters.map((char, idx) => {
          const status = statuses[idx];
          const baseStyle: React.CSSProperties = {
            fontSize: 28,
            fontWeight: 700,
            margin: "0 6px",
            padding: "6px 10px",
            minWidth: 26,
            display: "inline-block",
            borderRadius: 8,
            userSelect: "none",
            transition: "all 140ms ease",
          };

          let style = { ...baseStyle };

          if (status === "correct") {
            style.background = "#d4ffd4";
            style.color = "#0a7a0a";
            style.boxShadow = "0 0 8px rgba(0,255,0,0.12)";
          } else if (status === "wrong") {
            style.background = "#ffecec";
            style.color = "#b30000";
            style.boxShadow = "0 0 8px rgba(255,0,0,0.12)";
          } else {
            style.background = "#fff";
            style.color = "#222";
            style.border = "1px solid #eee";
          }

          if (idx === currentIndex) {
            style.outline = "3px solid rgba(50,120,255,0.18)";
            style.boxShadow = "0 0 10px rgba(80,140,255,0.14)";
          }

          return (
            <span key={idx} style={style}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>

      <div style={{ marginTop: 14 }}>
        <svg
          width="100%"
          height={260}
          viewBox={`0 0 ${svgWidth} ${yCursor + 8}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {svgRows}
        </svg>
      </div>

      <p style={{ marginTop: 12, color: "#666" }}>
        Expected:{" "}
        <strong style={{ color: "#2f80ed" }}>
          {expectedChar === " " ? "[space]" : expectedChar}
        </strong>
      </p>
    </div>
  );
};

export default TypingView;
