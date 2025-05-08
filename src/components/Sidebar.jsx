import { NavLink, useLocation } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import { useState } from 'react';
export default function Sidebar() {
  const location = useLocation();
  
  // Get icons
  const HomeIcon = getIcon('Home');
  const FolderIcon = getIcon('Folder');
  const SettingsIcon = getIcon('Settings');
  const ShareIcon = getIcon('Share2');
  const StarIcon = getIcon('Star');
  const TrashIcon = getIcon('Trash');
  
import { motion } from 'framer-motion';
    <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700">
      <div className="p-4 border-b border-surface-200 dark:border-surface-700">
        <h1 className="text-xl font-bold text-primary">DropVault</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" className={({ isActive }) => 
              `flex items-center px-4 py-2.5 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`
            }>
              <HomeIcon className="w-5 h-5 mr-3" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/myfiles" className={({ isActive }) => 
              `flex items-center px-4 py-2.5 rounded-lg ${isActive ? 'bg-primary text-white' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`
            }>
              <FolderIcon className="w-5 h-5 mr-3" /> My Files
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
          <h3 className="px-4 text-xs font-semibold text-surface-500 uppercase tracking-wider mb-2">Categories</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <StarIcon className="w-4 h-4 mr-3 text-amber-500" /> Favorites
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <ShareIcon className="w-4 h-4 mr-3 text-green-500" /> Shared
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
                <TrashIcon className="w-4 h-4 mr-3 text-red-500" /> Trash
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t border-surface-200 dark:border-surface-700">
        <a href="#" className="flex items-center text-sm text-surface-600 dark:text-surface-400 hover:text-primary">
          <SettingsIcon className="w-4 h-4 mr-2" /> Settings
        </a>
  const [collapsed, setCollapsed] = useState(false);
  
  // Define icons
  const FolderIcon = getIcon('Folder');
  const ShareIcon = getIcon('Share2');
  const TrashIcon = getIcon('Trash2');
  const SettingsIcon = getIcon('Settings');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  const navItems = [
    { name: 'Home', icon: HomeIcon, path: '/' },
    { name: 'My Files', icon: FolderIcon, path: '/files' },
    { name: 'Favorites', icon: StarIcon, path: '/favorites' },
    { name: 'Shared', icon: ShareIcon, path: '/shared' },
    { name: 'Trash', icon: TrashIcon, path: '/trash' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  return (
    <motion.div 
      className="relative bg-surface-100 dark:bg-surface-800 h-full"
      initial={{ width: collapsed ? 80 : 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-surface-200 dark:border-surface-700">
        <motion.div
          className="flex items-center"
          animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary-light rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {!collapsed && (
            <span className="ml-3 font-bold text-lg bg-gradient-to-r from-primary to-secondary-dark text-transparent bg-clip-text">
              DropVault
            </span>
          )}
        </motion.div>
      </div>
      
      {/* Navigation */}
      <nav className="p-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary bg-opacity-20 text-primary' 
                      : 'hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-4 right-3 p-2 rounded-full bg-surface-200 dark:bg-surface-700 
                   hover:bg-surface-300 dark:hover:bg-surface-600"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed 
          ? <ChevronRightIcon className="w-5 h-5" /> 
          : <ChevronLeftIcon className="w-5 h-5" />
        }
      </button>
    </motion.div>
  );
}