import React from "react";

type AnswerValue = string | string[] | boolean;
type AnswerContextType = {
    answer: AnswerValue;
    checkCorrectness?: (input: unknown) => boolean;
    onComplete: (isCorrect: boolean) => void;
    handleNext?: () => void;
    showBack: boolean;
};

export const AnswerContext =
    React.createContext<AnswerContextType | null>(null);
type AnswerProviderProps = {
    answer: AnswerValue;
    checkCorrectness?: (input: unknown) => boolean;
    onComplete: (isCorrect: boolean) => void;
    handleNext?: () => void;
    showBack: boolean;
    children: React.ReactNode;
};

export function AnswerProvider({
    answer,
    checkCorrectness,
    onComplete,
    handleNext,
    showBack,
    children,
}: AnswerProviderProps) {
    const defaultCheckCorrectness = (input: unknown) => {
        if (Array.isArray(answer)) {
            return (
                Array.isArray(input) &&
                input.length === answer.length &&
                input.every((v, i) => v === answer[i])
            );
        }

        return input === answer;
    };

    return (
        <AnswerContext.Provider
            value={{
                answer,
                checkCorrectness:
                    checkCorrectness ??
                    defaultCheckCorrectness,
                onComplete,
                handleNext,
                showBack,
            }}
        >
            {children}
        </AnswerContext.Provider>
    );
}

export function useAnswer() {
    const ctx = React.useContext(AnswerContext);
    if (!ctx) {
        throw new Error(
            "useAnswer must be used inside AnswerProvider"
        );
    }
    return ctx;
}
