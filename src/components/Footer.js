import React from 'react';

const Footer = () => (
  <footer className="bg-white border-t border-blush-100 py-6 text-center dark:bg-ink-900 dark:border-ink-600/20">
    <p className="text-sm text-ink-600 dark:text-ink-400">
      © {new Date().getFullYear()} AniAria. All rights reserved. · Made with ❤️ by Pavlo
    </p>
  </footer>
);

export default Footer;
