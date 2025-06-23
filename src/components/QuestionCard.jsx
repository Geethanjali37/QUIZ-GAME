import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card w-full max-w-2xl mx-auto"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">{question}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-left p-4 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-primary-light dark:hover:border-primary-dark rounded-lg transition-all bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-text-light dark:text-text-dark hover:bg-primary-light/5 dark:hover:bg-primary-dark/5"
            onClick={() => onAnswer(index)}
          >
            <span className="font-medium">{option}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default QuestionCard; 