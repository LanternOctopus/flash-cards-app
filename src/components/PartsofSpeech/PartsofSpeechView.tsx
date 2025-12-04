import LoadingError from "../../views/LoadingError";
import ShowFeedback from "../ShowFeedback";
import "./PartofSpeech.css";
import { PartsofSpeechItem } from "../../types";

type WordData = {
    id: string; // uuid + index or whatever
    display: string; // "I'll"
    isCorrect: boolean; // true if this word is an answer
};

type WordSpanProps = {
    word: WordData;

    wasClicked: (id: string) => void;
    clicked: boolean;
};

const WordSpan: React.FC<WordSpanProps> = ({
    word,
    wasClicked,
    clicked,
}) => {
    const borderColor = clicked
        ? word.isCorrect
            ? "3px solid green"
            : "3px solid red"
        : "none";
    const icon = clicked
        ? word.isCorrect
            ? "✅"
            : "❌"
        : "";
    const style: React.CSSProperties = {
        display: "inline-block",
        padding: "0",
        border: borderColor,
        borderRadius: 3,
        cursor: "default",
        userSelect: "none",
        marginLeft: word.display.includes("'") ? 0 : 6,
    };

    return (
        <span
            className={"pos-word"}
            onClick={() => wasClicked(word.id)}
            style={style}
        >
            {word.display}
            {icon}
        </span>
    );
};

type PassageProps = {
    words: WordData[];
    clickedMap: Record<string, boolean>;
    wasClicked: (id: string) => void;
};

const Passage: React.FC<PassageProps> = ({
    words: wordData,
    clickedMap, // map of word id to whether it was clicked
    wasClicked,
}) => {
    return (
        <div role="group" aria-label="Select options">
            {words.map((word, i) => (
                <WordSpan
                    word={word}
                    key={word.id}
                    clicked={!!clickedMap[word.id]}
                    wasClicked={wasClicked}
                />
            ))}
        </div>
    );
};

type Props = {
    words: WordData[];
    clickedMap: Record<string, boolean>;
    wasClicked: (id: string) => void;
    success: boolean | null;
    handleNext: () => void;
    isLoading: boolean;
    data: PartsofSpeechItem;
};

const PartofSpeechView: React.FC<Props> = ({
    words,
    clickedMap,
    wasClicked,
    success,
    handleNext,
    isLoading,
    data,
}) => {
    return (
        <>
            {isLoading && <div>Loading activity...</div>}

            <section
                aria-live="polite"
                className="pos-wrapper"
            >
                <header className="pos-header">
                    <h2 className="pos-title">
                        Find {data.answer.length} Verb(s)
                    </h2>
                </header>

                <Passage
                    words={words}
                    clickedMap={clickedMap}
                    wasClicked={wasClicked}
                />
            </section>

            {success !== null && (
                <ShowFeedback
                    success={success}
                    handleNext={handleNext}
                />
            )}
        </>
    );
};

export default PartofSpeechView;
