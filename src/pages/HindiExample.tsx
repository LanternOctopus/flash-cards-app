import { ParentScreen } from "../activities/ParentScreen";
import { PictureMatch } from "../activities/PictureMatchingGame";
import { PictureMatchingGameModel } from "../activities/PictureMatchingGameModel";

const HindiExample: React.FC = () => {
    return (
        <ParentScreen
            itemPath="Picturematchinggamehindi.yaml"
            configPath="PictureMatchingGameConfig.yaml"
            storageKey="hindi"
            modelClass={PictureMatchingGameModel}
        >
            <PictureMatch />
        </ParentScreen>
    );
};

export default HindiExample;
