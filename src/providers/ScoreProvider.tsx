import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type Mood = "happy" | "sad";

type ScoreContextType = {
    score: number;
    total: number;
    progress: number;

    updateScore: (delta: number) => void;

    showMood: (mood: Mood) => void;

    mood: Mood | null;
    moodEventId: number;

    setTotal: (total: number) => void;
};

const ScoreContext = createContext<ScoreContextType | null>(
    null,
);

type Props = {
    children: React.ReactNode;
};

export function ScoreProvider({ children }: Props) {
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    const [mood, setMood] = useState<Mood | null>(null);
    const [moodEventId, setMoodEventId] = useState(0);

    const updateScore = useCallback(
        (delta: number) => {
            if (delta === 1) {
                showMood("happy");
            } else {
                showMood("sad");
            }
            setScore((prev) =>
                Math.max(0, Math.min(prev + delta, total)),
            );
        },
        [total],
    );

    const showMood = useCallback((nextMood: Mood) => {
        setMood(nextMood);
        setMoodEventId((id) => id + 1); // 🔥 forces re-trigger
    }, []);

    const progress = total === 0 ? 0 : score / total;

    const value = useMemo(
        () => ({
            score,
            total,
            progress,

            updateScore,
            setTotal,

            mood,
            moodEventId,
            showMood,
        }),
        [
            score,
            total,
            progress,
            updateScore,
            mood,
            moodEventId,
            showMood,
        ],
    );

    return (
        <ScoreContext.Provider value={value}>
            {children}
        </ScoreContext.Provider>
    );
}

export function useScore() {
    const context = useContext(ScoreContext);

    if (!context) {
        throw new Error(
            "useScore must be used inside ScoreProvider",
        );
    }

    return context;
}
