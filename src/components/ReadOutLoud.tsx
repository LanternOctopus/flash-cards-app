import React from "react";
import { phonemize } from "phonemize";

const ReadOutLoud = () => {
    const [word, setWord] = React.useState("");
    const [output, setOutput] = React.useState("");

    const handleClick = () => {
        const output = phonemize(word);
        setOutput(JSON.stringify(output, null, 2));
    };

    return (
        <div>
            <h1>Read Out Loud</h1>
            <p>Enter a word to read out loud:</p>
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />
            <button onClick={handleClick}>
                Read Out Loud
            </button>
            <p>Output:</p>
            <pre>{output}</pre>
        </div>
    );
};
export default ReadOutLoud;
