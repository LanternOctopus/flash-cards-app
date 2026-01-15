import { useState, useEffect } from "react";
import { PictureMatchingGameModel } from "./PictureMatchingGameModel";
import { useVisibilityGate } from "../components/VisibilityGateContext";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import { PartialTranslation } from "./PartialTranslation";
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
    const builder = useVisibilityGate();
    const {
        answer,
        checkCorrectness,
        handleNext,
        getImageUrl,
    } = useAnswer();
    const [showBack, setShowBack] = useState(false);
    const [correct, setCorrect] = useState(false);
    const item = { ...useQuestion<PictureItem>() };
    useEffect(() => {
        setShowBack(false);
        setCorrect(false);
    }, [item.id]);
    if (!item) return <div>No question</div>;

    const onComplete = (isCorrect: boolean) => {
        setShowBack(true);
        setCorrect(isCorrect);
        return;
    };
    const question = builder.showSlot("question", {
        front: <div className="">{item.question}</div>,
        back: <div className="">{item.question}</div>,
    });
    const answerView = builder.showSlot("answer", {
        front: <div className="">{item.answer}</div>,
        back: <div className="">{item.answer}</div>,
    });

    const picture = builder.showSlot("picture", {
        front: <img src={getImageUrl(item.picture)} />,
        back: <img src={getImageUrl(item.picture)} />,
    });
    const translation = builder.showSlot("translation", {
        front: <div className="">{item.translation}</div>,
        back: <div className="">{item.translation}</div>,
    });

    const tense = builder.showSlot("tense", {
        front: <div className="">{item.tense}</div>,
        back: <div className="">{item.tense}</div>,
    });

    const subject = builder.showSlot("subject", {
        front: <div className="">{item.subject}</div>,
        back: <div className="">{item.subject}</div>,
    });

    const transliteration = builder.showSlot(
        "transliteration",
        {
            front: (
                <div className="">
                    {item.transliteration}
                </div>
            ),
            back: (
                <div className="">
                    {item.transliteration}
                </div>
            ),
        }
    );
    const zippedChoices = builder.getZippedChoices(
        item.ansOptions
    );

    return (
        <>
            {!showBack && (
                <>
                    {question.front}
                    {answerView.front}
                    {translation.front}
                    {tense.front}
                    {subject.front}
                    {transliteration.front}
                    <div>
                        {zippedChoices.map(
                            (choiceArray, i) => (
                                <button
                                    key={`${item.id}-choice-${i}`}
                                    onClick={() => {
                                        const result =
                                            checkCorrectness(
                                                choiceArray[0]
                                            );
                                        onComplete(
                                            result.correct
                                        );
                                    }}
                                >
                                    {choiceArray.map(
                                        (v, idx) => {
                                            if (idx > 0) {
                                                return (
                                                    <small
                                                        key={`${i}-${idx}`}
                                                    >
                                                        {v}
                                                    </small>
                                                );
                                            }
                                            return (
                                                <PartialTranslation
                                                    key={`${i}-${idx}`}
                                                >
                                                    <p>
                                                        {v}
                                                    </p>
                                                </PartialTranslation>
                                            );
                                        }
                                    )}
                                </button>
                            )
                        )}
                    </div>
                    {picture.front}
                </>
            )}
            {showBack && (
                <div>
                    {question.back}
                    {answerView.back}
                    {picture.back}
                    {translation.back}
                    {tense.back}
                    {subject.back}
                    {transliteration.back}
                    <button onClick={handleNext}>
                        Next
                    </button>
                </div>
            )}
        </>
    );
}
