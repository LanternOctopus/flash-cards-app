import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
    getSavedLocale,
    isSupportedLocale,
    Locale,
    saveLocale,
} from "../utils/language";

type LanguageContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
};

const LanguageContext =
    createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchParams] = useSearchParams();

    const urlLocale = searchParams.get("lang");

    const [locale, setLocaleState] = useState<Locale>(
        () => {
            if (isSupportedLocale(urlLocale))
                return urlLocale;
            return getSavedLocale();
        },
    );

    useEffect(() => {
        setLocaleState(locale);
    }, [locale]);

    useEffect(() => {
        saveLocale(locale);
    }, [locale, searchParams]);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
    };

    const value = useMemo(
        () => ({ locale, setLocale }),
        [locale],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used within LanguageProvider",
        );
    }

    return context;
}
