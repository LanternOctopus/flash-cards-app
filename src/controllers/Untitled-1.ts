

//Before commit
const recognitionRef = useRef(null);

// Setup
 const SpeechRecognitionClass =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert("Your browser does not support speech recognition.");
      return;
}
        const recognition: SpeechRecognition = new SpeechRecognitionClass();
  recognition.lang = "en-US";
  recognition.interimResults = true;
recognition.continuous = true;
// Listener Callback
    recognition.addEventListener("end", () => {
        // Automatically restart to capture the next word
        setTimeout(() => recognition.start(), 100);
    });
if (!event.results || event.results.length === 0) return;

        recognition.addEventListener("result", (event) => {
            const text = Array.from(event.results)
                //@ts-expect-error
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(text);
            setPhones(phonemize(text));
        });

const handleAudio=(event) => {
            const text = Array.from(event.results)
                //@ts-expect-error
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(text);
            setPhones(phonemize(text));
}
const handleEnd=(event) => {
 if (shouldRestart) {
    recognition.start();
  }
}
}
const handleError=(event) => {  
}
const stopListening = () => {
    recognitionRef.current?.stop({ permanent: true });
};
recognitionRef.current = recognition;
// storing the SpeechRecognition instance somewhere that:
// doesn’t trigger re-renders
// persists across renders
// can be used by event handlers later

recognitionRef.current?.start();
recognitionRef.current?.stop();
recognitionRef.current = null;
