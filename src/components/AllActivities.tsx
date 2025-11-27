import { FC, useState, useEffect } from "react";
import ShowFeedback from "./ShowFeedback";
import TypingView from "../views/TypingView";
import PartofSpeechView from "../views/PartofSpeechView";
import FlashcardView from "../views/FlashcardView";
import LoadingError from "../views/LoadingError";
import { FlashcardController } from "../controllers/FlashCardController";
import { TypingController } from "../controllers/TypingController";
import { PartsofSpeechController } from "../controllers/PartOfSpeechController";
const viewMap = {
  partsofspeech: PartofSpeechView,
  typing: TypingView,
  flashcard: FlashcardView,
};

const AllActivities: FC = () => {
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const controllers = [
    new FlashcardController(),
    new TypingController(),
    new PartsofSpeechController()
  ]
  const [currentControllerIndex, setCurrentControllerIndex]= useState(0);
  const [generator, setGenerator] = useState<Generator<any, any, unknown> | null>(null);
  useEffect(() => {
   const gen = controllers[currentControllerIndex].getActivities();
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
    
      const nextIndex = (currentControllerIndex +1)%controllers.length;
      setCurrentControllerIndex(nextIndex);
      const nextGen = controllers[nextIndex].getActivities();
      setGenerator(nextGen);
      const first= nextGen.next();
      if(!first.done) setCurrentActivity(first.value);
      setSuccess(null)
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
        />
      )}
    </div>
  );
};

export default AllActivities;
