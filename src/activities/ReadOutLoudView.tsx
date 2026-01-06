import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
type ReadOutLoudItem = {
    text: string;
    translation?: string;
    transliteration?: string;
    answer: string;
};
export function ReadOutLoud() {
    const builder = usePageBuilder();

    const item = { ...useQuestion<ReadOutLoudItem>() };
    const {
        answer,
        checkCorrectness,
        onComplete,
        handleNext,
    } = useAnswer();
    const slots = builder.slots;
    slots.text = <div>{item.text}</div>;
    slots.advance = (
        <button onClick={handleNext}>Next</button>
    );
    const front = builder.buildFront();
    return (
        <>
            <div>{front}</div>
        </>
    );
}
