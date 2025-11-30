import { useState, useRef, useMemo } from "react";
import { ConversationController } from "../controllers/ConversationController";
import { BaseConversation, BasePassage } from "../types";
import "./Conversation.css";

interface Props {
    conversation: BaseConversation;
}

export default function ConversationView({
    conversation,
}: Props) {
    const controllerRef =
        useRef<ConversationController<BaseConversation> | null>(
            null
        );
    const generatorRef = useRef<ReturnType<
        ConversationController<BaseConversation>["getPassagesInteractive"]
    > | null>(null);

    if (!controllerRef.current) {
        controllerRef.current = new ConversationController(
            conversation
        );
        generatorRef.current =
            controllerRef.current.getPassagesInteractive();
    }

    const controller = controllerRef.current;
    const generator = generatorRef.current!;
    const firstValue = useMemo(() => generator.next(), []);
    const speaker = controller.getSpeaker();
    const [currentPassage, setCurrentPassage] =
        useState<BasePassage | null>(
            firstValue.done ? null : firstValue.value
        );

    const handleClick = (next?: string) => {
        const result = generator.next(next);
        setCurrentPassage(
            result.done || !result.value
                ? null
                : result.value
        );
    };
    var i = 0;
    return (
        <div className="storyWrapper">
            {currentPassage && (
                <>
                    <div
                        className="scene"
                        style={{
                            ...(currentPassage.sceneImage && {
                                backgroundImage: `url(${process.env.PUBLIC_URL}${currentPassage.sceneImage})`,
                            }),
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {" "}
                        <div className="characterImage">
                            {currentPassage.characterImage && (
                                <img
                                    src={
                                        process.env
                                            .PUBLIC_URL +
                                        currentPassage.characterImage
                                    }
                                    alt="NPC portrait"
                                />
                            )}
                        </div>
                        <div
                            className="dialogue-box"
                            role="dialog"
                            aria-labelledby="dlg-title"
                        >
                            <div className="db-vignette"></div>

                            <div className="db-inner">
                                {speaker.image && (
                                    <div className="db-portrait">
                                        <img
                                            src={
                                                process.env
                                                    .PUBLIC_URL +
                                                speaker.image
                                            }
                                            alt="NPC portrait"
                                        />
                                    </div>
                                )}
                                <div className="db-header">
                                    {speaker.name && (
                                        <span
                                            id="dlg-title"
                                            className="db-name"
                                        >
                                            {speaker.name}
                                        </span>
                                    )}
                                    {speaker.role && (
                                        <span className="db-tag">
                                            {speaker.role}
                                        </span>
                                    )}
                                </div>
                                <div className="db-content">
                                    <div
                                        className="db-text"
                                        id="dialogue-text"
                                    >
                                        {
                                            currentPassage.text
                                        }
                                    </div>
                                    <div
                                        className="db-choices"
                                        role="list"
                                    >
                                        {currentPassage.choices?.map(
                                            (choice) => (
                                                <button
                                                    className="db-choice"
                                                    onClick={() =>
                                                        handleClick(
                                                            choice.next
                                                        )
                                                    }
                                                    data-next={
                                                        choice.next
                                                    }
                                                    key={
                                                        choice.next +
                                                        i++
                                                    }
                                                    role="listitem"
                                                >
                                                    {
                                                        choice.text
                                                    }
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
