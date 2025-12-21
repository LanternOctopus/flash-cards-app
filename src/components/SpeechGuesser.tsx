import React, { useState, useEffect, useRef } from "react";
import { phonemize } from "phonemize";
const SpeechGuesser = () => {
    const [transcript, setTranscript] = useState("");
    const [phones, setPhones] = useState<any>(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognitionClass =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            alert(
                "Your browser does not support speech recognition."
            );
            return;
        }

        const recognition = new SpeechRecognitionClass();
        recognition.lang = "en-US";
        recognition.interimResults = true;
        recognition.continuous = true;
        //@ts-expect-error
        recognition.addEventListener("result", (event) => {
            const text = Array.from(event.results)
                //@ts-expect-error
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(text);
            setPhones(phonemize(text));
        });

        recognition.addEventListener("end", () => {
            console.log("Speech recognition stopped");
        });

        recognitionRef.current = recognition;
    }, []);

    const startListening = () => {
        // @ts-expect-error
        recognitionRef.current?.start();
        setTranscript(""); // reset each time
    };

    return (
        <div>
            <button onClick={startListening}>
                Start Listening
            </button>
            <p>The cat is on the mat</p>
            <p>{phonemize("The cat is on the mat")}</p>
            <p>
                {transcript + phones || "Say something..."}
            </p>
        </div>
    );
};

export default SpeechGuesser;
