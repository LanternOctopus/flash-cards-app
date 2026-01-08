import normalizeStr from "./utils";
export default function expandContractions(
    contraction: string
) {
    const normalized = normalizeStr(contraction);
    if (normalized !== contraction)
        throw new Error(
            `String contains non-normalized Unicode characters. Original: "${contraction}", Normalized: "${normalized}"`
        );

    const isFirstCharUppercase =
        contraction.charAt(0) ===
        contraction.charAt(0).toUpperCase();
    const lowercase = contraction.toLowerCase();

    let expanded;

    switch (lowercase) {
        case "don't":
            expanded = "do not";
            break;
        case "doesn't":
            expanded = "does not";
            break;
        case "didn't":
            expanded = "did not";
            break;
        case "can't":
            expanded = "cannot";
            break;
        case "couldn't":
            expanded = "could not";
            break;
        case "won't":
            expanded = "will not";
            break;
        case "wouldn't":
            expanded = "would not";
            break;
        case "isn't":
            expanded = "is not";
            break;
        case "aren't":
            expanded = "are not";
            break;
        case "wasn't":
            expanded = "was not";
            break;
        case "weren't":
            expanded = "were not";
            break;
        case "shouldn't":
            expanded = "should not";
            break;
        case "mustn't":
            expanded = "must not";
            break;
        case "i'm":
            expanded = "i am";
            break;
        case "you're":
            expanded = "you are";
            break;
        case "we're":
            expanded = "we are";
            break;
        case "they're":
            expanded = "they are";
            break;
        case "he's":
            expanded = "he is";
            break;
        case "she's":
            expanded = "she is";
            break;
        case "it's":
            expanded = "it is";
            break;
        case "that's":
            expanded = "that is";
            break;
        case "what's":
            expanded = "what is";
            break;
        case "where's":
            expanded = "where is";
            break;
        case "who's":
            expanded = "who is";
            break;
        case "how's":
            expanded = "how is";
            break;
        case "i'll":
            expanded = "i will";
            break;
        case "you'll":
            expanded = "you will";
            break;
        case "we'll":
            expanded = "we will";
            break;
        case "they'll":
            expanded = "they will";
            break;
        case "he'll":
            expanded = "he will";
            break;
        case "she'll":
            expanded = "she will";
            break;
        case "it'll":
            expanded = "it will";
            break;
        case "i'd":
            expanded = "i would";
            break;
        case "you'd":
            expanded = "you would";
            break;
        case "we'd":
            expanded = "we would";
            break;
        case "they'd":
            expanded = "they would";
            break;
        case "he'd":
            expanded = "he would";
            break;
        case "she'd":
            expanded = "she would";
            break;
        case "it'd":
            expanded = "it would";
            break;
        case "i've":
            expanded = "i have";
            break;
        case "you've":
            expanded = "you have";
            break;
        case "we've":
            expanded = "we have";
            break;
        case "they've":
            expanded = "they have";
            break;
        case "could've":
            expanded = "could have";
            break;
        case "should've":
            expanded = "should have";
            break;
        case "would've":
            expanded = "would have";
            break;
        default:
            return contraction;
    }

    if (isFirstCharUppercase && expanded) {
        return (
            expanded.charAt(0).toUpperCase() +
            expanded.slice(1)
        );
    }

    return expanded;
}
