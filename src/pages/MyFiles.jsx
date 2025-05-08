import { motion } from 'framer-motion';
import MyFilesManager from '../components/MyFilesManager';

export default function MyFiles() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-7xl mx-auto"
    >
      <h1 className="text-2xl font-bold mb-6 text-surface-800 dark:text-surface-100">
        My Files
      </h1>
      <MyFilesManager />
    </motion.div>
  );
}