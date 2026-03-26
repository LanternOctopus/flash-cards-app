import React, { useState, useEffect } from "react";
import { FlashCardModel } from "./FlashCardModel";
import { useQuestion } from "./../QuestionContext";
import { useVisibilityGate } from "../../components/VisibilityGateContext";
import { useAnswer } from "./../AnswerProvider";
import { ParentScreen } from "../ParentScreen";
import { FlashCardItem } from "./FlashCardModel";
import { useLanguage } from "../languageswitcher/LanguageProvider";
export function FlashCardScreen() {
    const { locale } = useLanguage();
    return (
        <ParentScreen
            itemPath={`FlashCards_${locale}.yaml`}
            configPath="FlashCardsConfig.yaml"
            storageKey="flashCards"
            modelClass={FlashCardModel}
        >
            <FlashCardView />
        </ParentScreen>
    );
}

export function FlashCardView() {
    const item = { ...useQuestion<FlashCardItem>() };
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();

    const [showBack, setShowBack] = useState(false);
    const [selected, setSelected] = useState<string | null>(
        null,
    );
    const [numChoices, setNumChoices] = useState<number>(4);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        if (!item?.id) return;

        const wrongs = [...item.wrongAnswers];
        for (let i = wrongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]];
        }

        const shuffledChoices = [
            item.english,
            ...wrongs.slice(0, numChoices - 1),
        ].sort(() => Math.random() - 0.5);

        setOptions(shuffledChoices);
        setSelected(null);
        setShowBack(false);
    }, [
        item.id,
        item.english,
        item.wrongAnswers,
        numChoices,
    ]);

    if (!item) return <div>No question</div>;

    const question = builder.showSlot("question", {
        front: (
            <>
                <h2
                    id="question-label"
                    className="question"
                >
                    What is the correct English sentence for
                </h2>
                <h2>
                    <b>{item.question}</b>
                </h2>
                <h2>?</h2>
            </>
        ),
        back: (
            <>
                <h2
                    id="question-label"
                    className="question"
                >
                    The answer was for
                </h2>
                <h2>
                    <b>{item.question}</b>
                </h2>
            </>
        ),
    });

    const targetLang = builder.showSlot("targetLang", {
        front: (
            <h2 className="translation">
                {item.targetLang}
            </h2>
        ),
        back: (
            <h2 className="translation">
                {item.targetLang}
            </h2>
        ),
    });

    const english = builder.showSlot("english", {
        front: null,
        back: <h2 className="ans">{item.english}</h2>,
    });

    const phonetics = builder.showSlot("phonetics", {
        front: item.phonetics ? (
            <div className="transliteration">
                {item.phonetics}
            </div>
        ) : null,
        back: item.phonetics ? (
            <div>{item.phonetics}</div>
        ) : null,
    });

    const subject = builder.showSlot("subject", {
        front: (
            <div className="subject">
                {item.meta.subject}
            </div>
        ),
        back: <div>{item.meta.subject}</div>,
    });

    const tense = builder.showSlot("tense", {
        front: (
            <div className="tense">{item.meta.tense}</div>
        ),
        back: <div>{item.meta.tense}</div>,
    });

    const learningHint = builder.showSlot("learningHint", {
        front: null,
        back: (
            <p className="learning-hint">
                {item.learningHint}
            </p>
        ),
    });

    const handleSelect = (option: string) => {
        if (selected) return;

        setSelected(option);

        const result = checkCorrectness(option);
        setShowBack(true);

        return result;
    };

    return (
        <article>
            {!showBack && (
                <>
                    <section aria-labelledby="question-label">
                        {question.front}
                        {targetLang.front}
                        {phonetics.front}
                        {tense.front}
                        {subject.front}
                    </section>

                    <form>
                        <fieldset>
                            {options.map((option, i) => {
                                return (
                                    <button
                                        type="button"
                                        className="frog-button"
                                        key={`${item.id}-choice-${i}`}
                                        onClick={() =>
                                            handleSelect(
                                                option,
                                            )
                                        }
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </fieldset>
                    </form>

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
                </>
            )}

            {showBack && (
                <div>
                    {question.back}
                    {english.back}
                    {targetLang.back}
                    {phonetics.back}
                    {tense.back}
                    {subject.back}
                    {learningHint.back}

                    <div>
                        {selected === item.english
                            ? "Correct!"
                            : "Not quite."}
                    </div>

                    <button onClick={handleNext}>
                        Next
                    </button>
                </div>
            )}
        </article>
    );
}
