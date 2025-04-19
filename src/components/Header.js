import React, { useState, useRef, useEffect } from 'react';
import { FiSun, FiMoon, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Header = ({ title, children, onToggleDarkMode, darkMode, alertCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 pt-6 pb-4 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {title && (
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 truncate">{title}</h1>
        )}
        {children && <div className="ml-auto flex items-center gap-2">{children}</div>}
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
          aria-label="View alerts"
        >
          <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold animate-pulse">
              {alertCount}
            </span>
          )}
        </button>
        <button
          onClick={onToggleDarkMode}
          className="ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="User menu"
          >
            <FiUser className="w-5 h-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-700">
              <div className="px-4 py-2 text-gray-700 dark:text-gray-200 text-sm">Profile</div>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => { logout(); setDropdownOpen(false); }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
