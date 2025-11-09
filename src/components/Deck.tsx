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
            <button onClick={handleNext} className="next">Next Card →</button>
        </div>
    );
};

export default Deck;
