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
    text: "The smell hits me first—rotting meat and sharp chemicals. I see Arul waiting. His hands are stained a permanent, metallic grey."
    speakerName: "Journalist (Player)"
    speakerRole: "Narrator"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "Arul, thank you for meeting me. Why stay in this industry?"
        next: why_stay
      - text: "The air here is thick. How long has your community been here?"
        next: history

  why_stay:
    id: why_stay
    text: "Because my father’s father did this. It is our craft, our caste. We were always 'outside,' but we were farmers once. We grew rice in these fields."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "What happened to the rice fields?"
        next: environmental_cost
      - text: "Is the pay worth the loss of the land?"
        next: wages_debt

  history:
    id: history
    text: "For hundreds of years, we were forced downstream to scrape flesh from skin. We thought Independence would bring freedom. We farmed this land for 80 years before the tanneries took the water."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "How did the water change?"
        next: environmental_cost
      - text: "Do the Western companies know about this history?"
        next: fake_audits

  environmental_cost:
    id: environmental_cost
    text: "The factory takes the water and gives back poison. The well water tastes like the sea—salty and bitter. The fish died years ago. Nothing lives in this soil now."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "The companies claim they use treatment plants."
        next: fake_audits
      - text: "I can see the salt crust on the ground. It looks like snow."
        next: health_risks

  fake_audits:
    id: fake_audits
    text: "They have machines, but they only turn them on for 'Auditors.' We get a bell warning. We hide the truth, and the inspector leaves with a handshake. By night, the waste is in the forest."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "What about your health? That cough is persistent."
        next: health_risks
      - text: "If the audits are fake, the brands are complicit."
        next: wages_debt

  health_risks:
    id: health_risks
    text: "My children have asthma. The chemicals eat our pores. Some men die cleaning the septic sludge by hand for a few extra rupees. We see pink water and we know it's death."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "This exploitation must end. Should these factories close?"
        next: the_dilemma
      - text: "I need to show the world your hands, Arul."
        next: wages_debt

  wages_debt:
    id: wages_debt
    text: "I have never seen the $130 minimum wage. We live hand-to-mouth. One hide makes shoes worth hundreds of dollars, but we can't afford a bucket of clean water to cook."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "The math of greed is impossible to ignore."
        next: the_dilemma
      - text: "If I publish this, things will change. Are you ready?"
        next: the_dilemma

  the_dilemma:
    id: the_dilemma
    text: "If you shut them, we starve. If you keep them like this, we die slowly. We want to be leatherworkers—but we want to own our lives and our land again."
    speakerName: "Arul"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "Demand reform: Force the brands to pay for cleanup and fair wages."
        next: reform_ending
      - text: "Expose the horror: Push for a total boycott of the region's leather."
        next: shutdown_ending

  reform_ending:
    id: reform_ending
    text: "Global pressure forces real audits. Arul finally gets safety gear, and though the land is still salty, the air begins to clear. The struggle for ownership begins."
    speakerName: "Journalist (Player)"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "It's a small victory for the community."
        next: final_screen
      - text: "The fight for the land continues."
        next: final_screen

  shutdown_ending:
    id: shutdown_ending
    text: "The brands flee to avoid the scandal. Arul and his family are forced to move to a cramped city slum, seeking work in the shadows."
    speakerName: "Journalist (Player)"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "The silence is broken, but the cost was high."
        next: final_screen
      - text: "The cycle of displacement repeats."
        next: final_screen

  final_screen:
    id: final_screen
    text: "Most leather goods you wear today are still made by hands that will never afford them. THE END."
    speakerName: "Narrator"
    speakerImage: "/images/dalithistorymonth/tannery-worker.png"
    speakerBg: "/images/dalithistorymonth/tannery.png"
    choices:
      - text: "Restart Story"
        next: intro
      - text: "Exit"
        next: intro

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
