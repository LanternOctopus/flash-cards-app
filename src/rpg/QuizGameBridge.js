import { useState, useEffect, useRef } from "react";

export default function QuizGameBridge() {
  const iframeRef = useRef(null);
  const [Interaction, setInteraction] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("message received");
      event.preventDefault();
      const { interactionType, interactionId } = event.data;
      if (!interactionType) return;
      setInteraction(interactionType);
      console.log(interactionType);
      console.log(interactionId);
      iframeRef.current.contentWindow.postMessage(
        { type: "interactionResult", success: true, score: 8 },
        "*"
      );
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <div>
      <iframe
        ref={iframeRef}
        src={"http://localhost:5173/"}
        style={{ width: "90%", height: "80vh", margin: "0 auto" }}
      />
    </div>
  );
}
