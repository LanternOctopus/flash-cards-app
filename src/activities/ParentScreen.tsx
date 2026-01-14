import { PageBuilderProvider } from "../components/PageBuilderCTX";
import { ToggleBoxController } from "../components/ToggleBox";
import { DataProvider } from "./DataProvider";
import { SequenceController } from "./SequenceController";
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
    modelClass: new (raw: unknown) => any;
    children: React.ReactNode;
}) {
    return (
        <DataProvider
            itemPath={itemPath}
            configPath={configPath}
            storageKey={storageKey}
        >
            <PageBuilderProvider>
                <ToggleBoxController />
                <main>
                    <SequenceController
                        modelClass={modelClass}
                    >
                        {children}
                    </SequenceController>
                </main>
            </PageBuilderProvider>
        </DataProvider>
    );
}
