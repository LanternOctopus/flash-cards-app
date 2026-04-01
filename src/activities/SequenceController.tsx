import React, { useEffect, useState, useRef } from "react";
import { AnswerProvider } from "./AnswerProvider";
import { QuestionProvider } from "./QuestionContext";
import { useData } from "./DataProvider";
export function SequenceController({
    modelClass,
    children,
}: {
    modelClass: new (raw: unknown) => any;
    children: React.ReactNode;
}) {
    const [current, setCurrent] = useState<any | null>(
        null,
    );
    const data = useData();
    const modelRef = useRef<any>(null);
    useEffect(() => {
        if (!data?.items) return;
        modelRef.current = new modelClass(data.items);
        modelRef.current.initializeGenerator();
        console.log("data items", data.items);
        const first = modelRef.current.nextItem();
        if (!first.done) {
            setCurrent(first.value);
        }
    }, [data?.items]);

    const handleNext = () => {
        const { value, done } = modelRef.current.nextItem();
        if (done) return;
        setCurrent(value);
    };
    if (!current) {
        return <div>No more Items</div>;
    }
    return (
        <QuestionProvider value={current}>
            <AnswerProvider
                answer={current.answer}
                handleNext={handleNext}
                checkCorrectness={
                    modelRef.current.checkCorrectness
                }
                getImageUrl={modelRef.current.getImageUrl}
            >
                {children}
            </AnswerProvider>
        </QuestionProvider>
    );
}
