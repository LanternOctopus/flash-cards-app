export function shuffle<T>(list: T[]): T[] {
    return list
        .map((x) => ({ x, r: Math.random() }))
        .sort((a, b) => a.r - b.r)
        .map((o) => o.x);
}

export function zipByIndex<T>(...arrays: T[][]): T[][] {
    const minLength = Math.min(
        ...arrays.map((a) => a.length),
    );

    return Array.from({ length: minLength }, (_, i) =>
        arrays.map((a) => a[i]),
    );
}
export function normalizeStr(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
export function stripPunctuation(word: string) {
    return word.replace(/[^a-zA-Z\s']/g, "");
}

export function tokenize(text: string): string[] {
    const regex =
        /[a-zA-Z0-9]+(?:['’][a-zA-Z0-9]+)*[.,!?;:]?/g;
    console.log("tokenize", text, text.match(regex));
    return text.match(regex) || [];
}
export const globalGetimageURL = (image: string) => {
    return `${process.env.PUBLIC_URL}/images/${image}`;
};
export function capitalizeFirstLetter(string: string) {
    if (!string) return string; // Handles empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
}
