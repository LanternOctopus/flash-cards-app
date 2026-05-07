import React, { useEffect, useState, useRef } from "react";
import { AnswerProvider } from "../providers/AnswerProvider";
import { QuestionProvider } from "../providers/QuestionContext";
import { useData } from "../providers/DataProvider";
import { useSession } from "../providers/SessionProvider";
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
    const { next } = useSession();

    useEffect(() => {
        if (!data?.items) return;
        console.log("modle class:", modelClass);
        console.log("data items:", data.items);
        modelRef.current = new modelClass(
            data.items,
            setScore,
        );
        console.log(
            "Initialized model with items:",
            data.items,
        );
        modelRef.current.initializeGenerator();

        const first = modelRef.current.goNext();
        if (!first.done) {
            setCurrent(first.value);
        }
    }, [data?.items, modelClass]);

    const handleNext = () => {
        const { value, done } = modelRef.current.goNext();
        if (done) {
            next();
            return;
        }
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
    if (!data?.items || !modelRef.current || !current) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <h1>score: {score ?? "N/A"}</h1>
                <QuestionProvider value={current}>
                    <AnswerProvider
                        answer={current.answer}
                        handleNext={handleNext}
                        checkCorrectness={
                            submitAnswerAndSync
                        }
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
    return <div>Loading...</div>;
}
