import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import getIcon from './utils/iconUtils';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Create icon components
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');

  return (
    <div className="relative min-h-screen">
      {/* Dark Mode Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleDarkMode}
        className="fixed z-20 bottom-4 right-4 p-3 rounded-full bg-surface-200 dark:bg-surface-700 
                  shadow-md dark:shadow-neu-dark hover:bg-surface-300 dark:hover:bg-surface-600 
                  transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? 
          <SunIcon className="w-5 h-5 text-yellow-400" /> : 
          <MoonIcon className="w-5 h-5 text-surface-700" />
        }
      </motion.button>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-md"
        className="mt-16 md:mt-20"
      />
    </div>
  );
}

export default App;