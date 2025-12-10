import yaml from "js-yaml";
import React, {
    useState,
    useEffect,
    useMemo,
    use,
} from "react";
import {
    ToggleBoxController,
    FaceConfig,
} from "../components/ToggleBox";
async function fetchWithTimeout(url: string, ms = 5000) {
    const controller = new AbortController();
    const timeout = setTimeout(
        () => controller.abort(),
        ms
    );

    try {
        const res = await fetch(url, {
            signal: controller.signal,
        });
        clearTimeout(timeout);
        return res;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}

export interface ActivityN {
    type: string;
    data: any;
}
export interface PictureMatchingGameSet extends ActivityN {
    type: "picturematchinggame";
    data: PictureItem[];
}
export interface PictureMatchingGameSetAll
    extends ActivityN {
    type: "picturematchinggame";
    data: PictureMatchingGameDataRaw;
}
type PictureItem = {
    picture: string;
    answer: string;
    translation?: string;
    transliteration?: string;
    meta?: Record<
        string,
        { value: any; canToggle?: boolean }
    >;
    ansOptions?: { key: string; label: string }[];
    nativeOptions?: string[];
};

type PictureMatchingGameDataRaw = {
    [setName: string]: PictureItem[];
};
export class PictureMatchingGameModel {
    private rawData!: PictureMatchingGameDataRaw;
    initDone: Promise<void>;
    constructor(
        filePath: string = process.env.PUBLIC_URL +
            "/data/PictureMatchingGame.yaml"
    ) {
        this.initDone = this.init(filePath);
    }
    private async init(filePath: string) {
        try {
            this.rawData = await this.loadSource(filePath);
        } catch (e) {
            console.error(e);
        }
    }
    private async loadSource(
        filePath: string
    ): Promise<PictureMatchingGameDataRaw> {
        try {
            const res = await fetchWithTimeout(filePath);
            if (!res.ok) {
                throw new Error(
                    `Failed to fetch data from ${filePath}`
                );
            }
            const raw = await res.text();
            const parsed = yaml.load(
                raw
            ) as PictureMatchingGameDataRaw;
            return parsed as PictureMatchingGameDataRaw;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    private getFirstSetName(): string {
        return Object.keys(this.rawData)[0];
    }
    private getSet(setName?: string): PictureItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.rawData[key];
    }
    getSetData(setName?: string): PictureItem[] {
        const key = setName ?? this.getFirstSetName();
        return this.getSet(key);
    }
    getAllSets(): PictureMatchingGameDataRaw {
        return this.rawData;
    }
    *getGenerator(
        setName?: string
    ): Generator<PictureItem> {
        const set = this.getSet(setName);
        for (const item of set) {
            yield item;
        }
    }
    getSingle({
        setName,
        random = false,
    }: {
        setName?: string;
        random?: boolean;
    }): PictureItem {
        const set = this.getSet(setName);
        if (random) {
            const index = Math.floor(
                Math.random() * set.length
            );
            return set[index];
        } else {
            return set[0];
        }
    }
    get typedSet(): PictureMatchingGameSet {
        return {
            type: "picturematchinggame",
            data: this.getSetData(),
        };
    }
    get typedSetAll(): PictureMatchingGameSetAll {
        return {
            type: "picturematchinggame",
            data: this.getAllSets(),
        };
    }
}

export interface AnswerOption {
    key: string;
    label: string;
}
export interface PictureMatchControllerProps {
    item: PictureItem;
    faceConfig: FaceConfig;
    ansOptions?: { key: string; label: string }[];
    onAnswer: (userAnswer: string) => void;
    onFeedBack: (msg: string) => void;
}
export function PictureMatchController({
    item,
    faceConfig,
    ansOptions,
    onAnswer,
    onFeedBack,
}: PictureMatchControllerProps) {
    const [input, setInput] = React.useState("");
    const handleSubmit = (raw: string) => {
        const userAnswer = raw.trim().toLowerCase();
        const correct = userAnswer;
        onAnswer(correct);
        if (correct) onFeedBack("Super!");
        else onFeedBack("Nallath alla!");
        setInput("");
    };

    return (
        <PictureMatch
            item={item}
            faceConfig={faceConfig}
            ansOptions={ansOptions}
            inputValue={input}
            onSubmit={handleSubmit}
            onInputChange={setInput}
        />
    );
}

export interface PictureMatchProps {
    item: PictureItem;
    faceConfig: FaceConfig;
    ansOptions?: { key: string; label: string }[];
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: (userAnswer: string) => void;
}

export function PictureMatch({
    item,
    faceConfig,
    ansOptions,
    inputValue,
    onInputChange,
    onSubmit,
}: PictureMatchProps) {
    const getFaceContent = (
        face: "question" | "answer"
    ) => {
        const keys = faceConfig[face];
        const fields: Record<string, string | undefined> = {
            piture: item.picture,
            answer: item.answer,
            translation: item.translation,
            transliteration: item.transliteration,
        };
        if (item.meta) {
            for (const [key, obj] of Object.entries(
                item.meta
            )) {
                fields[key] = obj.value;
            }
        }
        return keys.map((k) => ({
            key: k,
            value: fields[k],
        }));
    };
    const questionFace = getFaceContent("question");
    const answerFace = getFaceContent("answer");

    return (
        <div>
            <div>
                {questionFace.map((f) => (
                    <div key={f.key}>
                        <label>{f.value}</label>
                    </div>
                ))}
            </div>
            {!ansOptions ? (
                <div>
                    <input
                        value={inputValue}
                        onChange={(e) =>
                            onInputChange(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSubmit(inputValue);
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => onSubmit(inputValue)}
                    >
                        OK
                    </button>
                </div>
            ) : (
                <div>
                    {ansOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() =>
                                onSubmit(option.key)
                            }
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
            <div>
                {answerFace.map((f) => (
                    <div key={f.key}>
                        <label>{f.value}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
type PictureMatchCarouselProps = {
    item: PictureItem;
    index: number;
    total: number;
    ok: boolean;
    onNext: () => void;
    onBack: () => void;
    renderCurrent: (item: PictureItem) => React.ReactNode;
};
export function PictureMatchCarousel({
    item,
    index,
    total,
    ok,
    onNext,
    onBack,
    renderCurrent,
}: PictureMatchCarouselProps) {
    return (
        <div>
            {renderCurrent(item)}
            <div>
                {index > 0 && (
                    <button onClick={onBack}>Back</button>
                )}
                {ok && index < total - 1 && (
                    <button onClick={onNext}>Next</button>
                )}
                {ok && index === total - 1 && (
                    <div>Finished!</div>
                )}
            </div>
        </div>
    );
}
type PictureMatchCarouselControllerProps = {
    items: PictureItem[];
};
export function PictureMatchCarouselController({
    items,
}: PictureMatchCarouselControllerProps) {
    const [index, setIndex] = useState(0);
    const [ok, setOk] = useState(false);
    const item = items[index];
    const onAnswer = (ans: string) => {
        const correct =
            ans.trim().toLowerCase() ===
            item.answer.toLowerCase();
        if (!correct) setOk(false);
        setOk(true);
        return;
    };
    const onFeedback = (msg: string) => {
        console.log("feedback:", msg);
    };

    const onNext = () => {
        if (!ok) return;
        setOk(false);
        setIndex((i) => Math.min(i + 1, items.length - 1));
    };
    const onBack = () => {
        setOk(false);
        setIndex((i) => Math.max(i - 1, 0));
    };
    const [faceConfig, setFaceConfig] =
        useState<FaceConfig>({
            question: [],
            answer: [],
        });
    const handleFaceConfigChange = (cfg: FaceConfig) => {
        setFaceConfig(cfg);
    };
    const toggleOptions = useMemo(() => {
        const set = new Set<string>();
        for (const item of items) {
            set.add("picture");
            set.add("answer");
            if (item.translation) set.add("translation");
            if (item.transliteration)
                set.add("transliteration");
            if (item.meta) {
                for (const [key, obj] of Object.entries(
                    item.meta
                )) {
                    if (obj.canToggle) set.add(key);
                }
            }
        }
        return Array.from(set).map((k) => ({
            label: k,
            key: k,
            canToggle: true,
        }));
    }, [items]);
    return (
        <div>
            <ToggleBoxController
                options={toggleOptions}
                storageKey="faceConfig"
                value={faceConfig}
                onChange={handleFaceConfigChange}
            />

            <PictureMatchCarousel
                item={item}
                index={index}
                total={items.length}
                ok={ok}
                onNext={onNext}
                onBack={onBack}
                renderCurrent={(item) => (
                    <PictureMatchController
                        item={item}
                        faceConfig={faceConfig}
                        ansOptions={item.ansOptions}
                        onAnswer={onAnswer}
                        onFeedBack={onFeedback}
                    />
                )}
            />
        </div>
    );
}

export function ParentScreen({
    setName,
}: {
    setName?: string;
}) {
    const gameModel = useMemo(
        () => new PictureMatchingGameModel(),
        []
    );
    const [items, setItems] = useState<
        PictureItem[] | null
    >(null);

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            await gameModel.initDone;
            const data = gameModel.getSetData(setName);
            if (isMounted) setItems(data);
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [gameModel, setName]);

    return (
        <div>
            {!items ? (
                <div>Loading...</div>
            ) : (
                <PictureMatchCarouselController
                    items={items}
                />
            )}
        </div>
    );
}
