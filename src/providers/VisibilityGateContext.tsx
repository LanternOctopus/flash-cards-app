import React, { createContext } from "react";
import { VisibilityGate } from "../activities/VisibilityGate";
import { useData } from "./DataProvider";
export const VisibilityGateContext =
    createContext<VisibilityGate | null>(null);

type VisibilityGateContextType = {
    builder: VisibilityGate;
};

export function VisibilityGateProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const data = useData();
    const builder = React.useMemo(() => {
        if (!data.loaded) return null;
        return new VisibilityGate(
            data.uiSelections,
            data.slots,
        );
    }, [data.config]);

    return (
        <VisibilityGateContext.Provider value={builder}>
            {children}
        </VisibilityGateContext.Provider>
    );
}

export function useVisibilityGate() {
    const ctx = React.useContext(VisibilityGateContext);
    if (!ctx) {
        throw new Error(
            "useVisibilityGate must be used inside VisibilityGateProvider",
        );
    }
    return ctx;
}
