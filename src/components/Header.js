import React from 'react';
import { FiSun, FiMoon, FiBell } from 'react-icons/fi';

// Merged Header and PageHeader: supports title, actions, dark mode toggle, and notification bell
const Header = ({ title, children, onToggleDarkMode, darkMode, alertCount = 0 }) => (
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
    </div>
  </header>
);

export default Header;
