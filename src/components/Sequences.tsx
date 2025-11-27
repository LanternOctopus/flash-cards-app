import { FC, useState, useEffect } from "react";
import ShowFeedback from "./ShowFeedback";
import FlashcardView from "../views/FlashcardView";
import LoadingError from "../views/LoadingError";
import { BaseChallenge } from "../types";
import { SequenceController } from "../controllers/SequenceController";

const Sequences: FC = () => {
  const [currentActivity, setCurrentActivity] = useState<BaseChallenge | null>(
    null
  );
  const [success, setSuccess] = useState<boolean | null>(null);
  const [controller] = useState(() => new SequenceController());

  const [outerGenerator, setOuterGenerator] = useState<Generator<
    Generator<BaseChallenge>,
    any,
    unknown
  > | null>(null);
  const [innerGenerator, setInnerGenerator] = useState<Generator<
    BaseChallenge,
    any,
    unknown
  > | null>(null);
  useEffect(() => {
    
    const newOuterGen = controller.getActivities();
    setOuterGenerator(newOuterGen);
    const outerGenResult = newOuterGen.next();
    if (outerGenResult.done) return;
console.log('am i running a lot?')
console.log(outerGenResult.value)
    const newInnerGen = outerGenResult.value;
    setInnerGenerator(newInnerGen);
    const innerGenResult = newInnerGen.next();
    console.log(innerGenResult.value)
    if (innerGenResult.done) return;
    console.log(innerGenResult.value)

    setCurrentActivity(innerGenResult.value);
  }, []);

  const handleNext = () => {
    if (!outerGenerator || !innerGenerator) return;
    const innerNextResult = innerGenerator.next();
    if (!innerNextResult.done) {
      setCurrentActivity(innerNextResult.value);
      setSuccess(null);
      return;
    }
    const outerNextResult = outerGenerator.next();
    if (!outerNextResult.done) {
      const newInnerGenerator = outerNextResult.value;
      setInnerGenerator(newInnerGenerator);
      const firstActivityResult = newInnerGenerator.next();
      if (!firstActivityResult.done) {
        setCurrentActivity(firstActivityResult.value);
        setSuccess(null);
      }
    } else {
      setCurrentActivity(null);
      setInnerGenerator(null);
    }
  };
//   if(outerGenerator?.next().done)return <div>All sequences done!</div>;
  if (!currentActivity) return <div>Loading activity...</div>;
  return (
    <div>
      <FlashcardView data={currentActivity} updateSuccess={setSuccess} />

      {success !== null && (
        <ShowFeedback success={success} handleNext={handleNext} />
      )}
    </div>
  );
};
export default Sequences;