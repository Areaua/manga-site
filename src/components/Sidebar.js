import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({ username: 'Guest', avatar_url: 'https://www.gravatar.com/avatar/?d=mp', is_premium: false });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData({
            username: response.data.username || 'Guest',
            avatar_url: response.data.avatar_url ? `${response.data.avatar_url}?t=${Date.now()}` : 'https://www.gravatar.com/avatar/?d=mp',
            is_premium: response.data.is_premium || false
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
      <header>
        <div className="image-text flex items-center w-full">
          <div className="flex items-center">
            <span className="image">
              <img
                src={userData.avatar_url}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
              />
            </span>
            <div className="text logo-text ml-2">
              <span className="name" style={{ color: 'var(--text-color)' }}>{userData.username}</span>
              <span className="profession text-xs" style={{ color: 'var(--text-color)', display: 'block' }}>
                {userData.is_premium ? 'Premium' : 'Free'}
              </span>
            </div>
          </div>
          <i className="bx bx-chevron-right toggle" onClick={toggleSidebar}></i>
        </div>
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
            <li className="nav-link">
              <button onClick={handleLogout} className="flex items-center w-full h-full">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
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