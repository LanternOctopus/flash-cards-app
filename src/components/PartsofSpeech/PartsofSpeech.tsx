import React, { useEffect, useState, useRef } from "react";
import PartsofSpeechController from "./PartsofSpeechController";
import PartsofSpeechView from "./PartsofSpeechView";
import { PartsofSpeechActivity } from "../../types";

const PartsofSpeechParent: React.FC = () => {
    const controllerRef =
        useRef<PartsofSpeechController | null>(null);

    const [activity, setActivity] =
        useState<PartsofSpeechActivity | null>(null);
    const [success, setSuccess] = useState<boolean | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [uuid, setUuid] = useState("");

    // Initial setup
    useEffect(() => {
        controllerRef.current = new PartsofSpeechController(
            {
                onActivity: (activityData) => {
                    setActivity(activityData);
                    setUuid(crypto.randomUUID());
                    setIsLoading(false);
                    setSuccess(null);
                },
                onSuccess: (val) => setSuccess(val),
            }
        );

        // Load first activity
        controllerRef.current.loadNext();
    }, []);

    const handleWordsSelected = (wordId: string) => {
        controllerRef.current?.handleWord(wordId);
    };

    const navigatetoNextChallenge = () => {
        setIsLoading(true);
        controllerRef.current?.loadNext();
    };

    if (isLoading || !activity) {
        return <div>Loading...</div>;
    }

    return (
        <PartofSpeechView
            data={activity}
            success={success}
            navigatetoNextChallenge={
                navigatetoNextChallenge
            }
            handleWordsSelected={handleWordsSelected}
            isLoading={isLoading}
            uuid={uuid}
        />
    );
};

export default PartsofSpeechParent;
