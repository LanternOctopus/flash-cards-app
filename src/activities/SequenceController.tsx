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
        null
    );

    const generatorRef = useRef<Generator<any> | null>(
        null
    );
    const [showBack, setShowBack] = useState(false);
    const data = useData();
    useEffect(() => {
        if (!data?.items) return;
        console.log("SequenceController useEffect", data);
        const model = new modelClass(data.items);
        generatorRef.current = model.getGenerator();
        //@ts-expect-error
        const first = generatorRef.current.next();
        if (!first.done) {
            console.log("Setting first item", first);
            setCurrent(first.value);
        }
    }, [data?.items]);

    const handleComplete = (isCorrect: boolean) => {
        setShowBack(true);
    };
    const handleNext = () => {
        //@ts-expect-error
        const { value, done } = generatorRef.current.next();
        if (done) return;
        setCurrent(value);
        setShowBack(false); // reset for next card
    };
    if (!current) {
        console.log(current);
        return <div>No more Items</div>;
    }
    console.log("SequenceController render", current);
    return (
        <QuestionProvider value={current}>
            <AnswerProvider
                answer={current.answer}
                onComplete={handleComplete}
                handleNext={handleNext}
                showBack={showBack}
            >
                {children}
            </AnswerProvider>
        </QuestionProvider>
    );
}
