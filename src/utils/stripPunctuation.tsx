export default function stripPunctuation(word: string) {
    return word.replace(/[^a-zA-Z']/g, "");
}
