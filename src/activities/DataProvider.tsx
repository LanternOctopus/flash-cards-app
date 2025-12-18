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

type DataContextType<TConfig, TQuestions> = {
    config: TConfig | null;
    questions: TQuestions | null;
    storedConfig: any | null;
    updateConfig: (patch: Partial<TConfig>) => void;
};

export const DataContext =
    React.createContext<DataContextType<any, any> | null>(
        null
    );
export function DataProvider<TConfig, TQuestions>({
    configPath,
    questionPath,
    storageKey,
    children,
}: {
    configPath: string;
    questionPath: string;
    storageKey: string;
    children: React.ReactNode;
}) {
    const [config, setConfig] =
        React.useState<TConfig | null>(null);
    const [questions, setQuestions] =
        React.useState<TQuestions | null>(null);
    const [storedConfig, setStoredConfig] = React.useState<
        any | null
    >(null);
    console.log("DataProvider render");
    console.log("Config path:", configPath);
    console.log("Question path:", questionPath);
    console.log("Storage key:", storageKey);
    React.useEffect(() => {
        console.log("useEffect registered");
        async function load() {
            console.log("Loading data...");
            try {
                const rawConfig = await loadSource<TConfig>(
                    configPath
                );
                console.log(
                    "Loading config from:",
                    configPath
                );
                console.log("Loaded config:", rawConfig);
                const rawQuestions =
                    await loadSource<TQuestions>(
                        questionPath
                    );

                const stored =
                    localStorage.getItem(storageKey);
                const userConfig = stored
                    ? JSON.parse(stored)
                    : {};
                // @ts-expect-error
                setConfig({
                    ...(rawConfig as object),
                });
                console.log(
                    "Loaded questions:",
                    rawQuestions
                );
                console.log("Stored config:", userConfig);
                setQuestions(rawQuestions);
                setStoredConfig(userConfig);
            } catch (e) {
                console.error(e);
            }
        }

        load();
    }, [configPath, questionPath, storageKey]);

    const updateConfig = (patch: Partial<TConfig>) => {
        setConfig((prev) => {
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
                storedConfig,
                questions,
                updateConfig,
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
