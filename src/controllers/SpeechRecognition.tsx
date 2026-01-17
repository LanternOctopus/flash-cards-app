interface Window {
    webkitSpeechRecognition: any;
    webkitSpeechGrammarList: any;
}

declare var webkitSpeechRecognition: any;

interface SpeechRecognitionEvent {
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
}

type ControllerState =
    | "idle"
    | "listening"
    | "stopped"
    | "errored";
interface SpeechRecognitionErrorEvent extends Event {
    error:
        | "no-speech"
        | "aborted"
        | "audio-capture"
        | "network"
        | "not-allowed"
        | "service-not-allowed"
        | "bad-grammar"
        | "language-not-supported";
    message?: string;
}
interface SpeechRecognitionControllerOptions {
    lang?: string;
    interimResults?: boolean;
    continuous?: boolean;
    autoRestart?: boolean;
}

interface ControllerCallbacks {
    onResultCapture: (text: string) => void;
    onError?: (type: string) => void;
}
interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;

    start(): void;
    stop(): void;
    abort(): void;

    onaudiostart:
        | ((this: SpeechRecognition, ev: Event) => any)
        | null;
    onaudioend:
        | ((this: SpeechRecognition, ev: Event) => any)
        | null;
    onend:
        | ((this: SpeechRecognition, ev: Event) => any)
        | null;
    onerror:
        | ((
              this: SpeechRecognition,
              ev: SpeechRecognitionErrorEvent
          ) => any)
        | null;
    onresult:
        | ((
              this: SpeechRecognition,
              ev: SpeechRecognitionEvent
          ) => any)
        | null;
}
declare var SpeechRecognition:
    | {
          prototype: SpeechRecognition;
          new (): SpeechRecognition;
      }
    | undefined;

export class SpeechRecognitionController {
    private recognitionRef: SpeechRecognition | null = null;
    private state: ControllerState = "idle";
    private shouldRestart: boolean = false;
    private options: SpeechRecognitionControllerOptions;
    private callbacks: ControllerCallbacks;

    private handleErrorBound: EventListener;
    private handleEndBound: () => void;
    private handleResultBound: EventListener;

    constructor(
        callbacks: ControllerCallbacks,
        options?: SpeechRecognitionControllerOptions
    ) {
        this.callbacks = callbacks;
        this.options = {
            lang: "en-US",
            interimResults: false,
            continuous: false,
            autoRestart: true,
            ...options,
        };

        // bind event handlers

        this.handleResultBound = (event: Event) => {
            this.handleResult(
                event as unknown as SpeechRecognitionEvent
            );
        };
        this.handleErrorBound = (event: Event) => {
            this.handleError(
                event as SpeechRecognitionErrorEvent
            );
        };
        this.handleEndBound = this.handleEnd.bind(this);

        this.setupRecognition();
    }

    private setupRecognition() {
        const SpeechRecognitionClass =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            this.state = "errored";
            this.callbacks.onError?.("unsupported-browser");
            return;
        }

        const recognition: SpeechRecognition =
            new SpeechRecognitionClass();
        recognition.lang = this.options.lang!;
        recognition.interimResults =
            this.options.interimResults!;
        recognition.continuous = this.options.continuous!;

        recognition.addEventListener(
            "result",
            this.handleResultBound
        );
        recognition.addEventListener(
            "error",
            this.handleErrorBound
        );
        recognition.addEventListener(
            "end",
            this.handleEndBound
        );

        this.recognitionRef = recognition;
        this.state = "idle";
    }

    private handleResult(event: SpeechRecognitionEvent) {
        if (!event.results || event.results.length === 0)
            return;

        const result = event.results[event.resultIndex];
        if (!result.isFinal) return; // only final results

        const transcript =
            result[event.resultIndex].transcript.trim();
        if (transcript) {
            this.callbacks.onResultCapture(transcript);
        }
    }

    private handleError(
        event: SpeechRecognitionErrorEvent
    ) {
        switch (event.error) {
            case "no-speech":
            case "aborted":
                // ignore expected
                return;

            case "not-allowed":
            case "audio-capture":
                this.state = "errored";
                this.shouldRestart = false;
                this.callbacks.onError?.(event.error);
                return;

            default:
                this.callbacks.onError?.(event.error);
                return;
        }
    }

    private handleEnd() {
        if (this.state !== "listening") return;

        if (
            this.shouldRestart &&
            this.options.autoRestart
        ) {
            this.recognitionRef?.start();
        } else {
            this.state = "stopped";
        }
    }

    start() {
        if (!this.recognitionRef) return;
        if (this.state === "listening") return;

        this.shouldRestart = true;
        try {
            this.recognitionRef.start();
            this.state = "listening";
        } catch (e) {
            this.state = "errored";
            this.callbacks.onError?.("start-failed");
        }
    }

    stop({ permanent = false } = {}) {
        if (!this.recognitionRef) return;

        this.shouldRestart = !permanent;
        if (this.state === "listening") {
            this.recognitionRef.stop();
        }
        if (permanent) {
            this.cleanup();
            this.state = "stopped";
        }
    }

    private cleanup() {
        if (!this.recognitionRef) return;
        this.recognitionRef.removeEventListener(
            "result",
            this.handleResultBound
        );
        this.recognitionRef.removeEventListener(
            "error",
            this.handleErrorBound
        );
        this.recognitionRef.removeEventListener(
            "end",
            this.handleEndBound
        );
        this.recognitionRef = null;
    }
}

