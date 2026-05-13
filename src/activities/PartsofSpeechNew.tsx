import React, { useEffect, useState } from "react";

import {
    PartsofSpeechModel,
    PartsofSpeechItemNew,
} from "./PartsofSpeechModel";
import { useVisibilityGate } from "../providers/VisibilityGateContext";
import { useData } from "../providers/DataProvider";
import { useAnswer } from "../providers/AnswerProvider";
import { useQuestion } from "../providers/QuestionContext";
import { ParentScreen } from "./ParentScreen";
import expandContractions from "../utils/expandContractions";
import {
    stripPunctuation,
    normalizeStr,
} from "../utils/utils";
import { PartOfSpeechMagicalGirl } from "../components/decorative/PartofSpeechMagicalGirl";
import { useSwipeable } from "react-swipeable";
import SwipeIndicator from "../utils/SwipeIndicator";
import haptics from "../utils/haptics";
import { useScore } from "../providers/ScoreProvider";
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

    const className =
        guessState === "not guessed"
            ? ""
            : guessState === "correct"
              ? "--correct"
              : "--incorrect";
    const displayWord =
        guessState === "not guessed"
            ? word
            : expandContractions(word);

    return (
        <button
            className={`word-token word-token${className}`}
            onClick={onClick}
            style={{ marginLeft }}
            type="button"
            aria-pressed={guessState !== "not guessed"}
            aria-invalid={
                guessState === "correct"
                    ? "false"
                    : guessState === "wrong"
                      ? "true"
                      : undefined
            }
        >
            {displayWord}
        </button>
    );
};

export function PartsOfSpeechNew() {
    const handlers = useSwipeable({
        onSwipedRight: () => {
            if (showBack && handleNext) handleNext();
        },
        delta: 50, // minimum swipe distance in px before it registers
        preventScrollOnSwipe: true,
    });
    const item = useQuestion<PartsofSpeechItemNew>();
    const data = useData<any>();
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();

    const [guessedWords, setGuessedWords] = useState<
        Record<string, string>
    >({});
    const [showBack, setShowBack] = useState(false);
    const [correct, setCorrect] = useState<boolean>();
    const [latestWord, setLatestWord] = useState<string>();
    const { updateScore, showMood } = useScore();
    useEffect(() => {
        if (!item?.text) return;

        const initialGuesses: Record<string, string> = {};

        item.words.forEach((w) => {
            initialGuesses[normalizeStr(w)] = "not guessed";
        });

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
        const word = normalizeStr(rawWord);

        if (guessedWords[word] !== "not guessed") return;

        setLatestWord(word);

        const expanded = expandContractions(rawWord)
            .split(" ")
            .map(normalizeStr);

        const result = checkCorrectness(word.toLowerCase());

        if (result.correct) {
            haptics.effects.success();
            updateScore(1);
        } else {
            haptics.effects.wrong();
            updateScore(-1);
        }

        setGuessedWords((prev) => {
            const updated: Record<string, string> = {
                ...prev,
            };

            updated[word] = result.correct
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

        if (result.done) {
            onComplete(result.correct);
        }
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
        <article {...handlers}>
            <form>
                <fieldset style={style}>
                    <legend>
                        <h2>
                            {(() => {
                                const keys = Object.keys(
                                    data.items ?? {},
                                );
                                const label =
                                    keys.length > 0
                                        ? keys[0]
                                        : "word"; // Fallback to "word" or ""

                                return (
                                    <>
                                        Find{" "}
                                        {item.answer.length}{" "}
                                        {item.answer
                                            .length === 1
                                            ? label
                                            : `${label}s`}
                                    </>
                                );
                            })()}
                        </h2>
                    </legend>
                    {slots.front}
                </fieldset>
                <PartOfSpeechMagicalGirl
                    partOfSpeech={
                        latestWord
                            ? item.tokens[
                                  stripPunctuation(
                                      latestWord.toLowerCase(),
                                  )
                              ]?.partOfSpeech
                            : undefined
                    }
                />
                {showBack && <SwipeIndicator />}
                {showBack && advanceButton}
            </form>
        </article>
    );
}
