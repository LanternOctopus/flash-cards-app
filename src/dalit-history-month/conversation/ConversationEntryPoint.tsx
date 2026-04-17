import YAML from "yaml";
import { CoreGraph } from "./GraphModel";
import ConversationView from "./View";
import { AudioProvider } from "../../providers/AudioProvider";
import { TapToStart } from "../../utils/TapToStart";
export function parseYamlToGraph(
    yamlString: string,
): CoreGraph {
    const data = YAML.parse(yamlString);

    return data; // no validation (just like you wanted)
}

const yaml = `
start: intro

nodes:
    intro:
        id: intro
        text: "Hey. You showed up."
        speakerName: "Gabbilamu"
        speakerRole: "Mascot"
        speakerImage: "/images/dalithistorymonth/tannery-worker.png"
        speakerBg: "/images/dalithistorymonth/tannery.png"
        audio: "english/q_queen.mp3"
        choices:
            - text: "Hi"
              next: greet
            - text: "Ignore"
              next: ignore

    greet:
        id: greet
        text: "Good girl. I was waiting."
        speakerName: "Gabbilamu"
        choices:
            - text: "What now?"
              next: question

    ignore:
        id: ignore
        text: "...you're mean."
        speakerName: "Gabbilamu"
        choices:
            - text: "Fine, sorry"
              next: greet

    question:
        id: question
        text: "What is 2 + 2?"
        speakerName: "Gabbilamu"
        choices:
            - text: "4"
              next: correct
            - text: "5"
              next: wrong

    correct:
        id: correct
        text: "That's right. Knew you had it in you."
        speakerName: "Gabbilamu"

    wrong:
        id: wrong
        text: "No. Try again."
        speakerName: "Gabbilamu"
        choices:
            - text: "Retry"
              next: question

`;

const graph = parseYamlToGraph(yaml);

export default function ConversationEntryPoint() {
    return (
        <AudioProvider>
            <TapToStart />
            <ConversationView graph={graph} />
        </AudioProvider>
    );
}
