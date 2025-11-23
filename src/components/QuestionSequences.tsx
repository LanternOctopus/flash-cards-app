import React, { FC, useState, useEffect } from "react";
import ShowFeedback from "./ShowFeedback";
import ActivityControllerSequence from "../controllers/ActivityControllerSequence";
import FlashcardViewSequence from "../views/FlashcardViewSequence";
import LoadingError from "../views/LoadingError";

const viewMap = {
  flashcard: FlashcardViewSequence,
};

const Sequence: FC = () => {
  const [activityIndex, setActivityIndex] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<any>(null);

  // NEW: challenge-level state
  const [challenges, setChallenges] = useState<any[]>([]);
  const [challengeIndex, setChallengeIndex] = useState(0);

  const [success, setSuccess] = useState<boolean | null>(null);

  const controller = ActivityControllerSequence;

  // ---------------------------------------------------
  // Load activity + reset challenge state
  // ---------------------------------------------------
  useEffect(() => {
    const activity = controller.getActivity(activityIndex);
    setCurrentActivity(activity);

    if (activity?.data?.challenges) {
      setChallenges(activity.data.challenges);
      setChallengeIndex(0); // reset challenge index for new activity
    }
  }, [activityIndex]);

  const currentChallenge =
    challenges.length > 0 ? challenges[challengeIndex] : null;

  if (!currentActivity) return <div>Loading activity...</div>;

  const ViewComponent =
    viewMap[currentActivity.activityType as keyof typeof viewMap] ||
    LoadingError;

  // ---------------------------------------------------
  // NEXT button logic — challenge → activity → game end
  // ---------------------------------------------------
  const handleNextChallenge = () => {
    if (challengeIndex + 1 < challenges.length) {
      // Go to next challenge inside the activity
      setChallengeIndex(challengeIndex + 1);
    } else {
      // Move to next activity
      if (activityIndex + 1 < controller.activities.length) {
        setActivityIndex(activityIndex + 1);
      } else {
        console.log("Game ended!");
      }
    }

    // reset feedback
    setSuccess(null);
  };

  return (
    <div>
      <ViewComponent
        data={currentChallenge}          // <— pass the active challenge
        updateSuccess={setSuccess}           // Flashcard calls this on success
      />

      {success !== null && (
        <ShowFeedback
          success={success}
          handleNext={handleNextChallenge}   // <— moves challenge → activity → end
          learningHint={currentActivity.data.learningHint}
        />
      )}
    </div>
  );
};

export default Sequence;
