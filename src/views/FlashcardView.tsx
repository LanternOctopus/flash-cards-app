import React, { useEffect, useState } from 'react';
import './Flashcard.css';

interface FlashcardData {
  subject: string;
  tense: string;
  english: string;
  malayalam: string;
  transliteration: string;
  wrongAnswers: string[];
}

interface FlashcardViewProps {
  data: FlashcardData;
  updateSuccess: (success: boolean) => void;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ data, updateSuccess }) => {
  console.log(data)
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    handleFlip()
    const shuffled = [...data.wrongAnswers, data.english].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelected(null);
  }, [data]);



  const handleFlip = () => setIsFlipped((prev) => !prev);
  const handleSelect = (option: string) => {
    if (selected) return; // Prevent multiple answers
    handleFlip()
    setSelected(option);
    const correct = option === data.english;
    updateSuccess(correct);
  };

  return (
    <div className="flashcard" >
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
            <h1 >{data.english}</h1>
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
            className={(selected === option ? 'selected' : '') + ' answer'}
          >
            {option}
          </button>
        ))}
      </div>

    </div>
  );
};

export default FlashcardView;
