export interface WithId {
    id: string;
}

export type ActivityModelClass<TItem extends WithId> = new (
    raw: unknown
) => ActivityModel<TItem>;

export abstract class ActivityModel<TItem extends WithId> {
    protected rawData!: Record<string, TItem[]>;
    protected _generator: Generator<any> | null = null;
    constructor(raw: unknown) {
        if (!this.isValidSet(raw)) {
            throw new Error("Invalid activity data");
        }
        Object.values(raw).every((set) =>
            set.every((item) => this.addId(item))
        );
        this.rawData = raw;
    }

    protected isValidSet(
        data: unknown
    ): data is Record<string, TItem[]> {
        if (typeof data !== "object" || data === null)
            return false;

        return Object.values(data).every(
            (set) =>
                Array.isArray(set) &&
                set.every((item) => this.isValidItem(item))
        );
    }
    protected addId(item: TItem) {
        item.id = crypto.randomUUID();
        return item;
    }
    protected abstract isValidItem(
        item: unknown
    ): item is TItem;

    protected getFirstSetName(): string {
        return Object.keys(this.rawData)[0];
    }

    protected getSet(setName?: string): TItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.rawData[key];
    }

    *getGenerator(setName?: string): Generator<TItem> {
        const set = this.getSet(setName);
        for (const item of set) yield item;
    }
    initializeGenerator() {
        this._generator = this.getGenerator();
    }
    nextItem() {
        if (!this._generator)
            return { item: null, done: true };

        return this._generator.next();
    }
}
