import consonants from '../data/consonants.json';
import cards from '../data/verbs.json'
export type Consonant = {
  letter: string;
  transliteration: string;
  audio: string;
};
export type Phrase = {
  English: string;
  Malayalam: string;
  Transliteration: string;
}
export const getConsonants = (): Consonant[] => {
  return consonants;
};
export const getDeck = () : Phrase[] => {
  return cards;
} 