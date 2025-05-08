import { motion } from 'framer-motion';
import { useState } from 'react';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

export default function Home() {
  const [showFeatures, setShowFeatures] = useState(false);
  
  // Define all icons at the top
  const FolderIcon = getIcon('Folder');
  const ShieldIcon = getIcon('Shield');
  const ShareIcon = getIcon('Share2');
  const ChevronDownIcon = getIcon('ChevronDown');
  const ChevronUpIcon = getIcon('ChevronUp');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // Features data
  const features = [
    {
      title: "Intuitive Organization",
      description: "Easily organize your files with folders, tags, and smart search capabilities.",
      icon: FolderIcon
    },
    {
      title: "Bank-Level Security",
      description: "Your files are encrypted and protected with enterprise-grade security measures.",
      icon: ShieldIcon
    },
    {
      title: "Flexible Sharing",
      description: "Share files safely with customizable permissions and expiring links.",
      icon: ShareIcon
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-200">
      {/* Hero Section */}
      <motion.header 
        className="relative pt-20 pb-12 md:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary to-secondary-light rounded-2xl flex items-center justify-center shadow-lg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary-dark text-transparent bg-clip-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          DropVault
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-surface-600 dark:text-surface-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A simple and secure way to upload, store, and manage your files online.
        </motion.p>
      </motion.header>

      {/* Main Feature Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MainFeature />
      </section>

      {/* Features Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8 bg-surface-100 dark:bg-surface-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-6">Powerful Features</h2>
            <p className="text-lg max-w-2xl mx-auto text-surface-600 dark:text-surface-300">
              DropVault combines simplicity with powerful capabilities to give you the best file management experience.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-light dark:bg-primary-dark bg-opacity-20 dark:bg-opacity-30 flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-surface-600 dark:text-surface-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="btn-outline flex items-center mx-auto"
            >
              <span>{showFeatures ? "Hide Details" : "Learn More"}</span>
              {showFeatures ? 
                <ChevronUpIcon className="ml-2 w-4 h-4" /> : 
                <ChevronDownIcon className="ml-2 w-4 h-4" />
              }
            </button>
          </motion.div>

          {showFeatures && (
            <motion.div 
              className="mt-12 grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Advanced Security</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>End-to-end encryption for all your files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>Password protection for shared files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>Granular access controls</span>
                  </li>
                </ul>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Easy Collaboration</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>Create shareable links instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>Set expiration dates for temporary access</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 text-primary mr-2">✓</span>
                    <span>Track who accessed your shared files</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
        <p>© {new Date().getFullYear()} DropVault. All rights reserved.</p>
        <p className="mt-2">Your files, your control. Always.</p>
      </footer>
    </div>
  );
}