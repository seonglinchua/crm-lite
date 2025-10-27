import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus, FiLogOut, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
  { label: 'Clients', path: '/clients', icon: <FiUsers /> },
  { label: 'Add Client', path: '/clients/add', icon: <FiUserPlus /> },
  { label: 'Logout', path: '/', icon: <FiLogOut /> }
];

const Sidebar = ({ expanded, setExpanded, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />
      {/* Sidebar */}
      <aside
        className={`transition-all duration-200 z-50 fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-md flex flex-col
          w-64 md:w-auto ${expanded ? 'md:w-64' : 'md:w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ minWidth: expanded ? '16rem' : '5rem' }}
      >
        <div className="flex items-center gap-3 h-20 min-h-[72px] border-b dark:border-gray-700 px-4">
          <img src="/favicon.ico" alt="CRM Lite Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 md:hidden">CRM Lite</span>
          {expanded && <span className="hidden md:inline text-xl font-bold text-indigo-600 dark:text-indigo-400">CRM Lite</span>}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="ml-auto p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none hidden md:block"
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none md:hidden touch-manipulation"
            aria-label="Close sidebar"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-6 space-y-3">
          {navItems.map((item, index) => (
            item.label === 'Logout' ? (
              <a
                key={index}
                href={item.path}
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors touch-manipulation ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="md:hidden">{item.label}</span>
                {expanded && <span className="hidden md:inline">{item.label}</span>}
              </a>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors touch-manipulation ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="md:hidden">{item.label}</span>
                {expanded && <span className="hidden md:inline">{item.label}</span>}
              </Link>
            )
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
