import { VisibilityGateProvider } from "../providers/VisibilityGateContext";
import { ToggleBoxController } from "../components/ToggleBox";
import { DataProvider } from "../providers/DataProvider";
import { SequenceController } from "./SequenceController";
import { AudioProvider } from "../providers/AudioProvider";
export function ParentScreen({
    itemPath,
    configPath,
    storageKey,
    modelClass,
    children,
}: {
    itemPath: string;
    configPath: string;
    storageKey: string;
    modelClass: new (
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) => any;
    children: React.ReactNode;
}) {
    return (
        <AudioProvider>
            <DataProvider
                itemPath={itemPath}
                configPath={configPath}
                storageKey={storageKey}
            >
                <VisibilityGateProvider>
                    <ToggleBoxController />
                    <main>
                        <SequenceController
                            modelClass={modelClass}
                        >
                            {children}
                        </SequenceController>
                    </main>
                </VisibilityGateProvider>
            </DataProvider>
        </AudioProvider>
    );
}
