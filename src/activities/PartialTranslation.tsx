import {
    PropsWithChildren,
    Children,
    isValidElement,
    cloneElement,
    ReactNode,
    ReactElement,
    useState,
    JSX,
} from "react";
import { tokenize } from "../utils/utils";
import { Lexicon } from "./LexiconModel";
type PartialTranslationProps = {
    children: ReactNode;
};
export function PartialTranslation({
    children,
}: PartialTranslationProps): JSX.Element {
    console.log("lexicon", Lexicon.getAllWords());
    return (
        <>
            {Children.map(children, (child) => {
                if (typeof child === "string") {
                    return tokenize(child).map((word, i) =>
                        Lexicon.hasWord(word) ? (
                            <PowerWord
                                key={i}
                                word={word}
                            />
                        ) : (
                            word + " "
                        )
                    );
                } else if (isValidElement(child)) {
                    const element =
                        child as ReactElement<PropsWithChildren>;

                    return cloneElement(element, {
                        children: (
                            <PartialTranslation>
                                {element.props.children}
                            </PartialTranslation>
                        ),
                    });
                } else {
                    return child;
                }
            })}
        </>
    );
}
interface PowerWordProps {
    word: string;
}

export function PowerWord({
    word,
}: PowerWordProps): JSX.Element {
    const clean = word
        .toLowerCase()
        .replace(/[^a-zA-Z\u0D00-\u0D7F]+/g, "");

    const entries = Lexicon.getTranslation(clean);

    if (!entries) return <>{word}</>;

    return (
        <ToolTip
            content={
                <div>
                    {entries.map(([mal, tr], i) => (
                        <div
                            key={i}
                            style={{ marginBottom: 4 }}
                        >
                            <div>
                                <strong>Malayalam:</strong>{" "}
                                {mal}
                            </div>
                            <div>
                                <strong>Phonetic:</strong>{" "}
                                {tr}
                            </div>
                        </div>
                    ))}
                </div>
            }
        >
            {word + " "}
        </ToolTip>
    );
}

export function ToolTip({
    children,
    content,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
}): JSX.Element {
    const [show, setShow] = useState(false);
    return (
        <span
            style={{ position: "relative", cursor: "help" }}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "100%",
                        background: "#222",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        zIndex: 1000,
                    }}
                >
                    {content}
                </div>
            )}
        </span>
    );
}
