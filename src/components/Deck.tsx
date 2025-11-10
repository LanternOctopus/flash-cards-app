import React, { useEffect, useState } from 'react';
import Flashcard from './Flashcard.tsx';
// import { Consonant } from '../types';
// import { getConsonants } from './../utils/getData.ts';
import { Phrase } from '../types';
import { getDeck } from './../utils/getData.ts';
type DeckProps = {
    category: string;
};

const shuffle = (array: Phrase[]): Phrase[] => {
    return [...array].sort(() => Math.random() - 0.5);
};
const Deck: React.FC<DeckProps> = ({ category }) => {
    const [shuffledDeck, setShuffledDeck] = useState<Phrase[]>([]);
    useEffect(() => {
        const deck = getDeck();
        setShuffledDeck(shuffle(deck));
    }, []);
    const [index, setIndex] = useState(0);
    const handlePrev = () => {
    setIndex((prev) =>
        prev === 0 ? shuffledDeck.length - 1 : prev - 1
    );
    };
    const handleNext = () => {
        setIndex((prev) => (prev + 1) % shuffledDeck.length);
    };
    if (shuffledDeck.length === 0) return <div>Loading...</div>;
    const currentCard : Phrase = shuffledDeck[index];
    return (
        <div>
            <Flashcard
                key={currentCard.English}
                card= {currentCard}
                allCards={shuffledDeck}
            />
            <div className='nav-buttons'>
                <button onClick={handlePrev} className="previous nav-button">← Previous Card</button>
                <button onClick={handleNext} className="next nav-button">Next Card →</button>
            </div>
        </div>
    );
};

export default Deck;
