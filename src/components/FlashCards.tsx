import { FC, useState, useEffect } from "react";
import ShowFeedback from "./ShowFeedback";
import FlashcardView from "../views/FlashcardView";
import LoadingError from "../views/LoadingError";
import { FlashcardController } from "../controllers/FlashCardController";

const viewMap = {
  flashcard: FlashcardView,
};

const FlashCards: FC = () => {
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const controller = new FlashcardController()
  
  const [generator, setGenerator] = useState<Generator<any, any, unknown> | null>(null);
  useEffect(() => {
   const gen = controller.getActivities();
   setGenerator(gen);
   const first = gen.next();
   if(!first.done) setCurrentActivity(first.value);
  }, []);

  const handleNext = () => {
    if(!generator) return;
    const next = generator.next();
    if(!next.done){
      setCurrentActivity(next.value);
      setSuccess(null);
    }
  };


  if (!currentActivity) return <div>Loading activity...</div>;
  const ViewComponent =   viewMap[currentActivity.type as keyof typeof viewMap] || LoadingError;

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

export default FlashCards;
