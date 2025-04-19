import React from 'react';

const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 text-center text-xs py-2 text-gray-400 dark:text-gray-500 border-t dark:border-gray-700 transition-colors">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
      <span>© 2025 CRM Lite. All rights reserved.</span>
      <span className="hidden sm:inline mx-2">|</span>
      <a href="#" className="hover:underline mx-1">Privacy</a>
      <span className="mx-1">|</span>
      <a href="#" className="hover:underline mx-1">Terms</a>
    </div>
  </footer>
);

export default Footer;
