type AllowedVoices =
    | "Microsoft David - English (United States)"
    | "Microsoft Hazel - English (United Kingdom)"
    | "Microsoft Susan - English (United Kingdom)"
    | "Microsoft Heera - English (India)"
    | "Microsoft Ravi - English (India)"
    | "Microsoft George - English (United Kingdom)"
    | "Microsoft Mark - English (United States)"
    | "Microsoft Zira - English (United States)"
    | "Google US English"
    | "Google UK English Female"
    | "Google UK English Male";
export class TTS {
    private utterance: SpeechSynthesisUtterance | null =
        null;
    private originalPointerEvents: string = "";
    public speaking = false;
    constructor(
        private voice: AllowedVoices = "Google US English",
    ) {}

    speak(text: string) {
        if (!window.speechSynthesis) {
            console.warn("Speech synthesis not supported");
            return;
        }

        this.disableClicks();

        this.utterance = new SpeechSynthesisUtterance(text);
        this.utterance.voice =
            window.speechSynthesis
                .getVoices()
                .find((v) => v.name === this.voice) || null;
        this.utterance.onend = () => this.enableClicks();
        this.utterance.onerror = () => this.enableClicks();

        window.speechSynthesis.speak(this.utterance);
    }

    private disableClicks() {
        this.speaking = true;
        this.originalPointerEvents =
            document.body.style.pointerEvents;
        document.body.style.pointerEvents = "none";
    }

    private enableClicks() {
        this.speaking = false;
        document.body.style.pointerEvents =
            this.originalPointerEvents || "auto";
    }

    cancel() {
        if (this.utterance) {
            window.speechSynthesis.cancel();
            this.enableClicks();
        }
    }
}
