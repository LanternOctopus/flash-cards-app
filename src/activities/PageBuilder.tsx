import React, { ReactNode, Fragment } from "react";
import { zipByIndex } from "../utils/utils";
class Builder {
    build(
        storedGroup: Record<string, boolean>,
        slots: Record<string, any>,
        additional?: React.ReactNode[]
    ) {
        let output = [];
        Object.keys(storedGroup).forEach((k) => {
            if (!storedGroup[k]) return;
            output.push(slots[k]);
        });
        if (additional) output.push(...additional);
        return <>{output}</>;
    }
}

export class ChoicesRenderer {
    constructor(private uiSelections: any) {}

    render(
        choices: Record<string, any[]>,
        onChoice?: (
            value: any[],
            i: number
        ) => React.ReactNode,
        choiceWrapper?: (
            children: React.ReactNode
        ) => React.ReactNode
    ) {
        // only use the keys in uiSelections.choices that are true
        const selectedKeys = Object.keys(
            this.uiSelections.choices
        ).filter((key) => this.uiSelections.choices[key]);

        // pick from the choices object
        const selectedChoices = selectedKeys
            .map((key) => choices[key])
            .filter(Boolean);
        const zipped = zipByIndex(...selectedChoices);
        const renderChoice =
            onChoice ??
            ((c: React.ReactNode, i: number) => (
                <button key={i}>{c}</button>
            ));

        const wrap =
            choiceWrapper ??
            ((children) => (
                <div className="btn-group">{children}</div>
            ));

        return wrap(
            zipped.map((choiceArray: any, i: number) =>
                renderChoice(choiceArray, i)
            )
        );
    }
}

export class PageBuilder {
    frontBuilder = new Builder();
    backBuilder = new Builder();
    choices: ChoicesRenderer;
    frontKeys: string[];
    backKeys: string[];

    constructor(
        private uiSelections: any,
        public slots: Record<string, any>
    ) {
        console.log("PageBuilder constructor", this.slots);
        this.frontKeys = uiSelections.front;
        this.backKeys = uiSelections.back;
        this.choices = new ChoicesRenderer(uiSelections);
    }

    buildFront() {
        console.log("buildFront", this.uiSelections.front);
        console.log(this.slots);
        return this.frontBuilder.build(
            this.uiSelections.front,
            this.slots
        );
    }

    buildBack() {
        return this.backBuilder.build(
            this.uiSelections.back,
            this.slots,
            [this.slots.feedback, this.slots.advance]
        );
    }
    fillSlot(name: string, node: ReactNode) {
        this.slots[name] = (
            <React.Fragment key={name}>
                {node}
            </React.Fragment>
        );
    }

    buildChoices(
        choices: any,
        onChoice?: (
            value: any[],
            i: number
        ) => React.ReactNode,
        choiceWrapper?: (
            children: React.ReactNode
        ) => React.ReactNode
    ) {
        return this.choices.render(
            choices,
            onChoice,
            choiceWrapper
        );
    }
}
