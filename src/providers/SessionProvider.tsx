// SessionProvider.js
import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import { session1Steps } from "../curriculum/sentencesession1";
import { ActivityModel } from "../activities/Models";
export type Step =
    | {
          type: "title";
          config: { text: string };
      }
    | {
          type: "story";
      }
    | {
          type: "activity";
          itemPath: string;
          path?: string;
          configPath: string;
          storageKey: string;
          modelClass: new (
              raw: unknown,
              scorechangeCallback: (score: number) => void,
          ) => ActivityModel<any>;
          children?: ReactNode;
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
    const steps = session1Steps satisfies Step[];
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
