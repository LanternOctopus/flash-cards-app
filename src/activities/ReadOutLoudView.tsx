import { ReadOutLoudModel } from "./ReadOutLoudModel";
import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
export function ReadOutLoudScreen() {
    return (
        <ParentScreen
            itemPath="ReadOutLoud.yaml"
            configPath="ReadOutLoudConfig.yaml"
            storageKey="readOutLoud"
            modelClass={ReadOutLoudModel}
        >
            <ReadOutLoud />
        </ParentScreen>
    );
}

type ReadOutLoudItem = {
    text: string;
    translation?: string;
    transliteration?: string;
    answer: string;
};
export function ReadOutLoud() {
    const builder = usePageBuilder();

    const item = { ...useQuestion<ReadOutLoudItem>() };
    const { handleNext } = useAnswer();
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
