import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionProvider, QuestionContext } from './contexts/QuestionContext';
import Question from './components/Question';
import './App.css';

const App = () => {
  const { questions } = useContext(QuestionContext);
  const { t } = useTranslation();

  return (
    <div className="App">
      {questions.length > 0 ? (
        <Question question={questions[0]} />
      ) : (
        <p>{t('loading_questions')}</p>
      )}
    </div>
  );
};

const Root = () => (
  <QuestionProvider>
    <App />
  </QuestionProvider>
);

export default Root;
