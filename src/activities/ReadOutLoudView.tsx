import { useRef, useEffect, useState } from "react";
import { ReadOutLoudModel } from "./ReadOutLoudModel";
import { usePageBuilder } from "../components/PageBuilderCTX";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import { SpeechRecognitionController } from "../controllers/SpeechRecognition";
import "./ReadOutLoud.css";
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
    id: string;
    chunks: string[];
};

type ReadOutLoudAnswer = {
    checkCorrectness: (
        input: unknown,
        target: unknown,
        setSpokenPhones: any
    ) => {
        correct: boolean;
        done?: boolean;
    };
    handleNext: () => void;
};

export function ReadOutLoud() {
    const builder = usePageBuilder();
    const controllerRef = useRef<any>(null);
    const itemRef = useRef<ReadOutLoudItem>(null);
    const [listening, setListening] = useState(false);
    const { checkCorrectness, handleNext } =
        useAnswer<ReadOutLoudAnswer>();
    const [spokenPhones, setSpokenPhones] =
        useState<any>(null);
    const item = useQuestion<ReadOutLoudItem>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const [lastErrorIndex, setLastErrorIndex] =
        useState(-1);
    const errorTimeoutRef = useRef<any>(null);
    const advanceIndex = () => {
        if (
            itemRef.current &&
            currentIndexRef.current <
                itemRef.current.chunks.length - 1
        ) {
            currentIndexRef.current += 1;
            setCurrentIndex(currentIndexRef.current);
        } else {
            if (handleNext) handleNext();
        }
    };

    useEffect(() => {
        const callbacks = {
            onResultCapture: (text: string) => {
                if (!itemRef.current) return;
                const isCorrect = checkCorrectness(
                    text,
                    itemRef.current.text,
                    setSpokenPhones
                ).correct;
                if (!isCorrect) {
                    setLastErrorIndex(
                        currentIndexRef.current
                    );
                    if (errorTimeoutRef.current)
                        clearTimeout(
                            errorTimeoutRef.current
                        );
                    errorTimeoutRef.current = setTimeout(
                        () => setLastErrorIndex(-1),
                        300
                    );
                }
                advanceIndex();
            },
            onError: (type: any) =>
                console.log("Error:", type),
        };
        controllerRef.current =
            new SpeechRecognitionController(callbacks);

        return () => {
            controllerRef.current?.cleanup();
            controllerRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!controllerRef.current) return;
        itemRef.current = item;
        setCurrentIndex(0);
        setLastErrorIndex(-1);
        setSpokenPhones(null);
        currentIndexRef.current = 0;
        errorTimeoutRef.current = null;

        controllerRef.current.stop();
        controllerRef.current.start();
    }, [item.id]);

    builder.fillSlot(
        "text",
        item.chunks.map((chunk: string, i: number) => (
            <span
                key={i}
                data-state={
                    i === lastErrorIndex
                        ? "error"
                        : i < currentIndex
                        ? "done"
                        : i === currentIndex
                        ? "active"
                        : "future"
                }
            >
                {chunk + " "}
            </span>
        ))
    );

    const front = builder.buildFront();
    const handleListeningToggle = () => {
        if (listening) {
            console.log("stopping");
            controllerRef.current.stop();
            setListening(false);
        } else {
            console.log("starting");
            controllerRef.current.start();
            setListening(true);
        }
    };
    return (
        <>
            <div>
                <button onClick={handleListeningToggle}>
                    {listening ? "Stop" : "Start"}
                </button>
                {front}
            </div>
            <div>{spokenPhones}</div>
        </>
    );
}
