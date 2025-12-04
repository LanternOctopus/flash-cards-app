export default function normalizeStr(str: string) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
