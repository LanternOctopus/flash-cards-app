import { useState, useEffect } from "react";
import { PictureMatchingGameModel } from "./PictureMatchingGameModel";
import { useVisibilityGate } from "../components/VisibilityGateContext";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import { playSynthRibbit } from "../utils/audio";
import "./picturematchinggame.css";
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
        front: (
            <>
                <h2
                    id="question-label"
                    className="question"
                >
                    What is the word for{" "}
                </h2>
                <h2>
                    <b>{item.question}</b>
                </h2>
                <h2>in Malayalam?</h2>
            </>
        ),
        back: (
            <>
                <h2
                    id="question-label"
                    className="question"
                >
                    The answer was
                </h2>
                <h2>
                    <b>{item.question}!</b>
                </h2>
            </>
        ),
    });
    const answerView = builder.showSlot("answer", {
        front: (
            <h2 className="ans">
                What is the word for {item.answer} in
                Malayalam?
            </h2>
        ),
        back: (
            <h2 className="ans">
                The answer was {item.answer}!
            </h2>
        ),
    });

    const picture = builder.showSlot("picture", {
        front: (
            <div className="frog-frame">
                <div className="eye-pupils"></div>
                <img
                    style={{
                        width: "300px",
                        display: "block",
                        margin: "0 auto",
                    }}
                    alt="Flashcard image to identify"
                    src={getImageUrl(item.picture)}
                />
            </div>
        ),
        back: (
            <div className="frog-frame">
                <div className="eye-pupils"></div>
                <img
                    style={{
                        width: "300px",
                        display: "block",
                        margin: "0 auto",
                    }}
                    src={getImageUrl(item.picture)}
                />
            </div>
        ),
    });
    const translation = builder.showSlot("translation", {
        front: (
            <h2 className="translation">
                What is the word for {item.translation} in
                English?
            </h2>
        ),
        back: (
            <h2 className="translation">
                The answer was {item.translation}!
            </h2>
        ),
    });

    const tense = builder.showSlot("tense", {
        front: <div className="tense">{item.tense}</div>,
        back: <div className="">{item.tense}</div>,
    });

    const subject = builder.showSlot("subject", {
        front: (
            <div className="subject">{item.subject}</div>
        ),
        back: <div className="">{item.subject}</div>,
    });

    const transliteration = builder.showSlot(
        "transliteration",
        {
            front: (
                <div className="transliteration">
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
    const choices = builder.getZippedChoices(
        item.ansOptions
    );
    console.log("choices", choices);

    const renderSlot = (v: string, idx: number) => {
        switch (idx) {
            case 0:
                return (
                    <span className="choice-text mainText">
                        {v}
                    </span>
                );
            case 1:
                return (
                    <span className="choice-translation">
                        {v}
                    </span>
                );
            case 2:
                return (
                    <span className="choice-transliteration">
                        {v}
                    </span>
                );
            case 3:
                return (
                    <span className="choice-tense">
                        {v}
                    </span>
                );
            case 4:
                return (
                    <span className="choice-subject">
                        {v}
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <article>
                {!showBack && (
                    <>
                        <section aria-labelledby="question-label">
                            {question.front}
                            {answerView.front}
                            {translation.front}
                            {transliteration.front}
                            {tense.front}
                            {subject.front}
                            {picture.front}
                        </section>
                        <form>
                            <fieldset>
                                <div
                                    className="instruction-wrapper"
                                    style={{
                                        position:
                                            "relative",
                                        height: "320px",
                                        display: "flex",
                                        justifyContent:
                                            "flex-end",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        className="instruction-bubble"
                                        style={{
                                            position:
                                                "absolute",
                                            top: "0",
                                            bottom: "60px",
                                            fontSize:
                                                "2rem",
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            zIndex: "-1",
                                        }}
                                    >
                                        <legend>
                                            <b>
                                                Select the
                                                correct
                                                answer
                                            </b>
                                        </legend>
                                    </div>
                                    <div
                                        className="frog-mascot"
                                        style={{}}
                                    >
                                        <img
                                            style={{
                                                width: "260px",
                                                display:
                                                    "block",
                                                right: "-42px",
                                                position:
                                                    "relative",
                                            }}
                                            src={getImageUrl(
                                                "picturematchinggame/frog-neutral.png"
                                            )}
                                            alt="Supportive Frog Mascot"
                                        />
                                    </div>
                                </div>

                                {choices.shuffled.map(
                                    (ans, i) => (
                                        <button
                                            className="frog-button"
                                            key={`${item.id}-choice-${i}`}
                                            onClick={() => {
                                                playSynthRibbit();
                                                const result =
                                                    checkCorrectness(
                                                        ans
                                                    );
                                                onComplete(
                                                    result.correct
                                                );
                                            }}
                                        >
                                            {choices.zipped[
                                                ans
                                            ].map(
                                                (v, idx) =>
                                                    renderSlot(
                                                        v,
                                                        idx
                                                    )
                                            )}
                                        </button>
                                    )
                                )}
                            </fieldset>
                        </form>
                    </>
                )}
                {showBack && (
                    <div>
                        {question.back}
                        {answerView.back}
                        {translation.back}
                        {transliteration.back}
                        {tense.back}
                        {subject.back}
                        {picture.back}

                        <div
                            className="instruction-wrapper"
                            style={{
                                position: "relative",
                                height: "320px",
                                display: "flex",
                                justifyContent: "flex-end",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                className="instruction-bubble"
                                style={{
                                    position: "absolute",
                                    top: "0",
                                    bottom: "60px",
                                    fontSize: "2rem",
                                    display: "flex",
                                    alignItems: "center",
                                    zIndex: "-1",
                                }}
                            >
                                <p>
                                    <b>
                                        {correct
                                            ? "Yay you got it right!"
                                            : "Sorry, you got it wrong."}
                                    </b>
                                </p>
                            </div>
                            <div
                                className="frog-mascot"
                                style={{}}
                            >
                                <img
                                    style={{
                                        width: "260px",
                                        display: "block",
                                        right: "-42px",
                                        position:
                                            "relative",
                                    }}
                                    src={getImageUrl(
                                        `picturematchinggame/frog-${
                                            correct
                                                ? "happy"
                                                : "sad"
                                        }.png`
                                    )}
                                    alt={`${
                                        correct
                                            ? "Happy"
                                            : "Sad"
                                    } Frog Mascot`}
                                />
                            </div>
                        </div>

                        <button onClick={handleNext}>
                            Next
                        </button>
                    </div>
                )}
            </article>
        </>
    );
}
