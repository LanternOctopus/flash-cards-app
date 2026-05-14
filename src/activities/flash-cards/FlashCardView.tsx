import { useState, useEffect } from "react";
import { FlashCardModel } from "./FlashCardModel";
import { useQuestion } from "../../providers/QuestionContext";
import { useVisibilityGate } from "../../providers/VisibilityGateContext";
import { useAnswer } from "../../providers/AnswerProvider";
import { ParentScreen } from "../ParentScreen";
import { FlashCardItem } from "./FlashCardModel";
import { useLanguage } from "../languageswitcher/LanguageProvider";
import { useScore } from "../../providers/ScoreProvider";
import { useSwipeable } from "react-swipeable";
import SwipeIndicator from "../../utils/SwipeIndicator";
export function FlashCardScreen() {
    const { locale } = useLanguage();
    return (
        <ParentScreen
            itemPath={`verbs/tenses/flashcards_${locale}.yaml`}
            configPath="config/flashcardsconfig.yaml"
            modelClass={FlashCardModel}
            storageKey="flashCards"
        >
            <FlashCardView />
        </ParentScreen>
    );
}

export function FlashCardView() {
    const handlers = useSwipeable({
        onSwipedRight: () => {
            if (showBack && handleNext) handleNext();
        },
        delta: 50, // minimum swipe distance in px before it registers
        preventScrollOnSwipe: true,
    });
    const item = { ...useQuestion<FlashCardItem>() };
    const builder = useVisibilityGate();
    const { checkCorrectness, handleNext } = useAnswer();

    const [showBack, setShowBack] = useState(false);
    const [selected, setSelected] = useState<string | null>(
        null,
    );
    const [numChoices, setNumChoices] = useState<number>(4);
    const [options, setOptions] = useState<string[]>([]);
    const { updateScore } = useScore();

    useEffect(() => {
        if (!item?.id) return;

        const wrongs = [...item.distractors.en];
        for (let i = wrongs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]];
        }

        const shuffledChoices = [
            item.answer,
            ...wrongs.slice(0, numChoices - 1),
        ].sort(() => Math.random() - 0.5);

        setOptions(shuffledChoices);
        setSelected(null);
        setShowBack(false);
    }, [
        item.id,
        item.prompt_en,
        item.distractors.en,
        numChoices,
    ]);

    if (!item) return <div>No question</div>;

    const targetLang = builder.showSlot(
        "prompt_targetLang",
        {
            front: (
                <>
                    <h2 className="translation">
                        {item.prompt_targetLang}
                    </h2>
                </>
            ),
            back: (
                <h2 className="translation">
                    {item.prompt_targetLang}
                </h2>
            ),
        },
    );

    const english = builder.showSlot("prompt_en", {
        front: <h2 className="ans">{item.prompt_en}</h2>,
        back: <h2 className="ans">{item.prompt_en}</h2>,
    });

    const phonetics = builder.showSlot("prompt_phonetics", {
        front: item.prompt_phonetics ? (
            <h4 className="transliteration">
                {item.prompt_phonetics}
            </h4>
        ) : null,
        back: item.prompt_phonetics ? (
            <h4>{item.prompt_phonetics}</h4>
        ) : null,
    });
    const answer = builder.showSlot("answer", {
        front: <></>,
        back: (
            <>
                <h2>{item.answer}</h2>
            </>
        ),
    });
    const answerPhonetics = builder.showSlot(
        "answer_phonetics",
        {
            front: <></>,
            back: item.answer_phonetics ? (
                <h4 className="transliteration">
                    {item.answer_phonetics}
                </h4>
            ) : null,
        },
    );
    const answerTargetLang = builder.showSlot(
        "answer_targetLang",
        {
            front: <></>,
            back: item.answer_targetLang ? (
                <h4>{item.answer_targetLang}</h4>
            ) : null,
        },
    );

    const handleSelect = (option: string) => {
        if (selected) return;

        setSelected(option);

        const result = checkCorrectness(option);
        console.log("Selected:", option, "Result:", result);
        if (result.correct) {
            updateScore(1);
        } else {
            updateScore(-1);
        }
        setShowBack(true);

        return result;
    };

    return (
        <article {...handlers}>
            {!showBack && (
                <>
                    <section aria-labelledby="question-label">
                        {targetLang.front}
                        {phonetics.front}
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
            {showBack && <SwipeIndicator />}
            {showBack && (
                <>
                    {answerTargetLang.back}
                    {answerPhonetics.back}
                    <form>
                        <fieldset>
                            {options.map((option, i) => {
                                return (
                                    <button
                                        type="button"
                                        className={`answer-button answer-button--${option === item.answer ? "correct" : "incorrect"}`}
                                        key={`${item.id}-choice-${i}`}
                                        onClick={(e) =>
                                            e.preventDefault()
                                        }
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </fieldset>
                    </form>
                    <button onClick={handleNext}>
                        Next
                    </button>
                </>
            )}
        </article>
    );
}
