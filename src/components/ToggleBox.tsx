import React, { useRef } from "react";
import { useData } from "../activities/DataProvider";
export const ToggleBoxController = () => {
    const { config, updateConfig, uiSelections } =
        useData();
    if (!config) return null;

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
        newSelections: Record<string, object>,
    ) => void;
}

export function ToggleBox({
    slots,
    categories,
    uiSelections,
    updateStorage,
}: ToggleBoxProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const handleToggle = (key: string, group: string) => {
        let newSelections: Record<string, object>;
        newSelections = { ...uiSelections };
        //@ts-expect-error
        newSelections[group][key] =
            //@ts-expect-error
            !newSelections[group][key];
        updateStorage(newSelections);
    };

    const closeDialog = () => {
        if (dialogRef.current?.open) {
            dialogRef.current.close();
        }
    };
    const renderToggle = (
        key: string,
        checked: boolean,
        group: string,
    ) => (
        <div key={`${group}-${key}`}>
            <label>
                <input
                    role="switch"
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
    const openDialog = () => {
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) return;
        dialog.showModal();
    };
    return (
        <>
            <button
                onClick={openDialog}
                data-tooltip="Open configuration"
                data-placement="left"
                style={{
                    position: "fixed",
                    top: "5%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                    zIndex: 1000,
                }}
                aria-label="Open configuration"
            >
                ⚙️
            </button>
            <dialog className="toggle-box" ref={dialogRef}>
                <article
                    style={{
                        position: "relative",
                    }}
                >
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={closeDialog}
                        style={{
                            position: "absolute",
                            right: "0",
                            top: "1rem",
                        }}
                    ></button>
                    <header>
                        Change the Configuration
                    </header>
                    <h3>Front</h3>

                    {Object.keys(uiSelections.front).map(
                        (key) =>
                            renderToggle(
                                key,
                                //@ts-expect-error
                                uiSelections.front[key],
                                "front",
                            ),
                    )}
                    <h3>Back</h3>
                    {Object.keys(uiSelections.back).map(
                        (key) =>
                            renderToggle(
                                key,
                                //@ts-expect-error
                                uiSelections.back[key],
                                "back",
                            ),
                    )}
                    {Object.keys(uiSelections.choices)
                        .length > 0 && <h3>Categories</h3>}
                    {Object.keys(uiSelections.choices).map(
                        (key) =>
                            renderToggle(
                                key,
                                //@ts-expect-error
                                uiSelections.choices[key],
                                "choices",
                            ),
                    )}
                </article>
            </dialog>
        </>
    );
}
