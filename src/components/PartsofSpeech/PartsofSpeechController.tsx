import { useEffect, useState, useMemo } from "react";
import PartofSpeechView from "./PartsofSpeechView";
import { PartsofSpeechItem } from "../../types";
import expandContractions from "../../utils/expandContractions";
import stripPunctuation from "../../utils/stripPunctuation";
import { v4 as uuidv4 } from "uuid";

type WordData = {
    id: string;
    display: string;
    isCorrect: boolean;
};

type Props = {
    data: PartsofSpeechItem | null;
    navigatetoNextChallenge: () => void;
};

const PartsOfSpeechController: React.FC<Props> = ({
    data,
    navigatetoNextChallenge,
}) => {
    const [clickedMap, setClickedMap] = useState<
        Record<string, boolean>
    >({});
    const [success, setSuccess] = useState<boolean | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    // ----------------------------------------
    // 1. Prepare data once per new passage
    // ----------------------------------------
    const words: WordData[] = useMemo(() => {
        if (!data) return [];

        const rawWords = data.text.split(/\s+/g);

        return rawWords.map((w, index) => {
            const id = uuidv4();

            const normalized = expandContractions(
                stripPunctuation(w)
            );
            const isCorrect =
                data.answer.includes(normalized);

            return {
                id,
                display: w,
                isCorrect,
            };
        });
    }, [data]);

    // ----------------------------------------
    // 2. Reset click state and loading when data changes
    // ----------------------------------------
    useEffect(() => {
        if (!data) return;

        setClickedMap({});
        setSuccess(null);
        setIsLoading(false);
    }, [data]);

    // ----------------------------------------
    // 3. Handle a click
    // ----------------------------------------
    const wasClicked = (id: string) => {
        setClickedMap((prev) => ({
            ...prev,
            [id]: true,
        }));

        const word = words.find((w) => w.id === id);
        if (!word) return;

        if (word.isCorrect) {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    };

    return (
        <PartofSpeechView
            words={words}
            clickedMap={clickedMap}
            wasClicked={wasClicked}
            success={success}
            handleNext={navigatetoNextChallenge}
            isLoading={isLoading}
            data={data!}
        />
    );
};

export default PartsOfSpeechController;
