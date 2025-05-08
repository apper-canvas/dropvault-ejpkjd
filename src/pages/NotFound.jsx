import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  // Define all icons at the top
  const AlertCircleIcon = getIcon('AlertCircle');
  const HomeIcon = getIcon('Home');

  return (
    <motion.div 
      className="h-full flex flex-col items-center justify-center p-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
      >
        <div className="w-24 h-24 mx-auto bg-surface-200 dark:bg-surface-700 rounded-full flex items-center justify-center mb-6">
          <AlertCircleIcon className="w-12 h-12 text-surface-600 dark:text-surface-300" />
        </div>
      </motion.div>
      
      <motion.h1 
        className="text-5xl md:text-6xl font-bold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        404
      </motion.h1>
      
      <motion.h2 
        className="text-2xl md:text-3xl font-semibold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        className="text-lg mb-8 max-w-md mx-auto text-surface-600 dark:text-surface-300"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center btn bg-primary hover:bg-primary-dark focus:ring-primary text-white"
        >
          <HomeIcon className="mr-2 w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-surface-500 dark:text-surface-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        <button className="text-sm text-primary hover:underline">
          Go back to My Files
        </button>
        </p>
      </motion.div>
    </motion.div>
  );
}