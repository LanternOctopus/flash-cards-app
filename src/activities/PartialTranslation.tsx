import {
    PropsWithChildren,
    Children,
    isValidElement,
    cloneElement,
    ReactNode,
    ReactElement,
    useState,
    JSX,
    useRef,
} from "react";
import { tokenize } from "../utils/utils";
import { Lexicon } from "./LexiconModel";
import "./PartialTranslation.css";
type PartialTranslationProps = {
    children: ReactNode;
};
function isElementWithChildren(
    el: unknown
): el is React.ReactElement<PropsWithChildren<any>> {
    const element = el as ReactElement<
        PropsWithChildren<any>
    >;

    return isValidElement(el) && !!element.props?.children;
}

export function PartialTranslation({
    children,
}: PartialTranslationProps): JSX.Element {
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
                } else if (isElementWithChildren(child)) {
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
        <Dictionary
            content={
                <div>
                    {entries.map(([mal, tr], i) => (
                        <div className="definition-container">
                            <dl className="dict-group">
                                <div>
                                    <dt>Malayalam</dt>
                                    <dd>{mal}</dd>
                                </div>
                                <div>
                                    <dt>Phonetic</dt>
                                    <dd>
                                        <i>{tr}</i>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    ))}
                </div>
            }
        >
            <span className="power-word idle-wiggle">
                {word}
            </span>{" "}
        </Dictionary>
    );
}

export function Dictionary({
    children,
    content,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
}): JSX.Element {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        dialogRef.current?.showModal();
    };
    const closeDialog = () => {
        if (dialogRef.current?.open) {
            dialogRef.current.close();
        }
    };
    return (
        <>
            <span
                style={{ cursor: "help" }}
                onClick={openDialog}
            >
                {children}
            </span>

            <dialog
                ref={dialogRef}
                style={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    maxWidth: "400px", // caps width
                    width: "90%", // responsive on mobile
                    maxHeight: "80vh", // avoid full-page
                    overflowY: "auto", // scroll if content too tall
                    background: "#222", // optional dark bg
                    color: "#000",
                }}
            >
                <article>
                    <header>
                        <button
                            onClick={closeDialog}
                            aria-label="Close"
                            className="close" // Pico styles transparent
                        ></button>
                    </header>

                    {content}
                </article>
            </dialog>
        </>
    );
}
