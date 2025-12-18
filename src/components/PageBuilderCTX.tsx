import React, { createContext, useMemo } from "react";
import { PageBuilder } from "../activities/PageBuilder";
import { useData } from "../activities/DataProvider";

export const PageBuilderContext =
    createContext<PageBuilder | null>(null);

type PageBuilderContextType = {
    builder: PageBuilder;
};

export function PageBuilderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const data = useData(); // 👈 DataContext

    const builder = React.useMemo(
        () =>
            new PageBuilder({
                config: data.config,
                storedConfig: data.storedConfig,
            }),
        [data.config, data.storedConfig]
    );

    return (
        <PageBuilderContext.Provider value={builder}>
            {children}
        </PageBuilderContext.Provider>
    );
}

export function usePageBuilder() {
    const ctx = React.useContext(PageBuilderContext);
    if (!ctx) {
        throw new Error(
            "usePageBuilder must be used inside PageBuilderProvider"
        );
    }
    return ctx;
}
