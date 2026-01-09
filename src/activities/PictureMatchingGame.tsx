import { useState, useEffect } from "react";
import { PictureMatchingGameModel } from "./PictureMatchingGameModel";
import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
export function PictureMatchingGameScreen() {
    return (
        <ParentScreen
            itemPath="PictureMatchingGame.yaml"
            configPath="PictureMatchingGameConfig.yaml"
            storageKey="pictureMatchingGame"
            modelClass={PictureMatchingGameModel}
        >
            <PictureMatch />
        </ParentScreen>
    );
}

type PictureItem = {
    picture: string;
    question: string;
    answer: string;
    translation?: string;
    transliteration?: string;
    ansOptions: Record<string, string[]>;
    tense?: string;
    subject?: string;
    meta?: Record<
        string,
        { value: any; canToggle?: boolean }
    >;
    id: string;
};
export function PictureMatch() {
    const builder = usePageBuilder();
    const { answer, checkCorrectness, handleNext } =
        useAnswer();
    const [showBack, setShowBack] = useState(false);
    const [correct, setCorrect] = useState(false);
    const item = { ...useQuestion<PictureItem>() };
    useEffect(() => {
        setShowBack(false);
        setCorrect(false);
    }, [item.id]);
    if (!item) return <div>No question</div>;
    builder.fillSlot(
        "question",
        <div>{item.question}</div>
    );
    builder.fillSlot("answer", <div>{item.answer}</div>);
    builder.fillSlot("picture", <img src={item.picture} />);
    builder.fillSlot(
        "translation",
        <div>{item.translation}</div>
    );
    builder.fillSlot("tense", <div>{item.tense}</div>);
    builder.fillSlot("subject", <div>{item.subject}</div>);
    builder.fillSlot(
        "transliteration",
        <div>{item.transliteration}</div>
    );
    builder.fillSlot(
        "advance",
        <button onClick={handleNext}>Next</button>
    );
    builder.fillSlot(
        "feedback",
        correct ? "Correct" : "Incorrect"
    );
    const front = builder.buildFront();
    const back = builder.buildBack();
    const onComplete = (isCorrect: boolean) => {
        setShowBack(true);
        setCorrect(isCorrect);
        return;
    };
    const choices = builder.buildChoices(
        item.ansOptions,
        (value, i) => (
            <button
                key={`${item.id}-choice-${i}`}
                onClick={() => {
                    const result = checkCorrectness(
                        value[0]
                    );
                    onComplete(result.correct);
                }}
            >
                {value.map((v, idx) => (
                    <span key={`${i}-${idx}`}>{v}</span>
                ))}
            </button>
        ),
        (children) => <div>{children}</div>
    );
    return (
        <>
            {!showBack && (
                <>
                    <div>{front}</div>
                    <div>{choices}</div>
                </>
            )}
            {showBack && <div>{back}</div>}
        </>
    );
}
