import React, { FC, useState, useEffect } from "react";
import ShowFeedback from "./ShowFeedback";
import TypingView from "../views/TypingView";
import ActivityController from "../controllers/ActivityController";
import PartofSpeechView from "../views/PartofSpeechView";
import FlashcardView from "../views/FlashcardView";
import LoadingError from "../views/LoadingError";
const viewMap = {
  partsofspeech: PartofSpeechView,
  typing: TypingView,
  flashcard: FlashcardView,
};

const Game: FC = () => {
  const [activityIndex, setActivityIndex] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const controller = ActivityController;

  useEffect(() => {
    setCurrentActivity(controller.getActivity(activityIndex));
  }, [activityIndex, controller]);

  const handleNext = () => {
    if (activityIndex + 1 < controller.activities.length) {
      setActivityIndex(activityIndex + 1);
    } else {
      console.log("Game ended!");
    }
    setSuccess(null);
  };


  if (!currentActivity) return <div>Loading activity...</div>;

  const ViewComponent =   viewMap[currentActivity.activityType as keyof typeof viewMap] || LoadingError;
  console.log(ViewComponent)
  console.log(currentActivity)
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
          learningHint = {currentActivity.data.learningHint}
        />
      )}
    </div>
  );
};

export default Game;
