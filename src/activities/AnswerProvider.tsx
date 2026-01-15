import React from "react";
type AnswerValue = string | string[] | boolean;

type BaseAnswerSchema = {
    checkCorrectness: (...args: any[]) => any;
    getImageUrl: (image: string) => string;
    handleNext?: () => void;
};

export const AnswerContext =
    React.createContext<AnswerContextType<any> | null>(
        null
    );

export type AnswerContextType<T extends BaseAnswerSchema> =
    T & {
        answer: AnswerValue;
    };

export function useAnswer<
    T extends BaseAnswerSchema
>(): AnswerContextType<T> {
    const ctx = React.useContext(AnswerContext);
    if (!ctx) {
        throw new Error(
            "useAnswer must be used inside AnswerProvider"
        );
    }
    return ctx;
}

type AnswerProviderProps = {
    answer: AnswerValue;
    checkCorrectness?: Function;
    getImageUrl?: Function;
    handleNext?: () => void;
    children: React.ReactNode;
};

export function AnswerProvider({
    answer,
    checkCorrectness,
    handleNext,
    getImageUrl,
    children,
}: AnswerProviderProps) {
    const defaultCheckCorrectness = (input: unknown) => {
        if (Array.isArray(answer)) {
            return {
                correct:
                    Array.isArray(input) &&
                    input.length === answer.length &&
                    input.every((v, i) => v === answer[i]),
            };
        }

        return { correct: input === answer };
    };
    const defaultGetImageUrl = (image: string) => {
        return `${process.env.PUBLIC_URL}/images/${image}`;
    };

    return (
        <AnswerContext.Provider
            value={{
                answer,
                checkCorrectness:
                    checkCorrectness ??
                    defaultCheckCorrectness,
                getImageUrl:
                    getImageUrl ?? defaultGetImageUrl,
                handleNext,
            }}
        >
            {children}
        </AnswerContext.Provider>
    );
}
