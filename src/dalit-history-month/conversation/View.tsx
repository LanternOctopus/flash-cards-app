import {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
} from "react";
import {
    GraphController,
    CoreGraph,
    CoreNode,
} from "./GraphModel";
import TinyFooter from "../../components/TinyFooter";
import { useAudio } from "../../providers/AudioProvider";
interface Props {
    graph: CoreGraph;
}

export default function ConversationView({ graph }: Props) {
    const { play, soundsAllowed } = useAudio();

    const [showChoices, setShowChoices] = useState(false);
    const [showContinue, setShowContinue] = useState(false);
    const [stage, setStage] = useState("");
    const [speakerImage, setSpeakerImage] = useState("");
    const controllerRef = useRef<GraphController | null>(
        null,
    );
    const generatorRef = useRef<ReturnType<
        GraphController["traverse"]
    > | null>(null);

    const [currentNode, setCurrentNode] =
        useState<CoreNode | null>(null);

    useEffect(() => {
        controllerRef.current = new GraphController(graph);
        generatorRef.current =
            controllerRef.current.traverse();

        const first = generatorRef.current.next();
        setCurrentNode(first.done ? null : first.value);
    }, [graph]);
    useLayoutEffect(() => {
        setShowContinue(false);
        setShowChoices(false);
        // if(currentNode && currentNode?.audio) play(currentNode.?audio)
        if (currentNode?.speakerBg) {
            setStage(currentNode?.speakerBg);
        }
        if (currentNode?.speakerImage) {
            setSpeakerImage(currentNode?.speakerImage);
        }
        const t = setTimeout(() => {
            setShowContinue(true);
        }, 2000);

        return () => clearTimeout(t);
    }, [currentNode]);
    const handleClick = (next?: string) => {
        const result = generatorRef.current!.next(next);
        setCurrentNode(
            result.done || !result.value
                ? null
                : result.value,
        );
    };

    const speaker = {
        name: currentNode?.speakerName,
        role: currentNode?.speakerRole,
        image: currentNode?.speakerImage,
        bg: currentNode?.speakerBg,
    };

    return (
        <div
            style={{
                backgroundImage: stage
                    ? `url(${process.env.PUBLIC_URL + stage})`
                    : undefined,
                backgroundPosition: "center center",
            }}
            className="conversation-stage stage"
        >
            {currentNode && (
                <div
                    className="dialogue-box"
                    role="dialog"
                    aria-labelledby="dlg-title"
                >
                    <div className="db-vignette"></div>

                    <div className="db-inner ">
                        {speakerImage && (
                            <div className="db-portrait character">
                                <img
                                    src={
                                        process.env
                                            .PUBLIC_URL +
                                        speakerImage
                                    }
                                    alt="NPC portrait"
                                />
                            </div>
                        )}
                        <div className="db-content">
                            <div className="db-content-inner">
                                {(speaker.name ||
                                    speaker.role) && (
                                    <div className="db-header">
                                        {speaker.name && (
                                            <span
                                                id="dlg-title"
                                                className="db-name"
                                            >
                                                {
                                                    speaker.name
                                                }
                                            </span>
                                        )}
                                        {speaker.role && (
                                            <span className="db-tag">
                                                {
                                                    speaker.role
                                                }
                                            </span>
                                        )}
                                    </div>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "1em",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "space-between",
                                    }}
                                >
                                    <div
                                        className="db-text"
                                        id="dialogue-text"
                                    >
                                        {currentNode.text}
                                    </div>

                                    <button
                                        style={{
                                            flex: "0 0 50px",
                                        }}
                                        className={`db-continue ${
                                            showContinue
                                                ? "show"
                                                : ""
                                        }  `}
                                        onClick={() =>
                                            setShowChoices(
                                                true,
                                            )
                                        }
                                        role="button"
                                        aria-label="Continue"
                                        tabIndex={0}
                                    >
                                        <img
                                            src={`${process.env.PUBLIC_URL}/images/dalithistorymonth/continue.svg`}
                                            alt="Continue"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`db-choices ${
                                showChoices ? "show" : ""
                            }`}
                            role="list"
                        >
                            {currentNode.choices?.map(
                                (choice) => (
                                    <button
                                        className="db-choice"
                                        onClick={() =>
                                            handleClick(
                                                choice.next,
                                            )
                                        }
                                        key={choice.next}
                                        role="listitem"
                                    >
                                        {choice.text}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                </div>
            )}
            <TinyFooter />
        </div>
    );
}
