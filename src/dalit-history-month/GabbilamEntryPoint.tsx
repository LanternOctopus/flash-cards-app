import "./dalit-history-month.css";
import { ParentScreen } from "../activities/ParentScreen";
import { GabbilamModel } from "./GabbilamModel";
import { Gabbilam } from "./Gabbilam";
import { globalGetimageURL } from "../utils/utils";
import TinyFooter from "../components/TinyFooter";
const GabbilamEntryPoint = () => {
    return (
        <>
            <div style={{ paddingBottom: "5em" }}>
                <Wrapper>
                    <div className="gabbilam-header">
                        <img
                            src="/images/dalithistorymonth/bat.svg"
                            alt=""
                            style={{ marginTop: "1em" }}
                        />
                        <h1>Gabbilamu</h1>
                        <div>
                            <h3>Author: Gurramu Jeshuva</h3>
                            <h4>
                                Translated from Telugu by
                                Chinnaiah Jangam
                            </h4>
                        </div>
                    </div>
                    <hr />

                    <ParentScreen
                        itemPath="dalithistorymonth/gabbilamreadingcomprehension.yaml"
                        configPath="config/flashcardsconfig.yaml"
                        storageKey="gabbilamu"
                        modelClass={GabbilamModel}
                    >
                        <Gabbilam />
                    </ParentScreen>
                    <hr />
                    <h5>About the Translator</h5>
                    <p>
                        Chinnaiah Jangam is a historian and
                        Associate Professor at Carleton
                        University, specializing in the
                        intellectual and social history of
                        South Asia, particularly Dalit
                        history and anti-caste movements.
                    </p>
                    <p>
                        His translation of Gabbilam is
                        highly regarded for:
                    </p>
                    <ul>
                        <li>
                            Contextual Depth: He provides an
                            extensive historical
                            introduction that situates
                            Jashuva’s work within the global
                            context of anti-colonialism and
                            domestic anti-caste struggles.
                        </li>
                        <li>
                            Preserving Subversive Power:
                            Jangam’s work carefully
                            maintains the "twisted sarcasm"
                            and sharp social critique
                            Jashuva used to challenge the
                            brahminical hegemony of the
                            1940s.
                        </li>
                        <li>
                            Scholarly Rigor: By adding
                            detailed footnotes, he makes the
                            specific cultural and religious
                            references of Andhra accessible
                            to a global audience without
                            stripping them of their original
                            weight.
                        </li>
                    </ul>
                    <p>
                        His contribution is vital in
                        bringing one of the most significant
                        works of 20th-century Telugu
                        literature to the English-speaking
                        world, framing the "Bat" not just as
                        a messenger to God, but as a
                        profound symbol of the Dalit
                        experience
                    </p>
                </Wrapper>
            </div>

            <TinyFooter />
        </>
    );
};

export default GabbilamEntryPoint;
type WrapperProps = {
    children: React.ReactNode;
    className?: string;
};

export function Wrapper({ children }: any) {
    return <div className="wrapper">{children}</div>;
}