type AdvanceReason = "timer" | "manual" | "auto" | "reset";

interface PhraseControllerCallbacks {
    onIndexChange: (currentIndex: number) => void;
    onAdvance: (reason: AdvanceReason) => void;
    onComplete?: () => void;
}

export class PhraseController {
    private words: string[] = [];
    private currentIndex: number = 0;
    private timerId: NodeJS.Timeout | null = null;
    private isComplete: boolean = false;

    // Callbacks
    private onIndexChange: (currentIndex: number) => void;
    private onAdvance: (reason: AdvanceReason) => void;
    private onComplete?: () => void;

    constructor(
        phrase: string,
        callbacks: PhraseControllerCallbacks
    ) {
        // Split phrase into words, handling multiple spaces
        this.words = phrase
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);

        // Validate we have words
        if (this.words.length === 0) {
            throw new Error(
                "Phrase must contain at least one word"
            );
        }

        // Store callbacks
        this.onIndexChange = callbacks.onIndexChange;
        this.onAdvance = callbacks.onAdvance;
        this.onComplete = callbacks.onComplete;

        // Initialize
        this.notifyIndexChange();
    }

    /**
     * Starts or restarts the auto-advance timer
     */
    public startTimer(): void {
        // Clear any existing timer
        this.clearTimer();

        // Don't start timer if we're at the end
        if (this.isAtLastWord() || this.isComplete) {
            return;
        }

        // Set new timer
        this.timerId = setTimeout(() => {
            this.advance("timer");
        }, 10000); // 10 seconds
    }

    /**
     * Clears the current timer
     */
    private clearTimer(): void {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    /**
     * Advances to the next word
     * @param reason Why we're advancing
     */
    public advance(reason: AdvanceReason = "manual"): void {
        // Check if we've reached the end
        if (this.isAtLastWord()) {
            this.markComplete();
            return;
        }

        // Increment index
        this.currentIndex++;

        // Notify listeners
        this.onIndexChange(this.currentIndex);
        this.onAdvance(reason);

        // Reset timer for next word
        this.startTimer();
    }

    /**
     * Goes back to the previous word
     */
    public goBack(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.onIndexChange(this.currentIndex);
            this.onAdvance("manual");
            this.startTimer(); // Reset timer for current word
        }
    }

    /**
     * Gets the current word
     */
    public getCurrentWord(): string {
        return this.words[this.currentIndex] || "";
    }

    /**
     * Gets all words
     */
    public getAllWords(): string[] {
        return [...this.words];
    }

    /**
     * Gets progress information
     */
    public getProgress(): {
        current: number;
        total: number;
        percentage: number;
    } {
        return {
            current: this.currentIndex + 1,
            total: this.words.length,
            percentage: Math.round(
                ((this.currentIndex + 1) /
                    this.words.length) *
                    100
            ),
        };
    }

    /**
     * Jumps to a specific word index
     */
    public jumpToIndex(index: number): void {
        if (index >= 0 && index < this.words.length) {
            this.currentIndex = index;
            this.notifyIndexChange();
            this.startTimer();
        }
    }

    /**
     * Resets to the first word
     */
    public reset(): void {
        this.currentIndex = 0;
        this.isComplete = false;
        this.notifyIndexChange();
        this.onAdvance("reset");
        this.startTimer();
    }

    /**
     * Stops the controller and clears the timer
     */
    public stop(): void {
        this.clearTimer();
    }

    /**
     * Destroys the controller and cleans up resources
     */
    public destroy(): void {
        this.clearTimer();
        // Optional: Nullify callbacks to prevent memory leaks
        this.onIndexChange = () => {};
        this.onAdvance = () => {};
    }

    /**
     * Checks if we're at the last word
     */
    private isAtLastWord(): boolean {
        return this.currentIndex >= this.words.length - 1;
    }

    /**
     * Marks the phrase as complete
     */
    private markComplete(): void {
        this.isComplete = true;
        this.clearTimer();
        this.onComplete?.();
    }

    /**
     * Helper to notify index change
     */
    private notifyIndexChange(): void {
        this.onIndexChange(this.currentIndex);
    }

    /**
     * Getter for current index (read-only)
     */
    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    /**
     * Check if controller is complete
     */
    public getIsComplete(): boolean {
        return this.isComplete;
    }
}

// function PhraseView({ words, currentIndex }) {
//   return <div>
//     words.map((word, i) =>
//       <span class={i === currentIndex ? "highlight" : ""}>{word}</span>
//     )
//   </div>
// }
