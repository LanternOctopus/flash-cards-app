import React from 'react';

interface ShowFeedbackProps {
    success: boolean;
    handleNext: () => void;
    learningHint: string; 
}

const ShowFeedback: React.FC<ShowFeedbackProps> = ({ success, handleNext, learningHint }) => {
    const images = {
        success: '../correct.png',
        fail: '../wrong.png',
    };
    return (
        <div className="feedback-container" style={{ display: 'flex', gap: '20px', padding: '20px', alignItems: 'center' }}>
            <div className="feedback-image" style={{ flex: '0 0 auto' }}>
                <img src={success ? images.success : images.fail} alt="Feedback" style={{ maxWidth: '200px', height: 'auto' }} />
            </div>
            <div className="feedback-text" style={{ flex: 1, padding: '10px' }}>
                <p>
                    {success ? 
                        learningHint ? learningHint : "Wow, you rock!" 
                        : 
                        learningHint ? learningHint : "Try again"
                    }
                </p>
            </div>
            <button onClick={()=>handleNext()}>Next →</button>
        </div>
    );
};

export default ShowFeedback;