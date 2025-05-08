import getIcon from './iconUtils';

/**
 * Format file size in human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size with appropriate unit
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get the appropriate icon component based on file type
 * @param {string} fileType - MIME type of the file
 * @returns {Component} Icon component to use for the file
 */
export function getFileIcon(fileType) {
  const FileIcon = getIcon('File');
  if (fileType.startsWith('image/')) return getIcon('Image');
  if (fileType.includes('spreadsheet') || fileType.includes('excel')) return getIcon('FileSpreadsheet');
  if (fileType.includes('presentation') || fileType.includes('powerpoint')) return getIcon('FilePresentation');
  if (fileType.startsWith('text/') || fileType.includes('document')) return getIcon('FileText');
  if (fileType.includes('audio')) return getIcon('FileAudio');
  if (fileType.includes('video')) return getIcon('FileVideo');
  if (fileType.includes('pdf')) return getIcon('FilePdf');
  if (fileType.includes('zip') || fileType.includes('archive') || fileType.includes('compressed')) return getIcon('Archive');
  return FileIcon;

/**
 * Generate a timestamp-based unique ID for a file
 * @returns {string} A unique ID
 */
export function generateFileId() {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get a human-readable date representation
 * @param {Date} date - The date object to format
 */
export function formatFileDate(date) {
  return new Date(date).toLocaleDateString();
}
}