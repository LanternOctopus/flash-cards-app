import React, { useEffect, useState } from "react";
import './PartofSpeech.css';
const normalizeWord = (word: string) => {
  if (word === "'d") return "had";
  if (word === "'ll") return "will";
  if (word === "'ve") return "have";
  if (word === "'re") return "are";
  if (word === "n't") return "not";
  // add more contractions as needed
  return word;
};
const stripPunctuation = (word: string) => {
  return word.replace(/[^a-zA-Z']/g, "");
};
type WordSpanProps = {
    word: string;
    isCorrect: boolean;
    handleWordsSelected: (word: string) => void;
    incrementWrongAnsCount: ()=> void;
};

const WordSpan: React.FC<WordSpanProps> = ({ word, isCorrect, handleWordsSelected, incrementWrongAnsCount }) => {

    const [wasClickedState, setWasClickedState] = useState<boolean>(false);
    
    const wasClicked = () => {
        setWasClickedState(true);
        if(isCorrect){ handleWordsSelected(word) }else{
            incrementWrongAnsCount()
        }  
    };
    let marginLeft = 6
    if(word.includes("'")){
        marginLeft = 0
    }
    const borderColor = wasClickedState ? isCorrect ? '3px solid green' : '3px solid red' : 'none' ;
    const icon = wasClickedState ? (isCorrect ? "✅" : "❌") : "";
    word = wasClickedState && word.includes("'") ? ' '+ normalizeWord(word) : word;
    const style: React.CSSProperties = {
        display: 'inline-block',
        padding: '0',
        border: borderColor,
        borderRadius: 3,
        cursor: 'default',
        userSelect: 'none',
        marginLeft: marginLeft,
    };

    return <span className={"pos-word"} onClick={()=>wasClicked()} style={style}>{word}{icon}</span>;
};


type PassageProps = {
    passage: string;
    answers: string[];
    handleWordsSelected: (word: string) => void;
    updateSuccess: (success: boolean) => void;
}

const Passage: React.FC<PassageProps>=({passage, answers, handleWordsSelected, updateSuccess})=>{
    const [wrongAnsCount, setWrongAnsCount ] = useState(0);
    const [keyStart,setKeyStart] = useState(0)
    
        useEffect(() => {
        setKeyStart(Math.random());
        }, [passage, answers]);
    const incrementWrongAnsCount = ()=>{
        setWrongAnsCount(wrongAnsCount+1)
    }

    useEffect(()=>{
        if(wrongAnsCount>= 3){
            updateSuccess(false)
        }
    },[wrongAnsCount, updateSuccess])
    const normalizedText = passage.replace(/’/g, "'");
    let temp = normalizedText.replace(/'/g, " '")
    console.log(temp)
    const words = temp.split(/[\s]/);
    console.log(words)
    return(
        <div role="group" aria-label="Select options">
        {words.map((word, i) => (
        <WordSpan word={word} isCorrect={answers.includes(normalizeWord(stripPunctuation(word)))} key={keyStart+i} handleWordsSelected={handleWordsSelected} incrementWrongAnsCount={incrementWrongAnsCount} />
        ))}
        </div>

    )
}

type Data = {
    tense: string;
    text: string;
    answer: string[];
    learningHint?: string;
};
type PartsOfSpeechProps = {
    data: Data;
    updateSuccess: (success: boolean) => void;
};
const PartofSpeechView: React.FC<PartsOfSpeechProps> = ({ data, updateSuccess }) => {
    const [wordsSelected, setWordsSelected] = useState<string[]>([]);
    console.log(data.answer)
    useEffect(()=>{
        setWordsSelected([])
    },[data])
    
    useEffect(() => {
        console.log('useEffect is running')
        if(data.answer.length === wordsSelected.length && data.answer.slice().sort().every((v, i) => v === wordsSelected.slice().sort()[i])){
            console.log('conditional is tripping')
            updateSuccess(true);
        }
    }, [wordsSelected, updateSuccess, data.answer]);

    const handleWordsSelected = (word: string) => {
        word = normalizeWord(stripPunctuation(word));
        setWordsSelected((prev) => [...prev, word]
        );
    };
    return (
        <section aria-live="polite" className="pos-wrapper">
            <header className="pos-header">
                <h2 className="pos-title">Find The Verbs</h2>
            </header>
            <Passage passage={data.text} answers={data.answer} handleWordsSelected={handleWordsSelected} updateSuccess={updateSuccess} />
        </section>
    );
};

export default PartofSpeechView;