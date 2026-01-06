import React, { useState, useEffect } from "react";
import { useData } from "../activities/DataProvider";
export const ToggleBoxController = () => {
    const {
        config,
        storedConfig,
        updateConfig,
        uiSelections,
    } = useData();
    if (!config) return null;

    console.log("ToggleBoxController render");
    console.log(config);
    console.log(storedConfig);
    console.log(updateConfig);
    console.log(uiSelections);

    return (
        <ToggleBox
            //@ts-expect-error
            slots={config.fields}
            //@ts-expect-error
            categories={config.choice_categories}
            uiSelections={uiSelections}
            updateStorage={updateConfig}
        />
    );
};
interface ToggleBoxProps {
    slots: Record<string, any>;
    categories: string[];
    uiSelections: Record<string, object>;
    updateStorage: (
        newSelections: Record<string, object>
    ) => void;
}

export function ToggleBox({
    slots,
    categories,
    uiSelections,
    updateStorage,
}: ToggleBoxProps) {
    const handleToggle = (key: string, group: string) => {
        let newSelections: Record<string, object>;
        newSelections = { ...uiSelections };
        //@ts-expect-error
        newSelections[group][key] =
            //@ts-expect-error
            !newSelections[group][key];
        updateStorage(newSelections);
    };

    const renderToggle = (
        key: string,
        checked: boolean,
        group: string
    ) => (
        <div key={`${group}-${key}`}>
            <label>
                <input
                    type="checkbox"
                    name={group + "-" + key}
                    checked={checked}
                    onChange={() =>
                        handleToggle(key, group)
                    }
                />
                {key}
            </label>
        </div>
    );

    return (
        <div className="toggle-box">
            <h3>Front</h3>
            {Object.keys(uiSelections.front).map((key) =>
                renderToggle(
                    key,
                    //@ts-expect-error
                    uiSelections.front[key],
                    "front"
                )
            )}
            <hr />
            <h3>Back</h3>
            {Object.keys(uiSelections.back).map((key) =>
                renderToggle(
                    key,
                    //@ts-expect-error
                    uiSelections.back[key],
                    "back"
                )
            )}
            <hr />
            <h3>Categories</h3>
            {Object.keys(uiSelections.choices).map((key) =>
                renderToggle(
                    key,
                    //@ts-expect-error
                    uiSelections.choices[key],
                    "choices"
                )
            )}
        </div>
    );
}
