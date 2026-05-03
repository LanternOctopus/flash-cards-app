import React from "react";

type QuestionContextType<T = unknown> = {
    question: T | null;
};
export const QuestionContext =
    React.createContext<QuestionContextType | null>(null);

export function QuestionProvider<T>({
    value,
    children,
}: {
    value: QuestionContextType<T>;
    children: React.ReactNode;
}) {
    return (
        <QuestionContext.Provider value={value}>
            {children}
        </QuestionContext.Provider>
    );
}

export function useQuestion<T>(): T {
    const ctx = React.useContext(QuestionContext);
    if (!ctx) {
        throw new Error("Question not ready");
    }
    // Return the whole context value
    return ctx as unknown as T;
}
