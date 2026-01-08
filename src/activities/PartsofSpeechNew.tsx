import React, { use, useEffect, useState } from "react";

import { PartsofSpeechModel } from "./PartsofSpeechModel";
import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import expandContractions from "../utils/expandContractions";
export function PartsOfSpeechScreen() {
    return (
        <ParentScreen
            itemPath="PartsofSpeech.yaml"
            configPath="PartsofSpeechConfig.yaml"
            storageKey="partsofSpeech"
            modelClass={PartsofSpeechModel}
        >
            <PartsOfSpeechNew />
        </ParentScreen>
    );
}

type WordSpanProps = {
    word: string;
    guessState: string;
    onClick: () => void;
};

const WordSpan: React.FC<WordSpanProps> = ({
    word,
    guessState,
    onClick,
}) => {
    let marginLeft = 6;
    if (word.includes("'")) {
        marginLeft = 0;
    }
    const borderColor =
        guessState === "not guessed"
            ? "none"
            : guessState === "correct"
            ? "3px solid green"
            : "3px solid red";
    const icon =
        guessState === "not guessed"
            ? ""
            : guessState === "correct"
            ? "✅"
            : "❌";
    const displayWord =
        guessState === "not guessed"
            ? word
            : expandContractions(word);
    const style: React.CSSProperties = {
        display: "inline-block",
        padding: "0",
        border: borderColor,
        borderRadius: 3,
        cursor: "default",
        userSelect: "none",
        marginLeft: marginLeft,
    };

    return (
        <span
            className={"pos-word"}
            onClick={() => onClick()}
            style={style}
        >
            {displayWord}
            {icon}
        </span>
    );
};

type PartsofSpeechItemNew = {
    text: string;
    answer: string[];
};
export function PartsOfSpeechNew() {
    const item = useQuestion<PartsofSpeechItemNew>();
    const builder = usePageBuilder();
    const slots = builder.slots;
    const { checkCorrectness, handleNext } = useAnswer();

    const [words, setWords] = useState<string[]>([]);
    const [guessedWords, setGuessedWords] = useState<
        Record<string, string>
    >({});
    const [success, setSuccess] = useState<boolean | null>(
        null
    );

    // Initialize words and reset guessed state whenever the item changes
    useEffect(() => {
        if (!item?.text) return;
        const splitWords = item.text.split(" ");
        setWords(splitWords);
        // Initialize guessedWords as 'not guessed'
        const initialGuesses: Record<string, string> = {};
        splitWords.forEach(
            (w) => (initialGuesses[w] = "not guessed")
        );
        setGuessedWords(initialGuesses);
        setSuccess(null); // reset success per item
    }, [item]);

    const onComplete = (isCorrect: boolean) => {
        setSuccess(isCorrect);
    };

    const checkWord = (rawWord: string) => {
        if (!words.includes(rawWord)) return;

        const result = checkCorrectness(rawWord);

        setGuessedWords((prev) => ({
            ...prev,
            [rawWord]: result.correct
                ? "correct"
                : "incorrect",
        }));

        if (result.done) onComplete(true);
    };

    slots.text = words.map((word, i) => (
        <WordSpan
            key={i}
            word={word}
            guessState={guessedWords[word] ?? "not guessed"}
            onClick={() => {
                if (
                    (guessedWords[word] ??
                        "not guessed") !== "not guessed"
                )
                    return;
                checkWord(word);
            }}
        />
    ));

    slots.advance = (
        <button onClick={handleNext}>Next</button>
    );
    const front = builder.buildFront();
    return <div>{front}</div>;
}
