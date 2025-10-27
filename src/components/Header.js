import React, { useState, useRef, useEffect } from 'react';
import { FiSun, FiMoon, FiBell, FiUser, FiMenu, FiX, FiCheck, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Header = ({ title, children, onToggleDarkMode, darkMode, onOpenMobileMenu }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const { logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    if (dropdownOpen || notificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, notificationOpen]);

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
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2.5 md:p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none touch-manipulation"
            aria-label="View notifications"
          >
            <FiBell className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-850 rounded-lg shadow-soft-lg py-2 z-50 border border-gray-100 dark:border-gray-700 animate-slide-down max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  <FiBell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        !notif.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1">
                          <div className="mt-1">
                            {notif.type === 'alert' && <FiAlertCircle className="w-4 h-4 text-red-500" />}
                            {notif.type === 'task' && <FiCheck className="w-4 h-4 text-blue-500" />}
                            {notif.type === 'update' && <FiInfo className="w-4 h-4 text-green-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{notif.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notif.read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="p-1 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              title="Mark as read"
                            >
                              <FiCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            title="Delete"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
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
