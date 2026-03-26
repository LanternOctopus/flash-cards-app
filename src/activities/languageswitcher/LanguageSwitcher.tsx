import { useLanguage } from "./LanguageProvider";
import {
    Locale,
    LANGUAGE_OPTIONS,
} from "../../utils/language";

export function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();

    return (
        <select
            value={locale}
            onChange={(e) =>
                setLocale(e.target.value as Locale)
            }
        >
            {LANGUAGE_OPTIONS.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
