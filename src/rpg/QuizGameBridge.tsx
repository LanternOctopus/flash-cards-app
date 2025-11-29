import { useState, useEffect, useRef } from "react";
import { ScramblerController } from "../controllers/ScramblerController";
import ScramblerView from "../views/ScramblerView";
import Modal from "../components/Modal";
import { Interaction } from "../types";
export default function QuizGameBridge() {
    const iframeRef = useRef<any>(null);
    const [Interaction, setCurrentQuiz] =
        useState<any>(null);
    const controllersRef = useRef({
        scrambler:
            new ScramblerController().getActivities(),
    });
    useEffect(() => {
        console.log("useeffect");
        const handleMessage = (
            event: MessageEvent<Interaction>
        ) => {
            if (Interaction) return;
            if (event.data.type !== "handshake") return;

            event.preventDefault();

            if (!event.data.challenge) return;

            switch (event.data.challenge) {
                case "Scrambler":
                    setCurrentQuiz(() => () => {
                        return (
                            <ScramblerView
                                data={
                                    controllersRef.current.scrambler.next()
                                        .value.data
                                }
                                updateSuccess={
                                    handleQuizComplete
                                }
                            />
                        );
                    });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener(
                "message",
                handleMessage
            );
        };
    }, []);
    function handleQuizComplete(result: boolean | null) {
        console.log("handleQuizComplete");
        console.log(result);
        if (result === null) return;
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "handshake",
                    abilityCheck: result,
                    rate: result ? 100 : 0,
                } as Interaction,
                "*"
            );
        }
        // Unmount the quiz
        setCurrentQuiz(null);
    }
    return (
        <div>
            <iframe
                ref={iframeRef}
                src={"http://localhost:5173/"}
                style={{
                    width: "90%",
                    height: "80vh",
                    margin: "0 auto",
                }}
            />
            {Interaction && (
                <Modal
                    isOpen={true}
                    onClose={() => setCurrentQuiz(null)}
                    title="Quiz Game"
                >
                    {Interaction()}
                </Modal>
            )}
        </div>
    );
}
