import React, { useState, useEffect, useRef } from "react";
import { ScramblerItem } from "../types";
import { useSearchParams } from "react-router-dom";
import { TTS } from "../utils/TTS";
function isNumberString(str: string | null) {
    if (str === null) return false;
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}
interface Props {
    data: ScramblerItem;
    updateSuccess: (success: boolean | null) => void;
}
const ScramblerView = ({ data, updateSuccess }: Props) => {
    const [challengeSentence, setChallengeSentence] =
        useState<string[]>([]);
    const [missingWords, setMissingWords] = useState<
        [string, number][]
    >([]);
    const [selectedWord, setSelectedWord] = useState<
        string | null
    >(null);
    const [selectedSlot, setSelectedSlot] = useState<
        number | null
    >(null);
    const speakOutLoud = useRef<TTS | null>(null);
    const [searchParams] = useSearchParams();
    const [numToRemove] = useState(
        isNumberString(searchParams.get("remove"))
            ? Number(searchParams.get("remove"))
            : 2,
    );
    useEffect(() => {
        speakOutLoud.current = new TTS(
            "Microsoft Heera - English (India)",
        );
    }, []);

    useEffect(() => {
        const correctSentence = data.sentence.split(" ");
        const indexed = correctSentence.map(
            (w, i) => [w, i] as [string, number],
        );

        const removed = [...indexed]
            .sort(() => Math.random() - 0.5)
            .slice(-numToRemove);

        setMissingWords(removed);

        const removedIndexes = removed.map(
            ([, idx]) => idx,
        );

        const challenge = correctSentence.map((word, i) =>
            removedIndexes.includes(i) ? "replaceme" : word,
        );

        setChallengeSentence(challenge);
        setSelectedWord(null);
        setSelectedSlot(null);
        updateSuccess(null);
    }, [data, numToRemove, updateSuccess]);

    const tryPlace = (word: string, slotIndex: number) => {
        const next = [...challengeSentence];
        next[slotIndex] = word;

        setChallengeSentence(next);
        setMissingWords((prev) =>
            prev.filter(([w]) => w !== word),
        );
        setSelectedWord(null);
        setSelectedSlot(null);

        const attempt = next.join(" ");
        updateSuccess(attempt === data.sentence);
    };

    const handleWordClick = (word: string) => {
        speakOutLoud.current?.speak(word);

        if (selectedSlot !== null) {
            tryPlace(word, selectedSlot);
        } else {
            setSelectedWord(word);
        }
    };

    const handleSlotClick = (index: number) => {
        if (selectedWord) {
            tryPlace(selectedWord, index);
        } else {
            setSelectedSlot(index);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Scrambler</h1>

            <div style={{ marginBottom: 20 }}>
                {challengeSentence.map((word, i) =>
                    word === "replaceme" ? (
                        <button
                            key={i}
                            onClick={() =>
                                handleSlotClick(i)
                            }
                            style={{
                                display: "inline-block",
                                minWidth: 90,
                                padding: "6px 10px",
                                margin: 5,
                                border:
                                    selectedSlot === i
                                        ? "2px solid blue"
                                        : "2px dashed #bbb",
                                background:
                                    selectedSlot === i
                                        ? "#e6edff"
                                        : "#fafafa",
                                borderRadius: 6,
                            }}
                        >
                            Tap here
                        </button>
                    ) : (
                        <span
                            key={i}
                            style={{
                                display: "inline-block",
                                padding: "6px 10px",
                                margin: 5,
                                background: "#eee",
                                borderRadius: 6,
                            }}
                        >
                            {word}
                        </span>
                    ),
                )}
            </div>

            <div>
                {missingWords.map(([word, idx]) => (
                    <button
                        key={idx}
                        onClick={() =>
                            handleWordClick(word)
                        }
                        style={{
                            padding: "6px 12px",
                            margin: 6,
                            borderRadius: 8,
                            border:
                                selectedWord === word
                                    ? "2px solid blue"
                                    : "1px solid #ccc",
                            background:
                                selectedWord === word
                                    ? "#d6e0ff"
                                    : "#fff",
                        }}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ScramblerView;
