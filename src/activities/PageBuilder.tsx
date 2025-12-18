const configLookup = {
    pictureMatchingGame: "PictureMatchingGameConfig.yaml",
};

export class PageBuilder {
    private rawConfig: any;
    private storedConfig: any;

    slots: Record<string, any> = {};
    choicesView!: React.ReactNode;

    constructor({
        config,
        storedConfig,
    }: {
        config: any;
        storedConfig: any;
    }) {
        this.rawConfig = config;
        this.storedConfig = storedConfig;

        this.buildSlots();
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
        console.log("buildChoices", choices);
        const mergedChoices =
            this.mergeChoicesArrays(choices);
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

        this.choicesView = wrap(
            mergedChoices.map(
                (choiceArray: any, i: number) => {
                    return renderChoice(choiceArray, i);
                }
            )
        );

        return <>{this.choicesView}</>;
    }
    mergeChoicesArrays(choices: Record<string, any[]>) {
        // Pull only the arrays the config wants
        console.log("mergeChoicesArrays", choices);
        const selected =
            this.storedConfig.choice_categories;
        console.log(
            "selected categories storedConfig",
            selected
        );
        const arrays = selected
            // @ts-expect-error
            .map((key) => choices[key])
            .filter(Boolean);

        if (arrays.length === 0) return [];

        const length = arrays[0].length;
        const merged: any[][] = [];

        for (let i = 0; i < length; i++) {
            const row: any[] = [];
            for (const arr of arrays) {
                row.push(arr[i]);
            }
            merged.push(row);
        }

        return merged;
    }
    buildSlots() {
        if (this.slots) return this.slots;

        this.slots = Object.fromEntries(
            Object.keys(this.storedConfig.fields).map(
                (k) => [k, ""]
            )
        );
        this.slots["advance"] = null;
        return this.slots;
    }

    buildFront() {
        console.log("buildFront", this.rawConfig);
        const elements =
            this.rawConfig.frontDefault.question
                .map((k: string) => this.slots[k])
                .filter(Boolean);

        return (
            <>
                {elements}
                {this.choicesView}
            </>
        );
    }
    buildBack() {
        const elements = this.rawConfig.backDefault
            .map((k: string) => this.slots[k])
            .filter(Boolean);
        return <>{elements}</>;
    }
    getSlots() {
        return this.buildSlots();
    }
    getChoiceCategories() {
        return this.rawConfig.choice_categories;
    }
}
