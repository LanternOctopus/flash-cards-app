export const LANGUAGE_STORAGE_KEY = "preferred_locale";

export const LANGUAGE_OPTIONS = [
    { label: "Malayalam", value: "ml" },
    { label: "Kannada", value: "kn" },
] as const;

export type Locale =
    (typeof LANGUAGE_OPTIONS)[number]["value"];

export const isSupportedLocale = (
    value: string | null,
): value is Locale => {
    return (
        value !== null &&
        LANGUAGE_OPTIONS.some((opt) => opt.value === value)
    );
};
export const getSavedLocale = (): Locale => {
    if (typeof window === "undefined") return "ml";

    const saved = localStorage.getItem(
        LANGUAGE_STORAGE_KEY,
    );

    if (isSupportedLocale(saved)) return saved;

    return "ml";
};

export const saveLocale = (locale: Locale): void => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
};
