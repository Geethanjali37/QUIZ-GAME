import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { shuffle } from 'lodash';
import Navbar from './components/Navbar';
import QuestionCard from './components/QuestionCard';
import Result from './components/Result';
import NetworkBackground from './components/NetworkBackground';
import { questions as originalQuestions } from './data/questions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('highScore')) || 0
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

  // Initialize game with shuffled questions
  const startGame = () => {
    setQuestions(shuffle(originalQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
  };

  // Handle answer selection
  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore((prev) => prev + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error('Wrong answer! 😔');
    }

    // Show explanation
    toast(currentQuestion.explanation, {
      duration: 4000,
      icon: '💡',
    });

    // Move to next question or end game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      endGame();
    }
  };

  // End game and update high score
  const endGame = () => {
    setGameState('finished');
    const finalScore = score + (questions[currentQuestionIndex].correctAnswer === currentQuestionIndex ? 1 : 0);
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('highScore', finalScore.toString());
      toast.success('New High Score! 🏆');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <NetworkBackground />
      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 py-8">
          <Toaster position="top-center" />
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -40 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="card text-center mt-10"
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Welcome to IQ MindSprint!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Test your logical thinking with our brain-teasing questions.<br />
                  {highScore > 0 && (
                    <span className="block mt-2 text-primary dark:text-secondary">Your high score is {highScore}/{originalQuestions.length}!</span>
                  )}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  onClick={startGame}
                >
                  Start Quiz
                </motion.button>
              </motion.div>
            )}

            {gameState === 'playing' && questions[currentQuestionIndex] && (
              <QuestionCard
                key={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            )}

            {gameState === 'finished' && (
              <Result
                key="result"
                score={score}
                totalQuestions={questions.length}
                onRestart={startGame}
              />
            )}
          </AnimatePresence>

          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600 dark:text-gray-300">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                <motion.div
                  className="bg-primary dark:bg-secondary h-2 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
