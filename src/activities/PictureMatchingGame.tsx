import { PictureMatchingGameModel } from "./PictureMatchingGameModel";
import {
    PageBuilderProvider,
    usePageBuilder,
} from "../components/PageBuilderCTX";
import { ToggleBoxController } from "../components/ToggleBox";
import { DataProvider } from "./DataProvider";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { SequenceController } from "./SequenceController";
export function PictureMatchingGameScreen() {
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
};
export function PictureMatch() {
    console.log("PictureMatch render");
    const builder = usePageBuilder();
    const {
        answer,
        checkCorrectness,
        onComplete,
        handleNext,
        showBack,
    } = useAnswer();
    const item = { ...useQuestion<PictureItem>() };
    if (!item) return <div>No question</div>;

    const slots = builder.slots;
    console.log("PictureMatch render", item);
    slots.question = <div>{item.question}</div>;
    slots.answer = <div>{item.answer}</div>;
    slots.picture = <img src={item.picture} />;
    slots.translation = <div>{item.translation}</div>;
    slots.tense = <div>{item.tense}</div>;
    slots.subject = <div>{item.subject}</div>;
    slots.transliteration = (
        <div>{item.transliteration}</div>
    );
    slots.advance = (
        <button onClick={handleNext}>Next</button>
    );
    const front = builder.buildFront();
    const back = builder.buildBack();
    const choices = builder.buildChoices(
        item.ansOptions,
        (value, i) => (
            <button
                key={i}
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
