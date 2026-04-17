import React, { useEffect, useState, useRef } from "react";
import { AnswerProvider } from "../providers/AnswerProvider";
import { QuestionProvider } from "../providers/QuestionContext";
import { useData } from "../providers/DataProvider";
export function SequenceController({
    modelClass,
    children,
}: {
    modelClass: new (
        raw: unknown,
        setScore: (score: number) => void,
    ) => any;
    children: React.ReactNode;
}) {
    const [current, setCurrent] = useState<any | null>(
        null,
    );
    const [score, setScore] = useState<number>(0);
    const data = useData();
    const modelRef = useRef<any>(null);
    useEffect(() => {
        if (!data?.items) return;
        modelRef.current = new modelClass(
            data.items,
            setScore,
        );
        modelRef.current.initializeGenerator();

        const first = modelRef.current.goNext();
        if (!first.done) {
            setCurrent(first.value);
        }
    }, [data?.items]);

    const handleNext = () => {
        const { value, done } = modelRef.current.goNext();
        if (done) return;
        setCurrent(value);
    };
    function submitAnswerAndSync(userAnswer: any) {
        const result =
            modelRef.current.submitAnswer(userAnswer);
        return result;
    }
    if (!current) {
        return <div>No more Items</div>;
    }
    return (
        <>
            <QuestionProvider value={current}>
                <AnswerProvider
                    answer={current.answer}
                    handleNext={handleNext}
                    checkCorrectness={submitAnswerAndSync}
                    getImageUrl={
                        modelRef.current.getImageUrl
                    }
                >
                    {children}
                </AnswerProvider>
            </QuestionProvider>
        </>
    );
}
