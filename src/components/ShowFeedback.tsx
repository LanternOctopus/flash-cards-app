import React from 'react';
import "./ShowFeedback.css";

interface ShowFeedbackProps {
    success: boolean;
    handleNext: () => void;
    LearningHint?: any;
}

const ShowFeedback: React.FC<ShowFeedbackProps> = ({ success, handleNext, LearningHint }) => {
    const images = {
        success: process.env.PUBLIC_URL+'/correct.png',
        fail: process.env.PUBLIC_URL+'/wrong.png',
    };
    return (
<div className="feedback-container">
  <div className="feedback-image">
    <img
      src={success ? images.success : images.fail}
      alt="Feedback"
      className={success ? "success-glow" : "fail-glow"}
    />
  </div>

  <div className={`feedback-text ${success ? "success" : "fail"}`}>
    {success
      ?  "Wow, you rock! ⭐"
      : "Try again! You’ve got this."}
      {LearningHint && <div className="learning-hint"><LearningHint/></div>}
  </div>

  <button className="feedback-next-btn" onClick={() => handleNext()}>
    Next →
  </button>
</div>
    );
};

export default ShowFeedback;