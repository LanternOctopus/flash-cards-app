import React, { useState } from 'react';

interface TypingViewProps {
  data: {
    answer: string;
    [key: string]: any;
  };
  updateSuccess: (success: boolean) => void;
}

const TypingView: React.FC<TypingViewProps> = ({ data, updateSuccess }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = input.trim().toLowerCase() === data.answer.trim().toLowerCase();
    updateSuccess(isCorrect);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="typing-input">Copy this sentence:</label>
      <h3>{data.answer}</h3>
      <input
        id="typing-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your answer"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TypingView;
