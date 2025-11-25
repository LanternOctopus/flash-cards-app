import React, { useEffect, useState } from "react";
import SVGKeyboard from "../components/Keyboard";
import { TypingItem } from "../types";
interface TypingViewProps {
  data: TypingItem
  updateSuccess: (success: boolean) => void;
}

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const answer = data.answer || "The quick brown fox jumps over the lazy dog";
  const letters = answer.split("");
  useEffect(() => {
    const letters = data.answer.split(""); // update letters if data changes
    setStatuses(Array(letters.length).fill(null)); // reset statuses
    setCurrentIndex(0); // reset the typing index
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<(null | "correct" | "wrong")[]>(
    Array(letters.length).fill(null)
  );


  const handleKey = (key:string)=>{
      if (currentIndex >= letters.length) return;
      if (!key) return;
      if( key.length !== 1) return;
      //do not delete the space
      if (!"abcdefghijklmnopqrstuvwxyz .,".includes(key.toLowerCase())) return;
      if(!letters[currentIndex]) return;
      
      const expected = (letters[currentIndex]).toLowerCase();
      
      setStatuses((prev)=>{
          const updated = [...prev];
          updated[currentIndex]= 
          key === expected ? "correct" : "wrong";
          return updated;
      })
      if( key !== expected ) return;
      if(currentIndex+1 === letters.length) setTimeout(()=>updateSuccess(true),150)
      setCurrentIndex(currentIndex+1);
  }
  // Listen to real keyboard events
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      handleKey(e.key);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, letters]);



  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        textAlign: "center",
        padding: 20,
        userSelect: "none",
      }}
    >


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
          style.background = "#fff";
          style.color = "#222";
          style.border = "1px solid #eee";
          if (status === "correct") {
            style.background = "#d4ffd4";
            style.color = "#0a7a0a";
            style.boxShadow = "0 0 8px rgba(0,255,0,0.12)";
          } else if (status === "wrong") {
            style.background = "#ffecec";
            style.color = "#b30000";
            style.boxShadow = "0 0 8px rgba(255,0,0,0.12)";
          }

          if (idx === currentIndex) {
            style.outline = "3px solid rgba(50,120,255,0.18)";
            style.boxShadow = "0 0 10px rgba(80,140,255,0.14)";
          }

          return (
            <span key={idx+char} style={style}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
      <SVGKeyboard letter={letters[currentIndex]} />
    </div>
  );
};

export default TypingView;
