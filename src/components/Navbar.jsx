import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 mb-8">
      <motion.h1
        className="text-2xl font-bold text-primary-light dark:text-primary-dark drop-shadow-lg"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        IQ MindSprint
      </motion.h1>
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-secondary flex items-center gap-2 shadow-lg"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <span role="img" aria-label="Light mode">🌞</span>
        ) : (
          <span role="img" aria-label="Dark mode">🌙</span>
        )}
        <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
      </motion.button>
    </nav>
  );
};

export default Navbar; 