import React, { useState, useEffect } from "react";
import { ScramblerItem } from "../types";

interface Props {
  data: ScramblerItem;
  updateSuccess: (success: boolean | null) => void;
}

const ScramblerView = ({ data, updateSuccess }: Props) => {
  const [challengeSentence, setChallengeSentence] = useState<string[]>([]);
  const [missingWords, setMissingWords] = useState<[string, number][]>([]);
  const [dragged, setDragged] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    const correctSentence = data.sentence.split(" ");
    const indexed = correctSentence.map((w, i) => [w, i] as [string, number]);

    // pick 2 random words
    const removed = [...indexed]
      .sort(() => Math.random() - 0.5)
      .slice(-2);

    setMissingWords(removed);

    const removedIndexes = removed.map(([, idx]) => idx);

    // build new sentence with "replaceme"
    const challenge = correctSentence.map((word, i) =>
      removedIndexes.includes(i) ? "replaceme" : word
    );

    setChallengeSentence(challenge);
    updateSuccess(null);
  }, [data, updateSuccess]);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    setDragged(e.currentTarget);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
    if (!dragged) return;

    const newChallenge = [...challengeSentence];
    newChallenge[slotIndex] = dragged.textContent || "";
    setChallengeSentence(newChallenge);

    dragged.classList.add("hide");
    dragged.classList.remove("dragging");

    setDragged(null);

    const attempt = newChallenge.join(" ");
    updateSuccess(attempt === data.sentence);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Scrambler</h1>

      <div style={{ marginBottom: 20 }}>
        {challengeSentence.map((word, i) =>
          word === "replaceme" ? (
            <div
              key={i}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              style={{
                display: "inline-block",
                width: 90,
                padding: "6px 10px",
                margin: 5,
                border: "2px dashed #bbb",
                textAlign: "center",
                borderRadius: 6,
              }}
            >
              Drop here
            </div>
          ) : (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: "6px 10px",
                margin: 5,
                background: "#eee",
                borderRadius: 6,
              }}
            >
              {word}
            </span>
          )
        )}
      </div>

      <div>
        {missingWords.map(([word, idx]) => (
          <button
            key={idx}
            draggable
            onDragStart={handleDragStart}
            style={{
              padding: "6px 12px",
              margin: 6,
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScramblerView;
