import { FC, useState, useRef } from "react";
import ShowFeedback from "./ShowFeedback";
import ScramblerView from "../views/ScramblerView";
import LoadingError from "../views/LoadingError";
import { ScramblerController } from "../controllers/ScramblerController";
import Conversation from "../dalit-history-month/conversation/ConversationEntryPoint";
const viewMap = {
    scrambler: ScramblerView,
};

const Scrambler: FC = () => {
    const controller = useRef(new ScramblerController());
    const generator = useRef(
        controller.current.getActivities(),
    );

    const [currentActivity, setCurrentActivity] = useState(
        () => {
            const first = generator.current.next();
            return first.done ? null : first.value;
        },
    );

    const [success, setSuccess] = useState<boolean | null>(
        null,
    );

    const handleNext = () => {
        const next = generator.current.next();
        if (!next.done) {
            setCurrentActivity(next.value);
            setSuccess(null);
        }
    };

    if (!currentActivity)
        return <div>Loading activity...</div>;

    const ViewComponent =
        viewMap[
            currentActivity.type as keyof typeof viewMap
        ] || LoadingError;
    const LearningHint: React.FC = () => {
        return (
            <div>
                <p>
                    {
                        "Present tense: I am, You are, It is, She is, He is, They are, We are."
                    }
                </p>{" "}
                <p>
                    {" "}
                    {
                        "Past tense: I was, You were, It was, She was, He was, They were, We were."
                    }{" "}
                </p>
                <p>
                    {
                        " Future tense: I will be, You will be, It will be, She will be, He will be, They will be, We will be."
                    }
                </p>
            </div>
        );
    };

    return (
        <div>
            <ViewComponent
                data={currentActivity.data}
                updateSuccess={setSuccess}
            />

            {success !== null && (
                <ShowFeedback
                    success={success}
                    handleNext={handleNext}
                    LearningHint={LearningHint}
                />
            )}
        </div>
    );
};

export default Scrambler;
