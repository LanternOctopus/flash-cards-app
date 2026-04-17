import { useState, useEffect } from "react";
import { useQuestion } from "../providers/QuestionContext";
import { useAnswer } from "../providers/AnswerProvider";

type GabbilamItem = {
    passage?: string;
    answer: string;
    id: string;
    wrongAnswers: string[];
    learningHint: string;
    question: string;
};

export function Gabbilam() {
    const TOTAL_QUESTIONS = 23;

    const {
        wrongAnswers,
        passage,
        answer,
        id,
        question,
        learningHint,
    } = useQuestion<GabbilamItem>();

    const { checkCorrectness, handleNext } = useAnswer();

    const [options, setOptions] = useState<string[]>([]);
    const [passageShow, setPassageShow] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const [selected, setSelected] = useState<string | null>(
        null,
    );
    const [locked, setLocked] = useState(false);

    const item = useQuestion<GabbilamItem>();

    useEffect(() => {
        if (!id) return;

        setOptions(
            [answer, ...wrongAnswers].sort(
                () => Math.random() - 0.5,
            ),
        );

        if (passage) setPassageShow(passage);

        setSelected(null);
        setLocked(false);
        setCurrentIndex((i) => i + 1);
    }, [id]);

    const onSelect = (option: string) => {
        if (locked) return;

        setSelected(option);
        setLocked(true);

        const isCorrect = checkCorrectness(option);

        // optional: auto-advance on correct (we disable this now per your request)
        // if (isCorrect) handleNext?.();
    };

    const isCorrectOption = (option: string) =>
        option === answer;
    const isWrongSelected = (option: string) =>
        locked && selected === option && option !== answer;

    const isCorrectRevealed = (option: string) =>
        locked && option === answer;

    return (
        <div className="container-fluid">
            {/* PASSAGE */}
            <div>
                <p className="dropcap fade-in">
                    {passageShow}
                </p>
            </div>

            {/* QUESTION */}
            <div className="fade-in gabbilam-question-section">
                <h4
                    style={{
                        padding: "0 0 0 1em",
                        marginBottom: "1em",
                    }}
                >
                    {question}
                </h4>

                {/* OPTIONS */}
                {options.map((option, i) => {
                    let className = "serious-button";

                    if (isCorrectRevealed(option)) {
                        className += " correct";
                    }

                    if (isWrongSelected(option)) {
                        className += " wrong";
                    }

                    return (
                        <button
                            key={`${item.id}-choice-${i}`}
                            type="button"
                            className={className}
                            onClick={() => onSelect(option)}
                            disabled={locked}
                        >
                            {option}
                        </button>
                    );
                })}

                <div className="progress">
                    {Array.from({
                        length: TOTAL_QUESTIONS,
                    }).map((_, i) => (
                        <div
                            key={i}
                            className={`progress-dot ${
                                i === currentIndex
                                    ? "active"
                                    : ""
                            }`}
                        />
                    ))}
                </div>

                {/* HINT */}
                <p className="learning-hint fade-in">
                    {learningHint}
                </p>
                <button
                    type="button"
                    className={`next-button ${locked ? "show-next" : ""}`}
                    onClick={() => {
                        handleNext?.();
                        setLocked(false);
                        setSelected(null);
                    }}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
