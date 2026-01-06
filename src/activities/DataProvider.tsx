import React from "react";
import yaml from "js-yaml";
async function fetchWithTimeout(url: string, ms = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(),
        ms
    );

    try {
        const res = await fetch(url, {
            signal: controller.signal,
        });
        clearTimeout(timeout);
        return res;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}
async function loadSource<T>(filePath: string) {
    const base = process.env.PUBLIC_URL ?? "";

    const url = `${base}/data/${filePath}`;
    console.log("Loading source from URL:", url);
    const response = await fetchWithTimeout(url, 5000);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    const raw = await response.text();
    const data = yaml.load(raw) as T;
    if (typeof data !== "object" || data === null) {
        throw new Error("Loaded YAML is not an object");
    }
    return data;
}

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
        null
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
    // const [questions, setQuestions] =
    //     React.useState<TQuestions | null>(null);
    const [items, setItems] = React.useState<TItems | null>(
        null
    );
    const [uiSelections, setUiSelections] = React.useState<
        Record<string, object>
    >({
        front: {},
        back: {},
        choices: {},
    });
    const [loaded, setLoaded] = React.useState(false);
    const [slots, setSlots] = React.useState<
        Record<string, object>
    >({});

    React.useEffect(() => {
        async function load() {
            try {
                const rawConfig = await loadSource<TConfig>(
                    configPath
                );

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
                        }
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
                        }
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
                        }
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
                        }
                    );
                }
                setUiSelections(storing);
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
                const custSlots = {};
                // @ts-expect-error
                Object.keys(rawConfig.fields).forEach(
                    (key) => {
                        //@ts-expect-error
                        custSlots[key] = <></>;
                    }
                );
                setSlots(custSlots);
                // rawConfig.fields.forEach((field) => {
                //     //@ts-expect-error
                //     custSlots[field] = <></>;
                // });
                // const rawQuestions =
                //     await loadSource<TQuestions>(
                //         questionPath
                //     );
                const rawItems = await loadSource<TItems>(
                    itemPath
                );
                // setQuestions(rawQuestions);
                setItems(rawItems);
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
                JSON.stringify(next)
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
            {children}
        </DataContext.Provider>
    );
}

export function useData<T>() {
    const ctx = React.useContext(
        DataContext as React.Context<DataContextType<
            T,
            T
        > | null>
    );

    if (!ctx) {
        throw new Error(
            "useData must be used inside DataProvider"
        );
    }

    return ctx;
}
