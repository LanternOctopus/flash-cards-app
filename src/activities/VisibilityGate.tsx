import React from "react";
import { zipByIndex } from "../utils/utils";

export class ChoicesGate {
    constructor(private uiSelections: any) {}

    getChoices(choices: Record<string, any[]>): any[][] {
        const selectedKeys = Object.keys(
            this.uiSelections.choices
        ).filter((key) => this.uiSelections.choices[key]);

        return selectedKeys
            .map((key) => choices[key])
            .filter(Boolean);
    }

    getZippedChoices(
        choices: Record<string, any[]>
    ): any[][] {
        const selectedChoices = this.getChoices(choices);
        return zipByIndex(...selectedChoices);
    }
}

type Placement = "front" | "back";

export class VisibilityGate {
    constructor(
        public uiSelections: any,
        public slots: Record<string, any>
    ) {
        console.log(
            "VisibilityGate constructor",
            this.uiSelections
        );
    }

    showSlot(
        slotName: string,
        placements:
            | Placement
            | Placement[]
            | Record<Placement, React.ReactNode>
    ) {
        const result: Record<Placement, React.ReactNode> = {
            front: "",
            back: "",
        };

        const placementArray = Array.isArray(placements)
            ? placements
            : typeof placements === "object" &&
              !Array.isArray(placements)
            ? (Object.keys(placements) as Placement[])
            : [placements as Placement];

        placementArray.forEach((p) => {
            const selectedSlots = this.uiSelections[p];
            if (selectedSlots && selectedSlots[slotName]) {
                // Use the provided JSX if it's a per-placement object, otherwise fallback to the default slot
                if (
                    typeof placements === "object" &&
                    !Array.isArray(placements)
                ) {
                    result[p] = placements[p];
                } else {
                    result[p] = this.slots[slotName];
                }
            }
        });

        return result;
    }

    getChoices(choices: Record<string, any[]>) {
        const selectedKeys = Object.keys(
            this.uiSelections.choices
        ).filter((key) => this.uiSelections.choices[key]);

        return selectedKeys
            .map((key) => choices[key])
            .filter(Boolean);
    }

    getZippedChoices(choices: Record<string, any[]>) {
        const selectedChoices = this.getChoices(choices);
        return zipByIndex(...selectedChoices);
    }
}
