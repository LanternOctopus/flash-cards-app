import yaml from "js-yaml";
async function fetchWithTimeout(url: string, ms = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(),
        ms,
    );

    try {
        const res = await fetch(url, {
            signal: controller.signal,
        });
        clearTimeout(timeout);
        return res;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}
export async function loadSource<T>(filePath: string) {
    const base = process.env.PUBLIC_URL ?? "";

    const url = `${base}/data/${filePath}`;
    console.log("Loading source from URL:", url);
    const response = await fetchWithTimeout(url, 5000);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    const raw = await response.text();
    const data = yaml.load(raw) as T;
    if (typeof data !== "object" || data === null) {
        throw new Error("Loaded YAML is not an object");
    }
    return data;
}
