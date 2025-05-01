import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsClosed(!isClosed);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/favourites') return 'favourites';
    if (path === '/profile') return 'profile';
    if (path === '/settings') return 'settings';
    return 'home';
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
            <li className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`}>
              <button onClick={() => navigate('/home')} className="flex items-center w-full h-full">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Home</span>
              </button>
            </li>
            <li className={`nav-link ${getActivePage() === 'favourites' ? 'active' : ''}`}>
              <button onClick={() => navigate('/favourites')} className="flex items-center w-full h-full">
                <i className="bx bx-heart icon"></i>
                <span className="text nav-text">Favourites</span>
              </button>
            </li>
            <li className={`nav-link ${getActivePage() === 'profile' ? 'active' : ''}`}>
              <button onClick={() => navigate('/profile')} className="flex items-center w-full h-full">
                <i className="bx bx-user icon"></i>
                <span className="text nav-text">Profile</span>
              </button>
            </li>
            <li className={`nav-link ${getActivePage() === 'settings' ? 'active' : ''}`}>
              <button onClick={() => navigate('/settings')} className="flex items-center w-full h-full">
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