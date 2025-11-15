import React, { useEffect, useRef, useState } from 'react';

interface TypingViewProps {
  data: { answer: string; [key: string]: any };
  updateSuccess: (success: boolean) => void;
}

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const answer = data.answer;
  const letters = answer.split('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<(null | 'correct' | 'wrong')[]>(
    Array(letters.length).fill(null)
  );

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processKey = (key: string) => {
    const expected = letters[currentIndex]?.toLowerCase();
    const pressed = key.toLowerCase();

    if (pressed.length !== 1) return;

    setStatuses((prev) => {
      const updated = [...prev];
      updated[currentIndex] = pressed === expected ? 'correct' : 'wrong';
      return updated;
    });

    if (pressed === expected) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex === letters.length) updateSuccess(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lastChar = e.target.value.slice(-1);
    processKey(lastChar);
    e.target.value = ''; // reset input
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: '0 auto',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h2 style={{ fontSize: 28, marginBottom: 20, color: '#444', fontWeight: 700 }}>
        Type This!
      </h2>

      {/* Hidden fixed input */}
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        autoFocus
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          width: '1px',
          height: '1px',
          opacity: 0.01,
          border: 'none',
          zIndex: 9999,
        }}
      />

      <div
        style={{
          display: 'inline-block',
          padding: '20px 30px',
          borderRadius: 14,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: 30,
        }}
      >
        {letters.map((char, idx) => {
          const status = statuses[idx];
          const baseStyle: React.CSSProperties = {
            fontSize: 40,
            fontWeight: 700,
            margin: '0 4px',
            marginBottom: 10,
            padding: '4px 6px',
            minWidth: 30,
            display: 'inline-block',
            borderRadius: 8,
            userSelect: 'none',
            transition: 'all 150ms ease',
          };

          let style = { ...baseStyle };

          if (status === 'correct') {
            style.background = '#d4ffd4';
            style.color = '#0a7a0a';
            style.boxShadow = '0 0 10px rgba(0,255,0,0.3)';
          } else if (status === 'wrong') {
            style.background = '#ffe0e0';
            style.color = '#b30000';
            style.boxShadow = '0 0 10px rgba(255,0,0,0.3)';
          } else {
            style.background = '#eee';
            style.color = '#777';
          }

          if (idx === currentIndex) {
            style.outline = '3px solid #8ab6ff';
            style.background = '#e8f0ff';
            style.boxShadow = '0 0 12px rgba(100,150,255,0.5)';
          }

          return (
            <span key={idx} style={style}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      <p style={{ marginTop: 10, fontSize: 18, color: '#666' }}>
        Start typing — each letter will light up!
      </p>
    </div>
  );
};

export default TypingView;
