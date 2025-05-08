import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  // Define icons
  const FolderIcon = getIcon('Folder');
  const HomeIcon = getIcon('Home');
  const StarIcon = getIcon('Star');
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