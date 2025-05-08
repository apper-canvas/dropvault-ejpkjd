import React from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function FileUploader({ 
  onFilesAdded, 
  fileInputRef, 
  isDragging, 
  handleDragEnter, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop, 
  handleFileInputChange 
}) {
  const UploadCloudIcon = getIcon('UploadCloud');

  return (
    <motion.div
      className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center
                transition-all duration-300 ${
                  isDragging 
                    ? 'border-primary bg-primary bg-opacity-10' 
                    : 'border-surface-300 dark:border-surface-700 hover:border-primary dark:hover:border-primary'
                }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: isDragging ? 1 : 1.01 }}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
        multiple
      />
      
      <UploadCloudIcon className="w-10 h-10 mx-auto mb-3 text-primary" />
      <h3 className="text-lg font-semibold mb-2">{isDragging ? 'Drop Files Here' : 'Drag & Drop Files'}</h3>
      <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">or select files from your device</p>
      <button className="btn-primary px-5 py-2 text-sm" onClick={() => fileInputRef.current.click()}>
        Select Files
      </button>
    </motion.div>
  );
}