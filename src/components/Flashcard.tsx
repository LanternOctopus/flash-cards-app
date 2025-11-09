import React, { useEffect, useState } from 'react';
// import { playSound } from '../utils/audio.ts';
import './Flashcard.css';
// import { Consonant } from '../types';
import { Phrase } from '../types';
// type FlashcardProps = {
//   key:string;
//   card: Consonant;
//   allCards: Consonant[];
// };
type FlashcardProps = {
  key:string;
  card: Phrase;
  allCards: Phrase[];
};
 const Flashcard: React.FC<FlashcardProps> = ({ key,card, allCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped((prev)=>!prev);
  };
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(()=>{
    const incorrect = allCards
      .filter(c => c.English !== card.English)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.English);

      const allOptions = [...incorrect, card.English].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
      setSelected(null);
  }, [card, allCards])
  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="flashcard" onClick={handleFlip} key={key}>
      <>
      {/* <button onClick={(e) => { e.stopPropagation(); playSound(card.audio)}} className='playButton'>Play Sound</button> */}
      {!isFlipped ? (
        <div className="card-front"><h1>{card.Malayalam}</h1><h2>{card.Transliteration}</h2></div>
      ) : (
        <div className="card-back"><h2>{card.English}</h2>
      
        </div>
      )}
        <div className="options">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            disabled={!!selected}
            className={ `answer ${
              selected
                ? option === card.English
                  ? 'correct'
                  : option === selected
                    ? 'incorrect'
                    : ''
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {selected && (
        <div className="result">
          {selected === card.English ? '✅ Correct!' : '❌ Wrong'}
        </div>
      )}
      </>
    </div>
  );
};
export default Flashcard;
