import React, { useState, useRef, useEffect } from 'react';
import './TypingView.css';

interface TypingViewProps {
  data: {
    answer: string;
    [key: string]: any;
  };
  updateSuccess: (success: boolean) => void;
}

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const answer = data.answer;
  const letters = answer.split('');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<(null | 'correct' | 'wrong')[]>(Array(letters.length).fill(null));
  const [typed, setTyped] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus hidden input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInput = (value: string) => {
    const nextIndex = value.length - 1;
    const pressed = value[nextIndex]?.toLowerCase();
    const expected = letters[currentIndex]?.toLowerCase();

    if (!pressed) return;

    setStatuses((prev) => {
      const updated = [...prev];
      updated[currentIndex] = pressed === expected ? 'correct' : 'wrong';
      return updated;
    });

    if (pressed === expected) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (newIndex === letters.length) updateSuccess(true);
    }

    setTyped(value);
  };

  return (
    <div className="typing-container" onClick={() => inputRef.current?.focus()}>
      <label className="typing-label">Type this sentence:</label>
      <h3 className="typing-sentence">
        {letters.map((char, idx) => {
          const status = statuses[idx];
          return (
            <span key={idx} className={`letter ${status || ''}`}>
              {char}
            </span>
          );
        })}
      </h3>

      <input
        ref={inputRef}
        type="text"
        autoFocus
        value={typed}
        onChange={(e) => handleInput(e.target.value)}
        className="hidden-input"
      />

      <p className="hint-text">Tap here and start typing!</p>
    </div>
  );
};

export default TypingView;
