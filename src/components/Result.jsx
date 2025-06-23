import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Result = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a genius! 🎯";
    if (percentage >= 70) return "Great job! Your logic is sharp! 🌟";
    if (percentage >= 50) return "Good effort! Keep practicing! 💪";
    return "Don't give up! Try again! 🔄";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card w-full max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center"
      >
        <span className="text-4xl font-bold text-primary-light dark:text-primary-dark">{percentage}%</span>
      </motion.div>

      <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">{getMessage()}</h2>
      
      <div className="mb-8">
        <p className="text-text-light/80 dark:text-text-dark/80">
          You scored <span className="font-semibold text-primary-light dark:text-primary-dark">{score}</span> out of{" "}
          <span className="font-semibold text-primary-light dark:text-primary-dark">{totalQuestions}</span> questions
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-primary w-full"
        onClick={onRestart}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Result; 