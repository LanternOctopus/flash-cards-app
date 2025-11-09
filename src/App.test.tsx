import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flashcard from './components/Flashcard.tsx';
import { Consonant } from './types';

const mockCard: Consonant = {
  letter: 'ക',
  transliteration: 'ka',
  audio: 'ക.wav',
};

const mockDeck: Consonant[] = [
  mockCard,
  { letter: 'ഖ', transliteration: 'kha', audio: 'ഖ.wav' },
  { letter: 'ഗ', transliteration: 'ga', audio: 'ഗ.wav' },
  { letter: 'ഘ', transliteration: 'gha', audio: 'ഘ.wav' },
];

describe('<Flashcard />', () => {
  it('renders the letter', () => {
    render(<Flashcard card={mockCard} allCards={mockDeck} onNext={() => {}} />);
    expect(screen.getByText('ക')).toBeInTheDocument();
  });

  it('renders 4 answer options', () => {
    render(<Flashcard card={mockCard} allCards={mockDeck} onNext={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  it('shows ✅ when correct answer is selected', () => {
    render(<Flashcard card={mockCard} allCards={mockDeck} onNext={() => {}} />);
    const correctBtn = screen.getByText('ka');
    fireEvent.click(correctBtn);
    expect(screen.getByText(/✅/)).toBeInTheDocument();
  });

  it('shows ❌ when wrong answer is selected', () => {
    render(<Flashcard card={mockCard} allCards={mockDeck} onNext={() => {}} />);
    const wrongBtn = screen.getByText((text) => text !== 'ka'); // get a wrong answer
    fireEvent.click(wrongBtn);
    expect(screen.getByText(/❌/)).toBeInTheDocument();
  });

  it('calls onNext when Next Card is clicked', () => {
    const mockNext = jest.fn();
    render(<Flashcard card={mockCard} allCards={mockDeck} onNext={mockNext} />);
    fireEvent.click(screen.getByText('ka')); // select correct
    fireEvent.click(screen.getByText('Next Card'));
    expect(mockNext).toHaveBeenCalled();
  });
});
