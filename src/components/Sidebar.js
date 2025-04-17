import React, { useState } from 'react';
import '../index.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const [isClosed, setIsClosed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setIsClosed(!isClosed);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  return (
    <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img
              src="https://drive.google.com/uc?export=view&id=1ETZYgPpWbbBtpJnhi42_IR3vOwSOpR4z"
              alt="Logo"
            />
          </span>
          <div className="text logo-text">
            <span className="name">Anime Hub</span>
            <span className="profession">Explore Anime</span>
          </div>
        </div>
        <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className={`nav-link ${activePage === 'home' ? 'active' : ''}`}>
              <button onClick={() => setActivePage('home')} className="flex items-center w-full h-full">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Home</span>
              </button>
            </li>
            <li className={`nav-link ${activePage === 'favourites' ? 'active' : ''}`}>
              <button onClick={() => setActivePage('favourites')} className="flex items-center w-full h-full">
                <i className="bx bx-heart icon"></i>
                <span className="text nav-text">Favourites</span>
              </button>
            </li>
            <li className={`nav-link ${activePage === 'profile' ? 'active' : ''}`}>
              <button onClick={() => setActivePage('profile')} className="flex items-center w-full h-full">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Profile</span>
              </button>
            </li>
            <li className={`nav-link ${activePage === 'settings' ? 'active' : ''}`}>
              <button onClick={() => setActivePage('settings')} className="flex items-center w-full h-full">
                <i className="bx bx-cog icon"></i>
                <span className="text nav-text">Settings</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="mode">
            <div className="mode-content">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
            </div>
            <div className="toggle-switch-wrapper">
              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;