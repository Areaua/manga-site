import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as OrangeLogo } from './orange.svg';
import { ReactComponent as BlueLogo } from './blue.svg';
import './Header.css';
import { API_BASE_URL, API_PREFIX } from '../config';

const Header = ({ hideHeader, areNotificationsEnabled }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark'));
  const [userData, setUserData] = useState({
    username: 'Гість',
    avatar_url: 'https://www.gravatar.com/avatar/?d=mp',
    is_premium: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuTimeout, setMenuTimeout] = useState(null);
  const [notificationTimeout, setNotificationTimeout] = useState(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [useBlueLogo, setUseBlueLogo] = useState(false);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const rightSectionRef = useRef(null);
  const wheelRef = useRef(null);
  const holdTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData({
            username: response.data.username || 'Гість',
            avatar_url: response.data.avatar_url
              ? `${response.data.avatar_url}?t=${Date.now()}`
              : 'https://www.gravatar.com/avatar/?d=mp',
            is_premium: response.data.is_premium || false,
          });
        } catch (error) {
          console.error('Помилка отримання даних користувача:', error);
        }
      }
    };

    fetchUserData();

    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'userData') {
        fetchUserData();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    setUseBlueLogo(document.body.classList.contains('dark'));
  }, []);

  useEffect(() => {
    if (searchContainerRef.current && rightSectionRef.current) {
      if (isSearchOpen) {
        searchContainerRef.current.classList.add('active');
        rightSectionRef.current.classList.add('active');
        setTimeout(() => searchInputRef.current?.focus(), 300);
      } else {
        searchContainerRef.current.classList.remove('active');
        rightSectionRef.current.classList.remove('active');
      }
    }
  }, [isSearchOpen]);

  const toggleDarkMode = () => {
    const newDarkMode = !document.body.classList.contains('dark');
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
    setUseBlueLogo(newDarkMode);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getActivePage = () => {
    const path = location.pathname;
    return path === '/home' ? 'home' :
           path === '/favourites' ? 'favourites' :
           path === '/profile' ? 'profile' :
           path === '/settings' ? 'settings' : 'home';
  };

  const handleMouseEnter = () => { if (menuTimeout) clearTimeout(menuTimeout); setIsAvatarMenuOpen(true); };
  const handleMouseLeave = () => { const timeout = setTimeout(() => setIsAvatarMenuOpen(false), 500); setMenuTimeout(timeout); };
  const handleNotificationClick = () => { if (notificationTimeout) clearTimeout(notificationTimeout); setIsNotificationOpen(!isNotificationOpen); };
  const handleNotificationMouseLeave = () => { const timeout = setTimeout(() => setIsNotificationOpen(false), 500); setNotificationTimeout(timeout); };
  const handleLogoMouseEnter = () => setIsLogoHovered(true);
  const handleLogoMouseLeave = () => setIsLogoHovered(false);
  const handlePremiumClick = () => navigate('/profile');
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const handleSearchChange = (e) => { setSearchQuery(e.target.value); };

  const toggleWheel = () => {
    setIsWheelOpen(prev => !prev);
    if (isWheelOpen) {
      setSelectedGenre(null);
      setHoldProgress(0);
      setIsHolding(false);
      if (wheelRef.current) {
        wheelRef.current.style.transform = 'rotate(0deg)';
        wheelRef.current.style.transition = 'none';
      }
    }
  };

  const startHold = () => {
    if (!isWheelOpen || !wheelRef.current) return;
    setIsHolding(true);
    setHoldProgress(0);
    holdTimerRef.current = setInterval(() => setHoldProgress(prev => Math.min(prev + 100 / (3000 / 50), 100)), 50);
  };

  const stopHold = () => {
    if (!isHolding) return;
    setIsHolding(false);
    clearInterval(holdTimerRef.current);
    if (holdProgress === 0) return;

    const genres = [{ name: 'Трилер', icon: '💀' }, { name: 'Драма', icon: '❤️' }, { name: 'Надприродне', icon: '👻' }, { name: 'Романтика', icon: '💕' }, { name: 'Пригоди', icon: '🌍' }, { name: 'Бізнес', icon: '💼' }];
    const rotations = 360 + (1440 * (holdProgress / 100));
    const duration = 1 + (4 * (holdProgress / 100));
    const randomIndex = Math.floor(Math.random() * genres.length);
    const targetAngle = randomIndex * (360 / genres.length);
    const randomRotation = rotations + (360 - (targetAngle % 360));

    wheelRef.current.style.transition = `transform ${duration}s cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    wheelRef.current.style.transform = `rotate(${randomRotation}deg)`;
    setTimeout(() => {
      setSelectedGenre(`${genres[randomIndex].icon} ${genres[randomIndex].name}`);
      setHoldProgress(0);
    }, duration * 1000);
  };

  if (hideHeader) return null;

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container" onMouseEnter={handleLogoMouseEnter} onMouseLeave={handleLogoMouseLeave}>
          <h1 className={`header-title ${isLogoHovered ? 'fade-out' : 'fade-in'}`}>AniAria</h1>
          {useBlueLogo ? <BlueLogo className={`header-logo ${isLogoHovered ? 'fade-in rotate-in' : 'fade-out'}`} /> : <OrangeLogo className={`header-logo ${isLogoHovered ? 'fade-in rotate-in' : 'fade-out'}`} />}
        </div>
        <div className="nav-container">
          <div className="desktop-nav">
            <button className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`} onClick={() => navigate('/home')}><i className="bx bx-home-alt"></i> Головна</button>
            <button className={`nav-link ${getActivePage() === 'favourites' ? 'active' : ''}`} onClick={() => navigate('/favourites')}><i className="bx bx-heart"></i> Улюблене</button>
            <button className={`nav-link ${getActivePage() === 'profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}><i className="bx bx-user"></i> Профіль</button>
            <button className={`nav-link ${getActivePage() === 'settings' ? 'active' : ''}`} onClick={() => navigate('/settings')}><i className="bx bx-cog"></i> Налаштування</button>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}><i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}></i></button>
        </div>
        <div className="right-section" ref={rightSectionRef}>
          <button className="wheel-button" onClick={toggleWheel}><i className="bx bx-dice-6 wheel-icon"></i></button>
          <div className="search-container" ref={searchContainerRef}>
            <i className="bx bx-search search-icon" onClick={toggleSearch}></i>
            {isSearchOpen && <input type="text" placeholder="Пошук манги..." ref={searchInputRef} value={searchQuery} onChange={handleSearchChange} className="search-input" />}
          </div>
          {!userData.is_premium && <button className="premium-button" onClick={handlePremiumClick}><i className="bx bx-crown premium-icon"></i></button>}
          <div className="notification-container">
            <i className={`bx bx-mail-send notification-icon ${areNotificationsEnabled ? 'animated' : ''}`} onClick={handleNotificationClick}></i>
            {isNotificationOpen && <div className="notification-menu" onMouseLeave={handleNotificationMouseLeave}><p className="notification-text">Сповіщень немає</p></div>}
          </div>
          <div className="user-info" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="user-details">
              <span className="user-name">{userData.username}</span>
              {userData.is_premium && <span className="user-status">Преміум</span>}
            </div>
            <img src={userData.avatar_url} alt="Аватар користувача" className="user-avatar" onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')} />
            {isAvatarMenuOpen && (
              <div className="avatar-menu">
                <button className="avatar-menu-item" onClick={handleLogout}><i className="bx bx-log-out"></i> Вийти</button>
                <button className="avatar-menu-item" onClick={toggleDarkMode}><i className={`bx ${document.body.classList.contains('dark') ? 'bx-sun' : 'bx-moon'}`}></i>{document.body.classList.contains('dark') ? 'Світла тема' : 'Темна тема'}</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-nav">
          <button className={`nav-link ${getActivePage() === 'home' ? 'active' : ''}`} onClick={() => { navigate('/home'); setIsMenuOpen(false); }}><i className="bx bx-home-alt"></i> Головна</button>
          <button className={`nav-link ${getActivePage() === 'favourites' ? 'active' : ''}`} onClick={() => { navigate('/favourites'); setIsMenuOpen(false); }}><i className="bx bx-heart"></i> Улюблене</button>
          <button className={`nav-link ${getActivePage() === 'profile' ? 'active' : ''}`} onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}><i className="bx bx-user"></i> Профіль</button>
          <button className={`nav-link ${getActivePage() === 'settings' ? 'active' : ''}`} onClick={() => { navigate('/settings'); setIsMenuOpen(false); }}><i className="bx bx-cog"></i> Налаштування</button>
          <button className="nav-link" onClick={() => { handleLogout(); setIsMenuOpen(false); }}><i className="bx bx-log-out"></i> Вийти</button>
        </div>
      )}
      {isWheelOpen && (
        <div className="genre-wheel-container">
          <div className="hold-progress-bar"><div className="hold-progress" style={{ width: `${holdProgress}%` }}></div></div>
          <div className="genre-wheel-pointer">↓</div>
          <div className="genre-wheel" ref={wheelRef}>
            {[{ name: 'Трилер', icon: '💀' }, { name: 'Драма', icon: '❤️' }, { name: 'Надприродне', icon: '👻' }, { name: 'Романтика', icon: '💕' }, { name: 'Пригоди', icon: '🌍' }, { name: 'Бізнес', icon: '💼' }].map((genre, index) => (
              <div key={index} className="genre-segment" style={{ transform: `rotate(${index * 60}deg)` }}><span style={{ transform: `rotate(${-index * 60}deg)` }}>{genre.icon}</span></div>
            ))}
            <button className="spin-button" onMouseDown={startHold} onMouseUp={stopHold} onTouchStart={startHold} onTouchEnd={stopHold}>Крутити</button>
          </div>
          {selectedGenre && <p className="selected-genre">{selectedGenre}</p>}
        </div>
      )}
    </header>
  );
};

export default Header;