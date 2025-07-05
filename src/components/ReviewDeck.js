import React, { useState, useEffect } from 'react';
import QuestionView from './QuestionView';

const ReviewDeck = ({ questions, incorrectlyAnsweredQuestions, onAnswerResult, onBackToQuiz }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviewQuestions = questions.filter(q => incorrectlyAnsweredQuestions.includes(q.id));

  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [incorrectlyAnsweredQuestions]);

  if (reviewQuestions.length === 0) {
    return (
      <div className="review-deck-container">
        <h2>No questions to review!</h2>
        <button onClick={onBackToQuiz}>Back to Quiz</button>
      </div>
    );
  }

  const handleNextReview = () => {
    setCurrentReviewIndex(prevIndex => Math.min(prevIndex + 1, reviewQuestions.length - 1));
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="review-deck-container">
      <h2>Review Deck ({currentReviewIndex + 1} / {reviewQuestions.length})</h2>
      <QuestionView
        question={reviewQuestions[currentReviewIndex]}
        onAnswerResult={onAnswerResult}
      />
      <div className="navigation">
        <button onClick={handlePreviousReview} disabled={currentReviewIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextReview} disabled={currentReviewIndex === reviewQuestions.length - 1}>
          Next
        </button>
        <button onClick={onBackToQuiz}>Back to Quiz</button>
      </div>
    </div>
  );
};

export default ReviewDeck;
