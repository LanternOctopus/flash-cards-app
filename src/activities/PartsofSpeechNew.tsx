import React, { use, useEffect, useState } from "react";

import { PartsofSpeechModel } from "./PartsofSpeechModel";
import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import expandContractions from "../utils/expandContractions";
import { stripPunctuation } from "../utils/utils";
import { PartialTranslation } from "./PartialTranslation";
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
        <PartialTranslation>
            <span
                className={"pos-word"}
                onClick={() => onClick()}
                style={style}
            >
                {displayWord}
                {icon}
            </span>
        </PartialTranslation>
    );
};

type PartsofSpeechItemNew = {
    text: string;
    answer: string[];
    words: string[];
    id: string;
};
export function PartsOfSpeechNew() {
    const item = useQuestion<PartsofSpeechItemNew>();
    const builder = usePageBuilder();
    const { checkCorrectness, handleNext } = useAnswer();

    const [guessedWords, setGuessedWords] = useState<
        Record<string, string>
    >({});
    const [showBack, setShowBack] = useState(false);
    const [correct, setCorrect] = useState(false);

    useEffect(() => {
        if (!item?.text) return;
        const initialGuesses: Record<string, string> = {};
        item.words.forEach(
            (w) => (initialGuesses[w] = "not guessed")
        );
        setGuessedWords(initialGuesses);
        setCorrect(false);
        setShowBack(false);
    }, [item.id]);

    const onComplete = (isCorrect: boolean) => {
        setShowBack(true);
        setCorrect(isCorrect);
        return;
    };
    const checkWord = (rawWord: string) => {
        if (guessedWords[rawWord] !== "not guessed") return;

        const expanded = expandContractions(rawWord)
            .split(" ")
            .map(stripPunctuation);

        const result = checkCorrectness(rawWord);

        setGuessedWords((prev) => {
            const updated: Record<string, string> = {
                ...prev,
            };

            updated[rawWord] = result.correct
                ? "correct"
                : "incorrect";

            expanded.forEach((w) => {
                if (prev[w] !== undefined) {
                    updated[w] = result.correct
                        ? "correct"
                        : "incorrect";
                }
            });

            return updated;
        });

        if (result.done) onComplete(result.correct);
    };

    builder.fillSlot(
        "text",
        item.words.map((word, i) => (
            <WordSpan
                key={i}
                word={word}
                guessState={
                    guessedWords[word] ?? "not guessed"
                }
                onClick={() => {
                    checkWord(word);
                }}
            />
        ))
    );
    builder.fillSlot(
        "advance",
        <button onClick={handleNext}>Next</button>
    );
    const front = builder.buildFront();
    return (
        <div>
            {front}
            {showBack && (
                <div>
                    {correct ? "Correct" : "Incorrect"}
                </div>
            )}
            {showBack && builder.slots.advance}
        </div>
    );
}
