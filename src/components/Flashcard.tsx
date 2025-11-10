import React, { useEffect, useState } from 'react';
import './Flashcard.css';
import { Phrase } from '../types';

type FlashcardProps = {
  key: string;
  card: Phrase;
  allCards: Phrase[];
};

const Flashcard: React.FC<FlashcardProps> = ({ key, card, allCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [options, setOptions] = useState<[string, string][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  useEffect(() => {
    const incorrect = allCards
      .filter((c) => c.English !== card.English)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => [c.Malayalam, c.Transliteration]);

    const allOptions = [...incorrect, [card.Malayalam, card.Transliteration]].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setSelected(null);
    setIsCorrect(null);
    setShowPopup(false);
  }, [card, allCards]);

  const handleSelect = (option: string) => {
    if (selected) return;
    console.log('hi')
    setSelected(option);
    const correct = option === card.Malayalam;
    setIsCorrect(correct);
    setShowPopup(true);
        console.log(option)
    console.log(card.Malayalam)
  };

  return (
    <div className="flashcard" onClick={handleFlip} key={key}>
      <div className="left-column">
        {!isFlipped ? (
          <div className="card-front">
            <h1>{card.English}</h1>
          </div>
        ) : (
          <div className="card-back">
            <h1>{card.Malayalam}</h1>
            <h2>{card.Transliteration}</h2>
          </div>
        )}
      </div>

      <div className="right-column">
        <div className="options">
          {options.map((option) => {
            return (
              <button
                key={option[0]}
                onClick={() => handleSelect(option[0])}
                disabled={!!selected}
              >
                <div className="option-text">
                  <p className="malayalam">{option[0]}</p>
                  <p className="translit">{option[1]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showPopup && (
        <div className={`popup ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <span className="emoji happy">😊</span> Great job!
            </>
          ) : (
            <>
              <span className="emoji sad">😞</span> Try again!
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcard;
