import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

const Layout = ({ children, title }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    const stored = localStorage.getItem('sidebarExpanded');
    return stored === null ? true : stored === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarExpanded', sidebarExpanded);
  }, [sidebarExpanded]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  // Determine alert count for notification badge
  let alertCount = 0;
  if (title === 'Dashboard Overview') {
    alertCount = 2; // Number of compliance alerts in Dashboard.js
  }

  return (
    <div className="flex">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div
        className={`transition-all duration-200 flex-1 min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 ${sidebarExpanded ? 'md:ml-64' : 'md:ml-20'} ${mobileOpen ? 'overflow-hidden' : ''}`}
      >
        <Header
          onToggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          title={title}
          alertCount={alertCount}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />
        <div className="px-6 pt-2">
          <Breadcrumb />
        </div>
        <main className="flex-grow p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
