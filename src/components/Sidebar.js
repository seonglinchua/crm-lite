import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus, FiLogOut, FiChevronLeft, FiChevronRight, FiMenu } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
  { label: 'Clients', path: '/clients', icon: <FiUsers /> },
  { label: 'Add Client', path: '/clients/add', icon: <FiUserPlus /> },
  { label: 'Logout', path: '/', icon: <FiLogOut /> }
];

const Sidebar = ({ expanded, setExpanded, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    // Optionally clear other user/session data here
    navigate('/'); // Redirects to login or landing page
  };

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
          ${expanded ? 'w-64' : 'w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ minWidth: expanded ? '16rem' : '5rem' }}
      >
        <div className="flex items-center gap-3 h-20 min-h-[72px] border-b dark:border-gray-700 px-4">
          <img src="/favicon.ico" alt="CRM Lite Logo" className="w-8 h-8" />
          {expanded && <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">CRM Lite</span>}
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
            className="ml-auto p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none md:hidden"
            aria-label="Close sidebar"
          >
            <FiChevronLeft />
          </button>
        </div>
        <nav className="flex-1 px-2 py-6 space-y-3">
          {navItems.map((item, index) => (
            item.label === 'Logout' ? (
              <a
                key={index}
                href={item.path}
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-2 rounded text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {expanded && <span>{item.label}</span>}
              </a>
            ) : (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                {expanded && <span>{item.label}</span>}
              </Link>
            )
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
