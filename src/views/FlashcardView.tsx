import React, { useEffect, useState } from "react";
import { FlashcardItem } from "../types";

function capitalizeFirstLetter(str: string) {
    return str
        ? str.charAt(0).toUpperCase() + str.slice(1)
        : "";
}

type FlashcardViewProps = {
    data: FlashcardItem;
    updateSuccess: (success: boolean) => void;
};

const FlashcardView: React.FC<FlashcardViewProps> = ({
    data,
    updateSuccess,
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(
        null,
    );
    const [isFlipped, setIsFlipped] = useState(false);
    const [numChoices, setNumChoices] = useState<number>(4);

    useEffect(() => {
        const wrongs = [...data.wrongAnswers];
        for (let i = wrongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]];
        }
        const choices = [
            data.english,
            ...wrongs.slice(0, numChoices - 1),
        ].sort(() => Math.random() - 0.5);
        setOptions(choices);
        setSelected(null);
        setIsFlipped(false);
    }, [data, numChoices]);

    const handleFlip = () => setIsFlipped((prev) => !prev);

    const handleSelect = (option: string) => {
        if (selected) return;
        setSelected(option);
        handleFlip();
        updateSuccess(option === data.english);
    };

    return (
        <article>
            <header>
                <h3>Find the correct translation!</h3>
            </header>
            <div className="container grid">
                <div className="card">
                    {!isFlipped ? (
                        <div className="card-body">
                            <h1>{data.malayalam}</h1>
                            <p>{data.transliteration}</p>
                        </div>
                    ) : (
                        <div className="card-body">
                            <h1>{data.english}</h1>
                            <h3>{data.malayalam}</h3>
                            <p>{data.transliteration}</p>
                            <p>Subject: {data.subject}</p>
                            <p>Tense: {data.tense}</p>
                        </div>
                    )}
                </div>

                <div className="grid gap-2">
                    {options.map((option) => (
                        <button
                            key={data.english + option}
                            onClick={() =>
                                handleSelect(option)
                            }
                            disabled={!!selected}
                            className={`btn ${selected ? (option === data.english ? "success" : "error") : ""}`}
                        >
                            {capitalizeFirstLetter(option)}
                        </button>
                    ))}
                </div>

                <div className="form-group">
                    <label htmlFor="numChoices">
                        Number of choices:
                    </label>
                    <select
                        id="numChoices"
                        value={numChoices}
                        onChange={(e) =>
                            setNumChoices(
                                Number(e.target.value),
                            )
                        }
                        className="form-control"
                    >
                        {[2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </article>
    );
};

export default FlashcardView;
