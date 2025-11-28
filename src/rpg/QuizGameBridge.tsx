import { useState, useEffect, useRef } from "react";
import { ScramblerController } from "../controllers/ScramblerController";
import ScramblerView from "../views/ScramblerView";
import Modal from "../components/Modal";
export default function QuizGameBridge() {
  const iframeRef = useRef<any>(null);
  const [Interaction, setCurrentQuiz] = useState<any>(null);
  const controllersRef = useRef({
   'scrambler': new ScramblerController().getActivities()
})
  useEffect(() => {
    const handleMessage = (event:any) => {
      event.preventDefault();
      const { interactionType, interactionId } = event.data;
      if (!interactionType) return;
      if (Interaction) return;
      switch (interactionType) {
        case "scrambler":
            setCurrentQuiz(()=>()=>{
                return <ScramblerView data={controllersRef.current.scrambler.next().value.data} updateSuccess={handleQuizComplete}/> 
      })
            break;
        default:
            break;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  function handleQuizComplete(result:any){
    if(result === null) return;
     if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ score: result }, "*");
    }
    // Unmount the quiz
    setCurrentQuiz(null);
  }
  return (
    <div>
      <iframe
        ref={iframeRef}
        src={"http://localhost:5173/"}
        style={{ width: "90%", height: "80vh", margin: "0 auto" }}
      />
      {Interaction && <Modal isOpen={true} onClose={()=>setCurrentQuiz(null)} title="Quiz Game">
        {Interaction()}
      </Modal>}
    </div>
  );
}
