export function shuffle<T>(list: T[]): T[] {
    return list
        .map((x) => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((o) => o.x);
}

export function zipByIndex<T>(...arrays: T[][]): T[][] {
    const minLength = Math.min(
        ...arrays.map((a) => a.length)
    );

    return Array.from({ length: minLength }, (_, i) =>
        arrays.map((a) => a[i])
    );
}
