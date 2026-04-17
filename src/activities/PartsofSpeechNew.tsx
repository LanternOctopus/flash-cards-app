import React, { useEffect, useState } from "react";

import { PartsofSpeechModel } from "./PartsofSpeechModel";
import { useVisibilityGate } from "../components/VisibilityGateContext";
import { useAnswer } from "../providers/AnswerProvider";
import { useQuestion } from "../providers/QuestionContext";
import { ParentScreen } from "./ParentScreen";
import expandContractions from "../utils/expandContractions";
import { stripPunctuation } from "../utils/utils";
import { PartOfSpeechMagicalGirl } from "../components/decorative/PartofSpeechMagicalGirl";
export function PartsOfSpeechScreen() {
    return (
        <ParentScreen
            itemPath="verbs/identification/PartsofSpeech.yaml"
            configPath="config/PartsofSpeechConfig.yaml"
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
    const outline =
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
        outline: outline,
        cursor: "pointer",
    };

    return (
        <label style={style}>
            <input
                type="checkbox"
                name="pos"
                style={{ display: "none" }} // Hides the actual box, but the label remains clickable
                onClick={onClick}
                aria-invalid={
                    guessState === "correct"
                        ? "false"
                        : guessState === "wrong"
                          ? "true"
                          : undefined
                }
            />
            {displayWord}
            {icon}
        </label>
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
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();

    const [guessedWords, setGuessedWords] = useState<
        Record<string, string>
    >({});
    const [showBack, setShowBack] = useState(false);
    const [correct, setCorrect] = useState<boolean>();
    const [latestWord, setLatestWord] = useState<string>();
    useEffect(() => {
        if (!item?.text) return;
        const initialGuesses: Record<string, string> = {};
        item.words.forEach(
            (w) => (initialGuesses[w] = "not guessed"),
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
        setLatestWord(rawWord);
        console.log("latest word", latestWord);
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
    const style = {
        display: "flex",
        gap: ".3rem",
        flexFlow: "row wrap",
    };

    // Build the word JSX once
    const wordSpans = item.words.map((word, i) => (
        <WordSpan
            key={i}
            word={word}
            guessState={guessedWords[word] ?? "not guessed"}
            onClick={() => checkWord(word)}
        />
    ));

    // Build the advance button JSX once
    const advanceButton = (
        <button type="button" onClick={handleNext}>
            Next
        </button>
    );

    // Use VisibilityGate to handle slot visibility
    const slots = builder.showSlot("text", {
        front: wordSpans,
        back: wordSpans,
    });

    return (
        <article>
            <form>
                <fieldset style={style}>
                    <legend>
                        <h2>
                            Find {item.answer.length}{" "}
                            verb(s)
                        </h2>
                    </legend>
                    {slots.front}
                </fieldset>
                <PartOfSpeechMagicalGirl
                    correct={correct}
                    phrase={item.text}
                    word={latestWord}
                />
                {showBack && advanceButton}
            </form>
        </article>
    );
}
