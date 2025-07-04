import React from 'react';

const Question = ({ question }) => {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button key={index}>{answer.text}</button>
        ))}
      </div>
    </div>
  );
};

export default Question;
