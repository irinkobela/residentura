import React, { useContext, useState } from 'react';
import { QuestionProvider, QuestionContext } from './contexts/QuestionContext';
import QuestionView from './components/QuestionView';
import './App.css';

const App = () => {
  const { questions } = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.max(prevIndex - 1, 0)
    );
  };

  const handleStartQuiz = () => {
    setShowWelcomeScreen(false);
  };

  if (showWelcomeScreen) {
    return (
      <div className="welcome-screen">
        <h1>კეთილი იყოს თქვენი მობრძანება რეზიდენტურის ტესტებში!</h1>
        <p>მოემზადეთ თქვენი ცოდნის შესამოწმებლად.</p>
        <button onClick={handleStartQuiz}>დაწყება</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>კითხვები იტვირთება...</div>;
  }

  return (
    <div className="app-container">
      <div className="progress-tracker">
        კითხვა {currentQuestionIndex + 1} / {questions.length}
      </div>

      <QuestionView question={questions[currentQuestionIndex]} />

      <div className="navigation">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          წინა
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          შემდეგი
        </button>
      </div>
    </div>
  );
};

const Root = () => (
  <QuestionProvider>
    <App />
  </QuestionProvider>
);

export default Root;