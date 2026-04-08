// SessionProvider.js
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { ReadOutLoudModel } from "../activities/ReadOutLoudModel";
import { ReadOutLoud } from "../activities/ReadOutLoudView";
export type Step =
    | {
          type: "title";
          config: { text: string };
      }
    | {
          type: "story";
          config: { text: string };
      }
    | {
          type: "activity";
          itemPath: string;
          configPath: string;
          storageKey: string;
          modelClass: new (
              raw: unknown,
              scorechangeCallback: (score: number) => void,
          ) => any;
          children: ReactNode;
      };

export interface SessionContextType {
    currentStep: Step | undefined;
    next: () => void;
}

const SessionContext = createContext<
    SessionContextType | undefined
>(undefined);

export const useSession = (): SessionContextType => {
    const ctx = useContext(SessionContext);
    if (!ctx)
        throw new Error(
            "useSession must be used within a SessionProvider",
        );
    return ctx;
};

interface SessionProviderProps {
    children: ReactNode;
}

export const SessionProvider: React.FC<
    SessionProviderProps
> = ({ children }) => {
    const steps: Step[] = [
        {
            type: "activity",
            itemPath: "letter/learnthealphabet.yaml",
            configPath: "config/alphabet.yaml",
            storageKey: "alphabetMatching",
            modelClass: ReadOutLoudModel,
            children: <ReadOutLoud />,
        },
        {
            type: "story",
            config: {
                text: "Our hero starts the adventure...",
            },
        },
    ];

    const [stepIndex, setStepIndex] = useState(0);

    const next = () =>
        setStepIndex((i) => Math.min(i + 1, steps.length));

    const currentStep = steps[stepIndex];

    return (
        <SessionContext.Provider
            value={{ currentStep, next }}
        >
            {children}
        </SessionContext.Provider>
    );
};
