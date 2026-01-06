import { ReadOutLoudModel } from "./ReadOutLoudModel";
import {
    PageBuilderProvider,
    usePageBuilder,
} from "../components/PageBuilderCTX";
import { ToggleBoxController } from "../components/ToggleBox";
import { DataProvider } from "./DataProvider";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { SequenceController } from "./SequenceController";
export function ReadOutLoudScreen() {
    return (
        <DataProvider
            itemPath="ReadOutLoud.yaml"
            configPath="ReadOutLoudConfig.yaml"
            storageKey="readOutLoud"
        >
            <PageBuilderProvider>
                <ToggleBoxController />
                <SequenceController
                    modelClass={ReadOutLoudModel}
                >
                    <ReadOutLoud />
                </SequenceController>
            </PageBuilderProvider>
        </DataProvider>
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
