import React, { useContext, useState, useEffect } from 'react';
import { QuestionProvider, QuestionContext } from './contexts/QuestionContext';
import QuestionView from './components/QuestionView';
import Settings from './components/Settings';
import ReviewDeck from './components/ReviewDeck';
import TagFilter from './components/TagFilter';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const { questions } = useContext(QuestionContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [incorrectlyAnsweredQuestions, setIncorrectlyAnsweredQuestions] = useLocalStorage('incorrectlyAnsweredQuestions', []);
  const [isReviewMode, setIsReviewMode] = useState(false);

  const allTags = Array.from(new Set(questions.flatMap(q => q.tags || [])));

  const filteredQuestions = isReviewMode
    ? questions.filter(q => incorrectlyAnsweredQuestions.includes(q.id))
    : questions.filter(question => {
        const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 || (question.tags && question.tags.some(tag => selectedTags.includes(tag)));
        return matchesSearch && matchesTags;
      });

  const handleNext = () => {
    setCurrentQuestionIndex(prev => Math.min(prev + 1, filteredQuestions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
  };

  const handleStartQuiz = () => {
    setShowWelcomeScreen(false);
  };

  const handleAnswerResult = (questionId, isCorrect) => {
    setIncorrectlyAnsweredQuestions(prev => {
      if (!isCorrect && !prev.includes(questionId)) return [...prev, questionId];
      if (isCorrect) return prev.filter(id => id !== questionId);
      return prev;
    });
  };

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [searchQuery, selectedTags, isReviewMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showWelcomeScreen || showSettings) return;

      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 's':
          setShowSettings(prev => !prev);
          break;
        case 'r':
          setIsReviewMode(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWelcomeScreen, showSettings, isReviewMode, filteredQuestions]);

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
       <QuestionProvider>
      <div className="header">
        <div className="progress-tracker">
          კითხვა {currentQuestionIndex + 1} / {filteredQuestions.length}
        </div>
        <button className="settings-button" onClick={() => setShowSettings(true)}>
          ⚙️
        </button>
      </div>

      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onTagChange={setSelectedTags}
      />

      <div className="mode-toggle">
        <button onClick={() => setIsReviewMode(false)} disabled={!isReviewMode}>
          Quiz Mode
        </button>
        <button
          onClick={() => setIsReviewMode(true)}
          disabled={isReviewMode || incorrectlyAnsweredQuestions.length === 0}
        >
          Review Mode ({incorrectlyAnsweredQuestions.length})
        </button>
      </div>

      {filteredQuestions.length > 0 ? (
        isReviewMode ? (
          <ReviewDeck
            questions={filteredQuestions}
            onAnswerResult={handleAnswerResult}
            onBackToQuiz={() => setIsReviewMode(false)}
          />
        ) : (
          <QuestionView
            question={filteredQuestions[currentQuestionIndex]}
            onAnswerResult={handleAnswerResult}
          />
        )
      ) : (
        <p>შედეგი არ მოიძებნა.</p>
      )}

      {!isReviewMode && filteredQuestions.length > 0 && (
        <div className="navigation">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            წინა
          </button>
          <button onClick={handleNext} disabled={currentQuestionIndex === filteredQuestions.length - 1}>
            შემდეგი
          </button>
        </div>
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      </QuestionProvider>
    </div>
  );
};

export default App;
