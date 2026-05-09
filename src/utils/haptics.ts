type VibrationPattern = number | number[];

interface Haptics {
    vibrate: (pattern: VibrationPattern) => void;

    effects: {
        tap: () => void;
        success: () => void;
        milestone: () => void;
        error: () => void;
        purr: () => void;
        wrong: () => void;
        oops: () => void;
        fizzle: () => void;
        stop: () => void;
    };
}

const haptics: Haptics = {
    // The core engine
    vibrate: (pattern) => {
        if (
            typeof window !== "undefined" &&
            "vibrate" in navigator
        ) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                console.warn("Haptics failed:", e);
            }
        }
    },

    // Presets to simulate "Intensity"
    effects: {
        // A light "tap" for a button click
        tap: () => haptics.vibrate(10),

        // A quick double-pulse for a correct answer
        success: () => haptics.vibrate([50, 30, 50]),

        // A heavy, longer buzz for completing a whole lesson
        milestone: () => haptics.vibrate(200),

        // A "warning" stutter for an error
        error: () =>
            haptics.vibrate([100, 50, 100, 50, 100]),

        // A "purr" for the mascot being happy
        purr: () => haptics.vibrate([10, 100, 10, 100, 10]),
        // A heavy, disappointed double-thud
        wrong: () => haptics.vibrate([300, 50, 300]),

        // A light, quick "oops" stutter
        oops: () => haptics.vibrate([50, 50, 50, 50]),

        // The "Magic Fizzle"
        fizzle: () =>
            haptics.vibrate([200, 100, 50, 100, 25]),

        // Stop everything immediately
        stop: () => haptics.vibrate(0),
    },
};

export default haptics;
