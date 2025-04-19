import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <FiHome className="inline-block w-4 h-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="flex items-center">
              <FiChevronRight className="mx-2 text-gray-400 w-4 h-4" />
              {isLast ? (
                <span className="font-medium text-gray-700 dark:text-gray-200 capitalize">{value.replace(/-/g, ' ')}</span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors capitalize"
                >
                  {value.replace(/-/g, ' ')}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
