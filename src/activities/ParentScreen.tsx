import { VisibilityGateProvider } from "../providers/VisibilityGateContext";
import { DataProvider } from "../providers/DataProvider";
import { SequenceController } from "./SequenceController";
import { AudioProvider } from "../providers/AudioProvider";
import { ScoreProvider } from "../providers/ScoreProvider";
export function ParentScreen({
    itemPath,
    configPath,
    modelClass,
    storageKey,
    children,
}: {
    itemPath: string;
    configPath: string;
    modelClass: new (
        raw: unknown,
        scorechangeCallback: (score: number) => void,
    ) => any;
    storageKey: string;
    children: React.ReactNode;
}) {
    return (
        <ScoreProvider>
            <AudioProvider>
                <DataProvider
                    itemPath={itemPath}
                    configPath={configPath}
                    storageKey={itemPath}
                >
                    <VisibilityGateProvider>
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
        </ScoreProvider>
    );
}
