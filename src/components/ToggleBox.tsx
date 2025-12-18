import React, { useState, useEffect } from "react";
import { useData } from "../activities/DataProvider";
const ToggleBoxController = () => {
    const { config, storedConfig, updateConfig } =
        useData();
    const [uiSelections, setUiSelections] = useState(
        storedConfig || {}
    );

    // Sync with storedConfig when it first loads
    useEffect(() => {
        if (storedConfig) setUiSelections(storedConfig);
    }, [storedConfig]);

    const updateStorage = (next: typeof uiSelections) => {
        setUiSelections(next); // Update local state immediately
        updateConfig(next); // Persist to DataProvider / localStorage
    };

    if (!config) return null;

    return (
        <ToggleBox
            //@ts-expect-error
            slots={config.fields}
            //@ts-expect-error
            categories={config.choice_categories}
            uiSelections={uiSelections} // <-- controlled by local state
            updateStorage={updateStorage}
        />
    );
};

function ToggleBox({
    //@ts-expect-error
    slots,
    //@ts-expect-error
    categories,
    //@ts-expect-error
    uiSelections,
    //@ts-expect-error
    updateStorage,
}) {
    const renderToggle = (key: string) => (
        <div key={key}>
            <label>
                <input
                    type="checkbox"
                    checked={!!uiSelections[key]}
                    onChange={() =>
                        updateStorage({
                            ...uiSelections,
                            [key]: !uiSelections[key],
                        })
                    }
                />
                {key}
            </label>
        </div>
    );

    return (
        <>
            {Object.keys(slots).map(renderToggle)}
            <hr />
            <h3>Categories</h3>
            {categories.map(renderToggle)}
        </>
    );
}
export { ToggleBoxController };
