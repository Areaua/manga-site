import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as OrangeLogo } from './orange.svg';
import { ReactComponent as BlueLogo } from './blue.svg';
import './Header.css';

const Header = ({ hideHeader }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Guest',
    avatar_url: 'https://www.gravatar.com/avatar/?d=mp',
    is_premium: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [menuTimeout, setMenuTimeout] = useState(null);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [useBlueLogo, setUseBlueLogo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData({
            username: response.data.username || 'Guest',
            avatar_url: response.data.avatar_url
              ? `${response.data.avatar_url}?t=${Date.now()}`
              : 'https://www.gravatar.com/avatar/?d=mp',
            is_premium: response.data.is_premium || false,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
    setUseBlueLogo(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/home') return 'home';
    if (path === '/favourites') return 'favourites';
    if (path === '/profile') return 'profile';
    if (path === '/settings') return 'settings';
    return 'home';
  };

  const handleMouseEnter = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout);
    }
    setIsAvatarMenuOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsAvatarMenuOpen(false);
    }, 500);
    setMenuTimeout(timeout);
  };

  const handleNotificationClick = () => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsNotificationOpen(false);
    }, 500);
    setNotificationTimeout(timeout);
  };

  const handleLogoMouseEnter = () => {
    setIsLogoHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsLogoHovered(false);
  };

  const handlePremiumClick = () => {
    navigate('/profile');
  };

  if (hideHeader) return null;

  return (
    <header className="header">
      <div className="header-content">
        <div
          className="logo-container"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <h1 className={`header-title ${isLogoHovered ? 'fade-out' : 'fade-in'}`}>
            AniAria
          </h1>
          {useBlueLogo ? (
            <BlueLogo
              className={`header-logo ${isLogoHovered ? 'fade-in rotate-in' : 'fade-out'}`}
            />
          ) : (
            <OrangeLogo
              className={`header-logo ${isLogoHovered ? 'fade-in rotate-in' : 'fade-out'}`}
            />
          )}
        </div>
        <div className="nav-container">
          <div className="desktop-nav">
            <button
              className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`}
              onClick={() => navigate('/home')}
            >
              <i className="bx bx-home-alt"></i> Home
            </button>
            <button
              className={`nav-link ${getActivePage() === 'favourites' ? 'active' : ''}`}
              onClick={() => navigate('/favourites')}
            >
              <i className="bx bx-heart"></i> Favourites
            </button>
            <button
              className={`nav-link ${getActivePage() === 'profile' ? 'active' : ''}`}
              onClick={() => navigate('/profile')}
            >
              <i className="bx bx-user"></i> Profile
            </button>
            <button
              className={`nav-link ${getActivePage() === 'settings' ? 'active' : ''}`}
              onClick={() => navigate('/settings')}
            >
              <i className="bx bx-cog"></i> Settings
            </button>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
          </button>
        </div>
        <div className="right-section">
          {!userData.is_premium && (
            <button className="premium-button" onClick={handlePremiumClick}>
              <i className="bx bx-crown premium-icon"></i>
            </button>
          )}
          <div className="notification-container">
            <i
              className="bx bx-mail-send notification-icon"
              onClick={handleNotificationClick}
            ></i>
            {isNotificationOpen && (
              <div
                className="notification-menu"
                onMouseLeave={handleNotificationMouseLeave}
              >
                <p className="notification-text">Уведомлений нет</p>
              </div>
            )}
          </div>
          <div
            className="user-info"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="user-name">{userData.username}</span>
            {userData.is_premium && <span className="user-status">Premium</span>}
            <img
              src={userData.avatar_url}
              alt="User Avatar"
              className="user-avatar"
              onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            />
            {isAvatarMenuOpen && (
              <div className="avatar-menu">
                <button className="avatar-menu-item" onClick={handleLogout}>
                  <i className="bx bx-log-out"></i> Logout
                </button>
                <button className="avatar-menu-item" onClick={toggleDarkMode}>
                  <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`}></i>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-nav">
          <button
            className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`}
            onClick={() => {
              navigate('/home');
              setIsMenuOpen(false);
            }}
          >
            <i className="bx bx-home-alt"></i> Home
          </button>
          <button
            className={`nav-link ${getActivePage() === 'favourites' ? 'active' : ''}`}
            onClick={() => {
              navigate('/favourites');
              setIsMenuOpen(false);
            }}
          >
            <i className="bx bx-heart"></i> Favourites
          </button>
          <button
            className={`nav-link ${getActivePage() === 'profile' ? 'active' : ''}`}
            onClick={() => {
              navigate('/profile');
              setIsMenuOpen(false);
            }}
          >
            <i className="bx bx-user"></i> Profile
          </button>
          <button
            className={`nav-link ${getActivePage() === 'settings' ? 'active' : ''}`}
            onClick={() => {
              navigate('/settings');
              setIsMenuOpen(false);
            }}
          >
            <i className="bx bx-cog"></i> Settings
          </button>
          <button
            className="nav-link"
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
          >
            <i className="bx bx-log-out"></i> Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;