class SlotBuilder {
    private slots: Record<string, any> = {};
    constructor(private rawConfig: any) {
        this.slots = Object.fromEntries(
            Object.keys(this.rawConfig).map((k) => [k, ""])
        );

        this.slots["advance"] = null;

        Object.seal(this.slots);
    }

    get_slots() {
        return this.slots;
    }
}

class FrontBuilder {
    build(keys: string[], slots: Record<string, any>) {
        return (
            <>{keys.map((k) => slots[k]).filter(Boolean)}</>
        );
    }
}

class BackBuilder {
    build(keys: string[], slots: Record<string, any>) {
        return (
            <>{keys.map((k) => slots[k]).filter(Boolean)}</>
        );
    }
}

export class ChoicesRenderer {
    constructor(private storedConfig: any) {}
    mergeChoicesArrays(choices: Record<string, any[]>) {
        const selected =
            this.storedConfig.choice_categories;
        const arrays = selected
            // @ts-expect-error
            .map((key) => choices[key])
            .filter(Boolean);

        if (arrays.length === 0) return [];
        //@ts-expect-errors
        return arrays[0].map((_, i) =>
            //@ts-expect-error
            arrays.map((arr) => arr[i])
        );
    }
    render(
        choices: any,
        onChoice?: (
            value: any[],
            i: number
        ) => React.ReactNode,
        choiceWrapper?: (
            children: React.ReactNode
        ) => React.ReactNode
    ) {
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

        return wrap(
            mergedChoices.map(
                (choiceArray: any, i: number) => {
                    return renderChoice(choiceArray, i);
                }
            )
        );
    }
}

export class PageBuilder {
    slots: Record<string, any>;
    frontKeys: string[];
    backKeys: string[];
    choices: ChoicesRenderer;

    frontBuilder = new FrontBuilder();
    backBuilder = new BackBuilder();

    constructor(rawConfig: any, storedConfig: any) {
        console.log("pagebuilder constructor", rawConfig);
        this.slots = new SlotBuilder(rawConfig.fields);
        this.slots.advance = null;

        this.frontKeys = resolveFrontKeys(
            rawConfig,
            storedConfig
        );
        this.backKeys = resolveBackKeys(
            rawConfig,
            storedConfig
        );
        this.choices = new ChoicesRenderer(storedConfig);
    }
    buildChoices(
        choices: any,
        onChoice?: (
            value: any[],
            i: number
        ) => React.ReactNode,
        wrapper?: (
            children: React.ReactNode
        ) => React.ReactNode
    ) {
        return this.choices.render(
            choices,
            onChoice,
            wrapper
        );
    }
    buildFront() {
        console.log("buildfront", this.frontKeys);
        return this.frontBuilder.build(
            this.frontKeys,
            this.slots
        );
    }

    buildBack() {
        return this.backBuilder.build(
            this.backKeys,
            this.slots
        );
    }
}

function resolveFrontKeys(
    rawConfig: any,
    storedConfig: any
) {
    console.log(
        "resolveFrontKeys",
        rawConfig,
        storedConfig,
        storedConfig?.front?.length
            ? storedConfig.front
            : rawConfig.frontDefault.question
    );
    return storedConfig?.front?.length
        ? storedConfig.front
        : rawConfig.frontDefault;
}

function resolveBackKeys(
    rawConfig: any,
    storedConfig: any
) {
    return storedConfig?.back?.length
        ? storedConfig.back
        : rawConfig.backDefault;
}
