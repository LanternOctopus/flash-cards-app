class Builder {
    build(
        storedGroup: Record<string, boolean>,
        slots: Record<string, any>
    ) {
        //@ts-expect-error
        let output = [];
        Object.keys(storedGroup).forEach((k) => {
            console.log("Builder build", k);
            console.log(storedGroup[k]);
            console.log(slots[k]);
            if (!storedGroup[k]) return;
            output.push(slots[k]);
        });
        return (
            <>
                {
                    //@ts-expect-error
                    output
                }
            </>
        );
    }
}

export class ChoicesRenderer {
    constructor(private storedConfig: any) {}

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
        // only use the keys in storedConfig.choices that are true
        const selectedKeys = Object.keys(
            this.storedConfig.choices
        ).filter((key) => this.storedConfig.choices[key]);

        // pick from the choices object
        const selectedChoices = selectedKeys
            .map((key) => choices[key])
            .filter(Boolean);

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
            selectedChoices.map(
                (choiceArray: any, i: number) =>
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
        private storedConfig: any,
        public slots: Record<string, any>
    ) {
        console.log("PageBuilder constructor", this.slots);
        this.frontKeys = storedConfig.front;
        this.backKeys = storedConfig.back;
        this.choices = new ChoicesRenderer(storedConfig);
    }

    buildFront() {
        console.log("buildFront", this.storedConfig.front);
        console.log(this.slots);
        return this.frontBuilder.build(
            this.storedConfig.front,
            this.slots
        );
    }

    buildBack() {
        return this.backBuilder.build(
            this.storedConfig.back,
            this.slots
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
