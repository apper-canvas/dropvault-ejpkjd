import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFileSize, getFileIcon } from '../utils/fileUtils';
import getIcon from '../utils/iconUtils';

export default function MyFilesManager({ 
  files, 
  view, 
  uploadProgress, 
  sortOrder,
  sortField,
  selectedFileType,
  searchQuery,
  setSearchQuery,
  setSelectedFileType,
  setSortField,
  toggleSortOrder,
  toggleView,
  handleDeleteFile,
  handleDownloadFile
}) {
  // Icons
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const SortDescIcon = getIcon('SortDesc');
  const SortAscIcon = getIcon('SortAsc');
  const GridIcon = getIcon('Grid');
  const ListIcon = getIcon('List');
  const DownloadIcon = getIcon('Download');
  const DeleteIcon = getIcon('Trash2');
  const FileIcon = getIcon('File');

  return (
    <>
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-surface-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter by Type */}
        <div className="flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-5 w-5 text-surface-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg focus:ring-2"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
            >
              <option value="all">All Files</option>
              <option value="documents">Documents</option>
              <option value="images">Images</option>
              <option value="archives">Archives</option>
            </select>
          </div>

          {/* Sort Options */}
          <select
            className="px-3 py-2 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg focus:ring-2"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
          </select>

          {/* Sort Order Toggle */}
          <button 
            onClick={toggleSortOrder} 
            className="p-2 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg"
            aria-label={`Sort ${sortOrder === 'newest' ? 'oldest first' : 'newest first'}`}
          >
            {sortOrder === 'newest' ? (
              <SortDescIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            ) : (
              <SortAscIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            )}
          </button>

          {/* View Toggle */}
          <button 
            onClick={toggleView} 
            className="p-2 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-700 rounded-lg"
            aria-label={`View as ${view === 'grid' ? 'list' : 'grid'}`}
          >
            {view === 'grid' ? (
              <GridIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            ) : (
              <ListIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            )}
          </button>
        </div>
      </div>

      {/* Files Display */}
      {files.length > 0 ? (
        <motion.div
          className={view === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "flex flex-col space-y-3"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {files.map(file => (
              <motion.div
                key={file.id}
                className={`card ${view === 'grid' ? 'flex flex-col' : 'flex items-center'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* File Preview/Icon */}
                <div className={view === 'grid' 
                  ? "w-full aspect-video bg-surface-100 dark:bg-surface-700 flex items-center justify-center relative overflow-hidden"
                  : "w-16 h-16 flex-shrink-0 bg-surface-100 dark:bg-surface-700 flex items-center justify-center relative overflow-hidden"
                }>
                  {React.createElement(getFileIcon(file.type), { 
                    className: "w-8 h-8 text-surface-600 dark:text-surface-400" 
                  })}
                  
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
                <div className={`p-4 ${view === 'grid' ? '' : 'flex-grow flex justify-between'}`}>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base line-clamp-1">{file.name}</h4>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {/* File Actions */}
                  <div className={`flex ${view === 'grid' ? 'mt-3 justify-between' : 'ml-4'}`}>
                    <button 
                      onClick={() => handleDownloadFile(file)}
                      className="p-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary"
                      aria-label="Download file"
                    >
                      <DownloadIcon className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 text-surface-600 dark:text-surface-400 hover:text-red-500 dark:hover:text-red-400"
                      aria-label="Delete file"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </button>
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
        >
          <FileIcon className="w-16 h-16 mx-auto mb-4 text-surface-400" />
          <h3 className="text-xl font-medium mb-2">No Files Found</h3>
          <p className="text-surface-500 dark:text-surface-400 mb-6">
            {searchQuery ? 'Try a different search query' : 'Upload files to get started'}
          </p>
        </motion.div>
      )}
    </>
  );
}