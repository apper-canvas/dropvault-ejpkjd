import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

export default function MainFeature() {
  // State declarations
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [sortOrder, setSortOrder] = useState('newest');
  const [view, setView] = useState('grid');
  const fileInputRef = useRef(null);

  // Define all icons at the top
  const UploadCloudIcon = getIcon('UploadCloud');
  const FileIcon = getIcon('File');
  const ImageIcon = getIcon('Image');
  const FileTextIcon = getIcon('FileText');
  const FileArchiveIcon = getIcon('Archive');
  const DeleteIcon = getIcon('Trash2');
  const DownloadIcon = getIcon('Download');
  const SortDescIcon = getIcon('SortDesc');
  const SortAscIcon = getIcon('SortAsc');
  const GridIcon = getIcon('Grid');
  const ListIcon = getIcon('List');
  const XIcon = getIcon('X');

  // Prevent default drag behaviors
  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    preventDefaults(e);
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    preventDefaults(e);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    preventDefaults(e);
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    preventDefaults(e);
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Handle file selection through button
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Process selected files
  const handleFiles = (newFiles) => {
    // Get unique IDs for new files
    const newFilesWithIds = newFiles.map(file => {
      const id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Start simulated upload
      simulateFileUpload(id);
      
      return {
        id,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        url: URL.createObjectURL(file)
      };
    });
    
    // Merge with existing files
    setFiles(prevFiles => [...prevFiles, ...newFilesWithIds]);
    
    toast.success(`${newFiles.length} file${newFiles.length !== 1 ? 's' : ''} added successfully`);
  };

  // Simulate file upload with progress
  const simulateFileUpload = (fileId) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[fileId] || 0;
        const newProgress = Math.min(currentProgress + Math.random() * 20, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
        }
        
        return { ...prev, [fileId]: newProgress };
      });
    }, 400);
  };

  // Handle file deletion
  const handleDeleteFile = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    toast.info("File removed");
  };

  // Handle file download
  const handleDownloadFile = (file) => {
    // Create download link
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("File download started");
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  // Toggle view (grid/list)
  const toggleView = () => {
    setView(prev => prev === 'grid' ? 'list' : 'grid');
  };

  // Get the correct icon based on file type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return ImageIcon;
    if (fileType.startsWith('text/') || fileType.includes('document')) return FileTextIcon;
    if (fileType.includes('zip') || fileType.includes('archive')) return FileArchiveIcon;
    return FileIcon;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Sort the files based on current sort order
  const sortedFiles = [...files].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.uploadDate) - new Date(a.uploadDate);
    } else {
      return new Date(a.uploadDate) - new Date(b.uploadDate);
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Your File Vault</h2>
        <p className="text-surface-600 dark:text-surface-300">
          Upload, manage, and organize your files in one secure place.
        </p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center mb-8
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
        transition={{ delay: 0.2, duration: 0.4 }}
        whileHover={{ scale: isDragging ? 1 : 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileInputChange}
          multiple
        />
        
        <UploadCloudIcon className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-primary" />
        
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          {isDragging ? 'Drop Files Here' : 'Drag & Drop Files Here'}
        </h3>
        
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          or select files from your device
        </p>
        
        <motion.button
          className="btn-primary px-6 py-3"
          onClick={() => fileInputRef.current.click()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Select Files
        </motion.button>
      </motion.div>

      {/* File Management Controls */}
      {files.length > 0 && (
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">
            {files.length} File{files.length !== 1 ? 's' : ''}
          </h3>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSortOrder} 
              className="flex items-center btn-outline py-1 px-3"
              aria-label={`Sort by ${sortOrder === 'newest' ? 'oldest' : 'newest'}`}
            >
              {sortOrder === 'newest' ? (
                <>
                  <SortDescIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Newest</span>
                </>
              ) : (
                <>
                  <SortAscIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Oldest</span>
                </>
              )}
            </button>
            
            <button 
              onClick={toggleView} 
              className="flex items-center btn-outline py-1 px-3"
              aria-label={`View as ${view === 'grid' ? 'list' : 'grid'}`}
            >
              {view === 'grid' ? (
                <>
                  <GridIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Grid</span>
                </>
              ) : (
                <>
                  <ListIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">List</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Files Display */}
      {files.length > 0 ? (
        <motion.div
          className={view === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "flex flex-col space-y-3"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          <AnimatePresence>
            {sortedFiles.map(file => (
              <motion.div
                key={file.id}
                className={`card overflow-hidden ${
                  view === 'grid' ? 'flex flex-col' : 'flex flex-row items-center'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* File Preview */}
                <div className={view === 'grid' 
                  ? "w-full aspect-video bg-surface-200 dark:bg-surface-800 flex items-center justify-center relative overflow-hidden"
                  : "w-16 h-16 flex-shrink-0 bg-surface-200 dark:bg-surface-800 flex items-center justify-center relative overflow-hidden"
                }>
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      {React.createElement(getFileIcon(file.type), { 
                        className: "w-10 h-10 text-surface-600 dark:text-surface-400" 
                      })}
                    </div>
                  )}
                  
                  {/* Upload Progress Overlay */}
                  {uploadProgress[file.id] < 100 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <div className="w-3/4 bg-surface-700 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.id]}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* File Details */}
                <div className={`p-4 ${view === 'grid' ? '' : 'flex-grow'}`}>
                  <div className={view === 'grid' ? '' : 'flex justify-between items-center'}>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base line-clamp-1">{file.name}</h4>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    
                    {/* File Actions */}
                    <div className={`flex ${view === 'grid' ? 'mt-3 justify-between' : 'space-x-2'}`}>
                      <button 
                        onClick={() => handleDownloadFile(file)}
                        className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors"
                        aria-label="Download file"
                      >
                        <DownloadIcon className="w-5 h-5" />
                      </button>
                      
                      <button 
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        aria-label="Delete file"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-12 bg-surface-100 dark:bg-surface-800 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FileIcon className="w-16 h-16 mx-auto mb-4 text-surface-400" />
          <h3 className="text-xl font-medium mb-2">No Files Yet</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            Upload files to get started
          </p>
        </motion.div>
      )}
    </div>
  );
}