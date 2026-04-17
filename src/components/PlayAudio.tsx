import { useEffect } from "react";
import { useAudio } from "../providers/AudioProvider";
import { useQuestion } from "../providers/QuestionContext";
export const PlayAudio = () => {
    const { play, soundsAllowed } = useAudio();
    const question: any = useQuestion();
    useEffect(() => {
        if (soundsAllowed && question?.audio) {
            play(question.audio);
        }
    }, [question, soundsAllowed]);
    return <></>;
};
