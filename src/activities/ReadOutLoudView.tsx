import { useRef, useEffect, useState } from "react";
import { ReadOutLoudModel } from "./ReadOutLoudModel";
import { useVisibilityGate } from "../components/VisibilityGateContext";
import { useAnswer } from "./AnswerProvider";
import { useQuestion } from "./QuestionContext";
import { ParentScreen } from "./ParentScreen";
import { SpeechRecognitionController } from "../controllers/SpeechRecognition";
import { PartialTranslation } from "./PartialTranslation";
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
    picture?: string;
    caption?: string;
    alt?: string;
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
                    itemRef.current.chunks[
                        currentIndexRef.current
                    ],
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
        if (item?.picture) setImage(item.picture);
        if (item?.caption) setCaption(item.caption);
        if (item?.alt) setAlt(item.alt);
    }, [item.id]);

    const textChunkJSX = item.chunks.map(
        (chunk: string, i: number) => (
            <p
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
            </p>
        )
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
                <figcaption className="visually-hidden">
                    {item.caption}
                </figcaption>
            </figure>
        ),
        back: <></>,
    });

    return (
        <>
            <article className="reading-container">
                <header>
                    <label
                        aria-checked={listening}
                        style={{ cursor: "pointer" }}
                        className="switch-container"
                    >
                        <input
                            role="switch"
                            type="checkbox"
                            checked={listening}
                            onChange={() => {
                                if (listening) {
                                    console.log("stopping");
                                    controllerRef.current.stop();
                                    setListening(false);
                                } else {
                                    console.log("starting");
                                    controllerRef.current.start();
                                    setListening(true);
                                }
                            }}
                        />
                        {listening
                            ? "Stop Listening"
                            : "Start Listening"}
                    </label>
                </header>
                <div className="story-text">
                    {textSlots.front}
                </div>
                <footer>{imageSlot.front}</footer>
            </article>
        </>
    );
}
