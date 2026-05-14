import { useSession } from "../providers/SessionProvider";
import { ParentScreen } from "../activities/ParentScreen";

export function Track() {
    const { currentStep, next } = useSession(); // keep lowercase
    if (!currentStep) return null;

    switch (currentStep.type) {
        case "activity":
            return (
                <>
                    <ParentScreen
                        itemPath={currentStep.itemPath}
                        configPath={currentStep.configPath}
                        modelClass={currentStep.modelClass}
                        key={currentStep.path}
                        storageKey={currentStep.storageKey}
                    >
                        {currentStep.children}
                    </ParentScreen>
                </>
            );
        case "story":
            return (
                <>
                    <div>Story Component Placeholder</div>
                    <button onClick={next}>Next</button>
                </>
            );
        // case "title":
        //     return <TitleScreen config={currentStep.config} />;

        default:
            return <div>Unknown step type</div>;
    }
}
