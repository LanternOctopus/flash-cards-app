export const playSound = (fileName: string) => {
    const audio = new Audio(
        `${process.env.PUBLIC_URL}/audio/${fileName}`
    );
    audio.play();
};

// 1. Extend the global Window interface
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

// 2. Initialize the context safely
export const audioCtx = new (window.AudioContext ||
    window.webkitAudioContext)();

export function playSynthRibbit() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // "Type" determines the sound quality ('square' is very retro/game-like)
    oscillator.type = "sine";

    // Starting frequency (low) to ending frequency (high) for a "bloop"
    oscillator.frequency.setValueAtTime(
        150,
        audioCtx.currentTime
    );
    oscillator.frequency.exponentialRampToValueAtTime(
        400,
        audioCtx.currentTime + 0.1
    );

    // Volume envelope (fades out quickly)
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioCtx.currentTime + 0.2
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}
