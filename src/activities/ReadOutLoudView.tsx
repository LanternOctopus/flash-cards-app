import { useRef, useEffect, useState } from "react";
import { ReadOutLoudModel } from "./ReadOutLoudModel";
import { useVisibilityGate } from "../components/VisibilityGateContext";
import { useAnswer } from "../providers/AnswerProvider";
import { useQuestion } from "../providers/QuestionContext";
import { ParentScreen } from "./ParentScreen";
import { SpeechRecognitionController } from "../controllers/SpeechRecognition";
import { PartialTranslation } from "./PartialTranslation";
import { WakeLockManager } from "../utils/wakeLock";
import { TapToStart } from "../utils/TapToStart";
import "./ReadOutLoud.css";
export function ReadOutLoudScreen() {
    return (
        <ParentScreen
            itemPath="whatmybodycando.yaml"
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
    picture?: string;
    caption?: string;
    alt?: string;
};

type ReadOutLoudAnswer = {
    checkCorrectness: (input: [string, string]) => {
        correct: boolean;
        done?: boolean;
    };
    getImageUrl: (image: string) => string;
    handleNext: () => void;
};

export function ReadOutLoud() {
    const builder = useVisibilityGate();
    const controllerRef = useRef<any>(null);
    const itemRef = useRef<ReadOutLoudItem>(null);
    const [listening, setListening] = useState(false);
    const { checkCorrectness, handleNext, getImageUrl } =
        useAnswer<ReadOutLoudAnswer>();
    const [spokenPhones, setSpokenPhones] =
        useState<any>(null);
    const item = useQuestion<ReadOutLoudItem>();
    console.log(item);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const [lastErrorIndex, setLastErrorIndex] =
        useState(-1);
    const errorTimeoutRef = useRef<any>(null);
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [alt, setAlt] = useState("");
    const wakeLockManager = useRef<WakeLockManager>(
        new WakeLockManager(),
    );
    const stallTimeoutRef = useRef<number | null>(null);
    const stallTokenRef = useRef(0);
    const clearStallTimer = () => {
        if (stallTimeoutRef.current != null) {
            clearTimeout(stallTimeoutRef.current);
            stallTimeoutRef.current = null;
        }
    };

    const startStallTimer = (ms = 10_000) => {
        clearStallTimer();
        const token = ++stallTokenRef.current;

        stallTimeoutRef.current = window.setTimeout(() => {
            if (token !== stallTokenRef.current) return;
            advanceIndex();
        }, ms);
    };
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
        wakeLockManager.current.initVisibilityHandler();
        wakeLockManager.current.request();
        const callbacks = {
            onResultCapture: (text: string) => {
                console.log("resultCapture", text);
                if (!itemRef.current) return;
                const isCorrect = checkCorrectness([
                    text,
                    itemRef.current.chunks[
                        currentIndexRef.current
                    ],
                ]).correct;
                if (!isCorrect) {
                    setLastErrorIndex(
                        currentIndexRef.current,
                    );
                    if (errorTimeoutRef.current)
                        clearTimeout(
                            errorTimeoutRef.current,
                        );
                    errorTimeoutRef.current = setTimeout(
                        () => setLastErrorIndex(-1),
                        300,
                    );
                    return;
                }
                advanceIndex();
            },
            onError: (type: any) =>
                console.log("Error:", type),
        };
        controllerRef.current =
            new SpeechRecognitionController(callbacks);

        return () => {
            clearStallTimer();
            controllerRef.current?.cleanup();
            wakeLockManager.current.release();
            controllerRef.current = null;
        };
    }, []);
    useEffect(() => {
        if (!itemRef.current) return;

        startStallTimer(10_000);

        return () => {
            clearStallTimer();
        };
    }, [currentIndex, item?.id]);
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

        if (item?.picture) setImage(item.picture);
        if (item?.caption) setCaption(item.caption);
        if (item?.alt) setAlt(item.alt);
    }, [item?.id]);

    const textChunkJSX = item.chunks.map(
        (chunk: string, i: number) => (
            <span
                style={{
                    display: "block",
                }}
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
                <PartialTranslation>
                    {chunk + " "}
                </PartialTranslation>
            </span>
        ),
    );

    // Use showSlot to handle visibility for front/back
    const textSlots = builder.showSlot("text", {
        front: textChunkJSX,
        back: textChunkJSX,
    });
    const imageSlot = builder.showSlot("picture", {
        front: (
            <figure className="image-wrapper">
                <img
                    style={{
                        border: "oldlace 5px solid",
                        borderRadius: "40px",
                        height: "100%",
                    }}
                    src={getImageUrl(image)}
                    alt={alt}
                />
                {
                    builder.showSlot("caption", {
                        front: (
                            <figcaption>
                                {item.caption}
                            </figcaption>
                        ),
                        back: (
                            <figcaption>
                                {item.caption}
                            </figcaption>
                        ),
                    }).front
                }
            </figure>
        ),
        back: <></>,
    });

    return (
        <>
            <TapToStart />
            <article className="reading-container">
                <div className="story-text">
                    {textSlots.front}
                </div>
                <footer
                    style={{
                        padding: 0,
                    }}
                >
                    {spokenPhones}
                    {imageSlot.front}
                </footer>
            </article>
        </>
    );
}
