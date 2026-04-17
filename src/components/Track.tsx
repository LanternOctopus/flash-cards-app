import {
    useSession,
    Step,
} from "../providers/SessionProvider";
import { ParentScreen } from "../activities/ParentScreen";

export function Track() {
    const { currentStep } = useSession(); // keep lowercase
    if (!currentStep) return null;

    switch (currentStep.type) {
        case "activity":
            return <ParentScreen {...currentStep} />;
        // case "story":
        //     return <StoryScreen config={currentStep.config} />;
        // case "title":
        //     return <TitleScreen config={currentStep.config} />;

        default:
            return <div>Unknown step type</div>;
    }
}
