import { FC, useState, useRef } from "react";
import ShowFeedback from "./ShowFeedback";
import PartofSpeechView from "../views/PartofSpeechView";
import LoadingError from "../views/LoadingError";
import { PartsofSpeechController } from "../controllers/PartOfSpeechController";

const viewMap = {
  partsofspeech: PartofSpeechView,
};

const PartsOfSpeech: FC = () => {
  const controller = useRef(new PartsofSpeechController());
  const generator = useRef(controller.current.getActivities());
  
  const [currentActivity, setCurrentActivity] = useState(() => {
    const first = generator.current.next();
    return first.done ? null : first.value;
  });
  
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleNext = () => {
    const next = generator.current.next();
    if (!next.done) {
      setCurrentActivity(next.value);
      setSuccess(null);
    }
  };

  if (!currentActivity) return <div>Loading activity...</div>;

  const ViewComponent = viewMap[currentActivity.type as keyof typeof viewMap] || LoadingError;

  return (
    <div>
      <ViewComponent
        data={currentActivity.data}
        updateSuccess={setSuccess}
      />

      {success !== null && (
        <ShowFeedback
          success={success}
          handleNext={handleNext}
          learningHint={currentActivity.data.learningHint}
        />
      )}
    </div>
  );
};

export default PartsOfSpeech;
