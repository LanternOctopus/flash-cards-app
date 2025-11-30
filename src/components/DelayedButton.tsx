import { useState, useEffect } from "react";

interface DelayedButtonProps {
    handleNext: () => void;
    children?: React.ReactNode;
    delaySeconds?: number; // optional, default 5 seconds
}

export default function DelayedButton({
    handleNext,
    children,
    delaySeconds = 3,
}: DelayedButtonProps) {
    const [countdown, setCountdown] =
        useState(delaySeconds);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (countdown <= 0) {
            setEnabled(true);
            return;
        }

        const timer = setTimeout(
            () => setCountdown(countdown - 1),
            1000
        );
        return () => clearTimeout(timer);
    }, [countdown]);

    return (
        <button
            className="feedback-next-btn"
            onClick={handleNext}
            disabled={!enabled}
            style={{
                backgroundColor: enabled
                    ? "#4CAF50"
                    : "#888",
                cursor: enabled ? "pointer" : "not-allowed",
            }}
        >
            {children} {enabled ? "" : `(${countdown})`}
        </button>
    );
}
