import React, { JSX } from "react";
import { loadSource } from "../utils/loadFile";
type DataContextType<TConfig, TItems> = {
    config: TConfig | null;
    items: TItems | null;
    updateConfig: (patch: Partial<TConfig>) => void;
    loaded: boolean;
    uiSelections: Record<string, object>;
    slots: Record<string, any>;
};

export const DataContext =
    React.createContext<DataContextType<any, any> | null>(
        null,
    );
export function DataProvider<TConfig, TItems>({
    configPath,
    itemPath,
    storageKey,
    children,
}: {
    configPath: string;
    itemPath: string;
    storageKey: string;
    children: React.ReactNode;
}) {
    const [config, setConfig] =
        React.useState<TConfig | null>(null);
    const [items, setItems] = React.useState<TItems | null>(
        null,
    );
    const wrapSetItems = (items: TItems) => {
        console.log("wrapSetItems", items);
        console.log("storageKey", storageKey);
        console.log("itemPath", itemPath);
        console.log("configPath", configPath);
        setItems(items);
    };
    const [loaded, setLoaded] = React.useState(false);
    const [uiSelections, setUiSelections] = React.useState<
        Record<string, object>
    >({
        front: {},
        back: {},
        choices: {},
    });
    const [slots, setSlots] = React.useState<
        Record<string, object>
    >({});

    React.useEffect(() => {
        console.log("configPath:", configPath);
        console.log("itemPath:", itemPath);
        async function load() {
            try {
                const rawConfig =
                    await loadSource<TConfig>(configPath);

                const storing = {
                    front: {},
                    back: {},
                    choices: {},
                };
                //@ts-expect-error
                if (rawConfig.fields) {
                    //@ts-expect-error
                    Object.keys(rawConfig.fields).forEach(
                        (key) => {
                            //@ts-expect-error
                            storing.front[key] = false;
                            //@ts-expect-error
                            storing.back[key] = false;
                        },
                    );
                }
                //@ts-expect-error
                if (rawConfig.choice_categories) {
                    //@ts-expect-error
                    rawConfig.choice_categories.forEach(
                        //@ts-expect-error
                        (key) => {
                            //@ts-expect-error
                            storing.choices[key] = false;
                        },
                    );
                }
                //@ts-expect-error
                if (rawConfig.frontDefault) {
                    //@ts-expect-error
                    rawConfig.frontDefault.forEach(
                        //@ts-expect-error
                        (key) => {
                            //@ts-expect-error
                            storing.front[key] = true;
                        },
                    );
                }
                //@ts-expect-error
                if (rawConfig.backDefault) {
                    //@ts-expect-error
                    rawConfig.backDefault.forEach((key) => {
                        //@ts-expect-error
                        storing.back[key] = true;
                    });
                }
                //@ts-expect-error
                if (rawConfig.choicesDefault) {
                    //@ts-expect-error
                    rawConfig.choicesDefault.forEach(
                        //@ts-expect-error
                        (key) => {
                            //@ts-expect-error
                            storing.choices[key] = true;
                        },
                    );
                }

                setUiSelections(storing);
                const rawItems =
                    await loadSource<TItems>(itemPath);

                const stored =
                    localStorage.getItem(storageKey);
                const userConfig = stored
                    ? JSON.parse(stored)
                    : false;
                if (userConfig) {
                    setUiSelections(userConfig);
                }
                // @ts-expect-error
                setConfig({
                    ...(rawConfig as object),
                });
                const custSlots: Record<
                    string,
                    JSX.Element
                > = {};
                // @ts-expect-error
                Object.keys(rawConfig.fields).forEach(
                    (key) => {
                        custSlots[key] = <></>;
                    },
                );
                custSlots.advance = <></>;
                custSlots.feedback = <></>;
                setSlots(custSlots);

                wrapSetItems(rawItems);
                setLoaded(true);
            } catch (e) {
                console.error(e);
            }
        }

        load();
    }, [configPath, itemPath, storageKey]);

    const updateConfig = (patch: Partial<TConfig>) => {
        setUiSelections((prev) => {
            if (!prev) return prev;
            const next = { ...prev, ...patch };
            localStorage.setItem(
                storageKey,
                JSON.stringify(next),
            );
            return next;
        });
    };

    return (
        <DataContext.Provider
            value={{
                config,
                items,
                updateConfig,
                loaded,
                uiSelections,
                slots,
            }}
        >
            <>
                <h1>{itemPath}</h1>
                <h1>{configPath}</h1>
                <h1>{storageKey}</h1>
            </>
            {children}
        </DataContext.Provider>
    );
}

export function useData<T>() {
    const ctx = React.useContext(
        DataContext as React.Context<DataContextType<
            T,
            T
        > | null>,
    );

    if (!ctx) {
        throw new Error(
            "useData must be used inside DataProvider",
        );
    }

    return ctx;
}
