import React, { useState, useEffect } from "react";
export interface ToggleOption {
    label: string;
    key: string;
}
export interface FaceConfig {
    question: string[];
    answer: string[];
}

export interface ToggleBoxProps {
    options: ToggleOption[];
    value: FaceConfig;
    onChange: (value: FaceConfig) => void;
}
export interface ToggleBoxControllerProps
    extends ToggleBoxProps {
    storageKey: string;
}

export function ToggleBox({
    options,
    value,
    onChange,
}: ToggleBoxProps) {
    const toggle = (
        face: "question" | "answer",
        key: string
    ) => {
        const list = value[face];
        const next = {
            ...value,
            [face]: list.includes(key)
                ? list.filter((k) => k !== key)
                : [...list, key],
        };
        onChange(next);
    };
    return (
        <div>
            {options.map((o) => (
                <div key={o.key}>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={value.question.includes(
                                    o.key
                                )}
                                onChange={() =>
                                    toggle(
                                        "question",
                                        o.key
                                    )
                                }
                            />
                            {o.label}(Q)
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={value.answer.includes(
                                    o.key
                                )}
                                onChange={() =>
                                    toggle("answer", o.key)
                                }
                            />
                            {o.label}(A)
                        </label>
                    </div>
                </div>
            ))}
        </div>
    );
}

function makeDefaultFaceConfig(
    options: ToggleOption[]
): FaceConfig {
    const key = options.map((o) => o.key);
    return {
        question: key,
        answer: key,
    };
}
export function ToggleBoxController({
    options,
    storageKey,
    value,
    onChange,
}: ToggleBoxControllerProps) {
    const [currValue, setValue] = useState<FaceConfig>(() =>
        makeDefaultFaceConfig(options)
    );
    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setValue(parsed);
                return;
            } catch (e) {
                console.error(e);
            }
        }
        localStorage.setItem(
            storageKey,
            JSON.stringify(value)
        );
    }, []);
    const handleChange = (next: FaceConfig) => {
        setValue(next);
        localStorage.setItem(
            storageKey,
            JSON.stringify(next)
        );
    };
    return (
        <ToggleBox
            options={options}
            value={value}
            onChange={handleChange}
        />
    );
}
