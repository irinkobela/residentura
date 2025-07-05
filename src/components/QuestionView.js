import React, { useState, useEffect } from 'react';

function QuestionView({ question, onAnswerResult }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // კითხვის შეცვლისას კომპონენტის მდგომარეობის განულება
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowExplanation(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    // პასუხის დაფიქსირება პირველივე კლიკზე
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    // Report answer result to parent
    if (onAnswerResult) {
      onAnswerResult(question.id, answer.isCorrect);
    }
  };

  const getButtonClassName = (answer) => {
    if (!isAnswered) {
      return "answer-button"; // საწყისი მდგომარეობა
    }

    const isCorrect = answer.isCorrect;
    const isSelected = selectedAnswer === answer;

    if (isCorrect) {
      return "answer-button correct"; // სწორი პასუხი ყოველთვის მწვანეა
    }
    if (isSelected && !isCorrect) {
      return "answer-button incorrect"; // არჩეული არასწორი პასუხი წითელია
    }
    return "answer-button disabled"; // სხვა არასწორი პასუხები
  };

  return (
    <div className="question-card" onClick={() => setShowExplanation(true)}>
      <h2 className="question-text">{question.question}</h2>
      <div className="answers-container">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={getButtonClassName(answer)}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
          >
            {answer.text}
          </button>
        ))}
      </div>
      
      {/* ახსნის ჩვენების სექცია */}
      {isAnswered && (
        <div className="explanation-section">
          <button className="explanation-toggle" onClick={(e) => {
            e.stopPropagation(); // ხელს უშლის ბარათზე კლიკის გამოწვევას
            setShowExplanation(!showExplanation)}
          }>
            {showExplanation ? 'ახსნის დამალვა' : 'ახსნის ჩვენება'}
          </button>
          {showExplanation && (
            <p className="explanation-text">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionView;