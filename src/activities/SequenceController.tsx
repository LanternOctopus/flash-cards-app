import React, { useEffect, useState, useRef } from "react";
import { AnswerProvider } from "../providers/AnswerProvider";
import { QuestionProvider } from "../providers/QuestionContext";
import { useData } from "../providers/DataProvider";
import { useSession } from "../providers/SessionProvider";
import {
    ScoreProvider,
    useScore,
} from "../providers/ScoreProvider";
import { ScoreBar } from "../components/score/ScoreBar";
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
    const { setTotal } = useScore();
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
        setTotal(
            (data.items as Record<string, any[]>)[
                Object.keys(data.items)[0]
            ].length,
        );
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
                <ScoreBar />
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
