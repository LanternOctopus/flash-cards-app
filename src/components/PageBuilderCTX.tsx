import React, { createContext } from "react";
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
    const data = useData();
    console.log(data);
    const builder = React.useMemo(() => {
        if (!data.loaded) return null;
        return new PageBuilder(
            data.storedConfig,
            data.slots
        );
    }, [data.config, data.storedConfig]);

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
