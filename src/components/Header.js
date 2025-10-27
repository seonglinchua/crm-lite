import React, { useState, useRef, useEffect } from 'react';
import { FiSun, FiMoon, FiBell, FiUser, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Header = ({ title, children, onToggleDarkMode, darkMode, alertCount = 0, onOpenMobileMenu }) => {
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
    <header className="bg-white dark:bg-slate-850 shadow-soft px-4 md:px-6 pt-4 md:pt-6 pb-4 flex items-center justify-between transition-all duration-200 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        {/* Mobile hamburger menu */}
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-3 -ml-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none touch-manipulation"
            aria-label="Open sidebar"
          >
            <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
        )}
        {title && (
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 truncate">{title}</h1>
        )}
        {children && <div className="ml-auto flex items-center gap-2">{children}</div>}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="relative p-2.5 md:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none touch-manipulation"
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
          className="p-2.5 md:p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 text-primary-700 dark:text-gray-200 hover:shadow-soft transition-all duration-200 touch-manipulation"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="p-2.5 md:p-2 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 touch-manipulation"
            aria-label="User menu"
          >
            <FiUser className="w-5 h-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-850 rounded-lg shadow-soft-lg py-2 z-50 border border-gray-100 dark:border-gray-700 animate-slide-down">
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
