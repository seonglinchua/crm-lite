import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUsers, FiUserPlus, FiLogOut, FiChevronLeft, FiChevronRight,
  FiUserCheck, FiUserX, FiCheckSquare, FiPlus, FiChevronDown, FiChevronUp,
  FiTrendingUp, FiDollarSign, FiBarChart2, FiCalendar, FiSettings
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navGroups = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: <FiHome />,
    type: 'single'
  },
  {
    id: 'clients',
    label: 'Client Management',
    icon: <FiUsers />,
    type: 'group',
    items: [
      { label: 'All Clients', path: '/clients', icon: <FiUsers /> },
      { label: 'Add Client', path: '/clients/add', icon: <FiUserPlus /> }
    ]
  },
  {
    id: 'contacts',
    label: 'Contacts & Leads',
    icon: <FiUserCheck />,
    type: 'group',
    items: [
      { label: 'All Contacts', path: '/contacts', icon: <FiUserCheck /> },
      { label: 'Add Contact', path: '/contacts/add', icon: <FiUserX /> }
    ]
  },
  {
    id: 'tasks',
    label: 'Tasks & Activities',
    icon: <FiCheckSquare />,
    type: 'group',
    items: [
      { label: 'All Tasks', path: '/tasks', icon: <FiCheckSquare /> },
      { label: 'Add Task', path: '/tasks/add', icon: <FiPlus /> }
    ]
  },
  {
    id: 'pipeline',
    label: 'Sales Pipeline',
    icon: <FiTrendingUp />,
    type: 'group',
    items: [
      { label: 'Opportunities', path: '/opportunities', icon: <FiDollarSign /> },
      { label: 'Add Opportunity', path: '/opportunities/add', icon: <FiPlus /> }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    path: '/reports',
    icon: <FiBarChart2 />,
    type: 'single'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    path: '/calendar',
    icon: <FiCalendar />,
    type: 'single'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: <FiSettings />,
    type: 'single'
  },
  {
    id: 'logout',
    label: 'Logout',
    path: '/',
    icon: <FiLogOut />,
    type: 'action'
  }
];

const Sidebar = ({ expanded, setExpanded, mobileOpen, setMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [openGroups, setOpenGroups] = useState({
    clients: true,
    contacts: true,
    tasks: true,
    pipeline: true
  });

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const toggleGroup = (groupId) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const isPathActive = (path) => location.pathname === path;

  const isGroupActive = (items) => {
    return items?.some(item => location.pathname === item.path);
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

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = isPathActive(item.path);
    const baseClass = `flex items-center gap-3 py-3 rounded text-sm transition-colors touch-manipulation ${
      isSubItem ? 'pl-12 pr-4' : 'px-4'
    }`;
    const activeClass = isActive
      ? 'bg-indigo-100 dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 font-medium'
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';

    return (
      <Link
        to={item.path}
        className={`${baseClass} ${activeClass}`}
        onClick={() => setMobileOpen(false)}
      >
        <span className="text-lg">{item.icon}</span>
        <span className="md:hidden">{item.label}</span>
        {expanded && <span className="hidden md:inline">{item.label}</span>}
      </Link>
    );
  };

  const renderGroup = (group) => {
    const isOpen = openGroups[group.id];
    const isActive = isGroupActive(group.items);

    return (
      <div key={group.id}>
        <button
          onClick={() => toggleGroup(group.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors touch-manipulation ${
            isActive
              ? 'bg-indigo-50 dark:bg-gray-900/50 text-indigo-700 dark:text-indigo-300 font-medium'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="text-lg">{group.icon}</span>
          <span className="md:hidden flex-1 text-left">{group.label}</span>
          {expanded && <span className="hidden md:inline flex-1 text-left">{group.label}</span>}
          {(expanded || !expanded) && (
            <span className="text-xs md:hidden">
              {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          )}
          {expanded && (
            <span className="text-xs hidden md:inline">
              {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          )}
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1">
            {group.items.map((item, idx) => (
              <div key={idx}>{renderNavItem(item, true)}</div>
            ))}
          </div>
        )}
      </div>
    );
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
          w-64 md:w-auto ${expanded ? 'md:w-64' : 'md:w-20'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ minWidth: expanded ? '16rem' : '5rem' }}
      >
        <div className="flex items-center gap-3 h-20 min-h-[72px] border-b dark:border-gray-700 px-4">
          <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="CRM Lite Logo" className="w-8 h-8" />
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
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {navGroups.map((group) => {
            if (group.type === 'single') {
              return <div key={group.id}>{renderNavItem(group)}</div>;
            } else if (group.type === 'group') {
              return renderGroup(group);
            } else if (group.type === 'action') {
              return (
                <a
                  key={group.id}
                  href={group.path}
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors touch-manipulation text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="text-lg">{group.icon}</span>
                  <span className="md:hidden">{group.label}</span>
                  {expanded && <span className="hidden md:inline">{group.label}</span>}
                </a>
              );
            }
            return null;
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
