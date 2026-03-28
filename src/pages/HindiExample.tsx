import { ParentScreen } from "../activities/ParentScreen";
import { PictureMatch } from "../activities/PictureMatchingGame";
import { PictureMatchingGameModel } from "../activities/PictureMatchingGameModel";

const HindiExample: React.FC = () => {
    return (
        <ParentScreen
            itemPath="verbs/vocabularyPicturematchinggamehindi.yaml"
            configPath="config/PictureMatchingGameConfig.yaml"
            storageKey="hindi"
            modelClass={PictureMatchingGameModel}
        >
            <PictureMatch />
        </ParentScreen>
    );
};

export default HindiExample;
