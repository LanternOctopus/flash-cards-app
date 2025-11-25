import React, { useEffect, useState } from 'react';
import './Flashcard.css';
import { FlashcardItem } from "../types"
function capitalizeFirstLetter(str: string): string {
  if (!str || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type FlashcardViewProps = {
  data: FlashcardItem;
  updateSuccess: (success: boolean) => void;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ data, updateSuccess }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset card when data changes
  useEffect(() => {
    const shuffled = [...data.wrongAnswers, data.english].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelected(null);
    setIsFlipped(false); // always show front
  }, [data]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleSelect = (option: string) => {
    if (selected) return; // prevent multiple selections
    setSelected(option);
    handleFlip(); // flip after selecting
    updateSuccess(option === data.english);
  };

  return (
    <div className="flashcard">
      <div className="">
        {!isFlipped ? (
          <div className="card-front">
            <div className='card-question'>
              <h1>{data.malayalam}</h1>
              <p>{data.transliteration}</p>
            </div>
          </div>
        ) : (
          <div className="card-back">
            <div className='card-question'>
              <h1>{data.english}</h1>
              <h3>{data.malayalam}</h3>
              <p>{data.transliteration}</p>
              <h2>Subject: {data.subject}</h2>
              <p>Tense: {data.tense}</p>
            </div>
          </div>
        )}
      </div>

      <div className='options'>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={!!selected}
            className={(selected === option ? 'selected' : '') + ' answer ' + (option==data.english ? 'correct' : "wrong")}
          >
            {capitalizeFirstLetter(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlashcardView;
