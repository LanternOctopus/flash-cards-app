import React, { useEffect, useState, useRef } from "react";
import { PictureMatchingGameModel } from "../activities/Models";
import {
    PageBuilderProvider,
    usePageBuilder,
} from "../components/PageBuilderCTX";
import { ToggleBoxController } from "../components/ToggleBox";
import { DataProvider, useData } from "./DataProvider";
import {
    AnswerProvider,
    useAnswer,
} from "./AnswerProvider";
import {
    QuestionProvider,
    useQuestion,
} from "./QuestionContext";
export function ParentScreen() {
    console.log("ParentScreen render");
    return (
        <DataProvider
            questionPath="PictureMatchingGame.yaml"
            configPath="PictureMatchingGameConfig.yaml"
            storageKey="pictureMatchingGame"
        >
            <PageBuilderProvider>
                <ToggleBoxController />
                <SequenceController
                    modelClass={PictureMatchingGameModel}
                >
                    <PictureMatch />
                </SequenceController>
            </PageBuilderProvider>
        </DataProvider>
    );
}

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
    const [question, setQuestion] =
        //TODO: Fix any
        useState<any | null>(null);
    const generatorRef = useRef<Generator<any> | null>(
        null
    );
    const [showBack, setShowBack] = useState(false);
    const data = useData();
    useEffect(() => {
        if (!data?.questions) return;
        console.log("SequenceController useEffect", data);
        const model = new modelClass(data.questions);
        generatorRef.current = model.getGenerator();
        //@ts-expect-error
        const first = generatorRef.current.next();
        if (!first.done) {
            console.log("Setting first question", first);
            setCurrent(first.value);
        }
    }, [data?.questions]);

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
        return <div>No more questions</div>;
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
type PictureItem = {
    picture: string;
    question: string;
    answer: string;
    translation?: string;
    transliteration?: string;
    ansOptions: Record<string, string[]>;
    meta?: Record<
        string,
        { value: any; canToggle?: boolean }
    >;
};
export function PictureMatch() {
    const builder = usePageBuilder();
    const {
        answer,
        checkCorrectness,
        onComplete,
        handleNext,
        showBack,
    } = useAnswer();
    const item = { ...useQuestion<PictureItem>() };
    console.log(
        "PictureMatch render useQuestion",
        useQuestion<PictureItem>()
    );
    if (!item) return <div>No question</div>;

    console.log("PictureMatch render Item", item);
    console.log("type of item:", typeof item);
    const slots = builder.getSlots();
    slots.picture = <img src={item.picture} />;
    slots.translation = <div>{item.translation}</div>;
    slots.transliteration = (
        <div>{item.transliteration}</div>
    );
    slots.advance = (
        <button onClick={handleNext}>Next</button>
    );
    const front = builder.buildFront();
    const back = builder.buildBack();
    console.log(
        "from PictureMatch, ansOptions:",
        item.ansOptions
    );
    const choices = builder.buildChoices(
        item.ansOptions,
        (value, i) => (
            <>
                <button
                    onClick={() => {
                        if (!checkCorrectness) return;
                        const correct = checkCorrectness(
                            value[0]
                        );
                        onComplete(correct);
                    }}
                >
                    {value.map((v, idx) => (
                        <span key={idx}>{v}</span>
                    ))}
                </button>
            </>
        ),
        (children) => {
            return <div>{children}</div>;
        }
    );
    return (
        <>
            {!showBack && <div>{front}</div>}
            {showBack && <div>{back}</div>}
        </>
    );
}
