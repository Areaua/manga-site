import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Home, Heart, User, Settings, Search, Crown, Bell,
  LogOut, Sun, Moon, Menu, X,
} from 'lucide-react';
import { API_BASE_URL, API_PREFIX } from '../config';

const NAV_LINKS = [
  { key: 'home',       path: '/home',       label: 'Home',     Icon: Home },
  { key: 'favourites', path: '/favourites', label: 'Favorites', Icon: Heart },
  { key: 'profile',   path: '/profile',    label: 'Profile',  Icon: User },
  { key: 'settings',  path: '/settings',   label: 'Settings', Icon: Settings },
];

const Header = ({ hideHeader, areNotificationsEnabled }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [userData, setUserData] = useState({
    username: 'Guest',
    avatar_url: 'https://www.gravatar.com/avatar/?d=mp',
    is_premium: false,
  });
  const [isMenuOpen, setIsMenuOpen]               = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen]   = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen]           = useState(false);
  const [searchQuery, setSearchQuery]             = useState('');
  const [menuTimeout, setMenuTimeout]             = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Apply saved theme on mount (before user interacts)
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          username:   response.data.username   || 'Guest',
          avatar_url: response.data.avatar_url
            ? `${response.data.avatar_url}?t=${Date.now()}`
            : 'https://www.gravatar.com/avatar/?d=mp',
          is_premium: response.data.is_premium || false,
        });
      } catch (_) {}
    };

    fetchUserData();

    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'userData') fetchUserData();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const getActivePage = () => {
    const p = location.pathname;
    if (p === '/home')        return 'home';
    if (p === '/favourites')  return 'favourites';
    if (p === '/profile')     return 'profile';
    if (p === '/settings')    return 'settings';
    return 'home';
  };

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    // Fire-and-forget: sync theme to backend, never block UX
    const token = localStorage.getItem('token');
    if (token) {
      axios.put(
        `${API_BASE_URL}${API_PREFIX}/update-theme`,
        { theme: next ? 'dark' : 'light' },
        { headers: { Authorization: `Bearer ${token}` } }
      ).catch(() => {});
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleMouseEnter = () => {
    if (menuTimeout) clearTimeout(menuTimeout);
    setIsAvatarMenuOpen(true);
  };
  const handleMouseLeave = () => {
    const t = setTimeout(() => setIsAvatarMenuOpen(false), 500);
    setMenuTimeout(t);
  };
  const handleNotificationClick = () => setIsNotificationOpen((p) => !p);

  if (hideHeader) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blush-100 shadow-sm dark:bg-ink-900/90 dark:border-ink-600/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <button
          onClick={() => navigate('/home')}
          className="text-2xl font-extrabold bg-gradient-to-r from-coral-500 to-violet-500 bg-clip-text text-transparent shrink-0 select-none"
        >
          AniAria
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map(({ key, path, label, Icon }) => {
            const active = getActivePage() === key;
            return (
              <button
                key={key}
                onClick={() => navigate(path)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-coral-500'
                    : 'text-ink-600 hover:text-coral-500 hover:bg-blush-50 dark:text-ink-400 dark:hover:bg-ink-600/20'
                }`}
              >
                <Icon size={17} />
                {label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-coral-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => setIsSearchOpen((p) => !p)}
            className="p-2 rounded-full hover:bg-blush-50 text-ink-600 dark:text-ink-400 dark:hover:bg-ink-600/20 transition-colors"
          >
            <Search size={20} />
          </button>

          {!userData.is_premium && (
            <button
              onClick={() => navigate('/profile')}
              className="p-2 rounded-full hover:scale-110 transition-transform text-sunshine-400"
              title="Get Premium"
            >
              <Crown size={20} />
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-full hover:bg-blush-50 text-ink-600 dark:text-ink-400 dark:hover:bg-ink-600/20 transition-colors"
            >
              <Bell size={20} />
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-ink-900 rounded-2xl shadow-xl border border-blush-100 dark:border-ink-600/20 p-4 z-50">
                <p className="text-sm text-ink-400 text-center">No notifications</p>
              </div>
            )}
          </div>

          {/* Avatar + dropdown */}
          <div
            className="relative ml-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={userData.avatar_url}
              alt="Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-coral-200 cursor-pointer"
              onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            />
            {isAvatarMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-ink-900 rounded-2xl shadow-xl border border-blush-100 dark:border-ink-600/20 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-blush-100 dark:border-ink-600/20">
                  <p className="font-semibold text-ink-900 dark:text-cream-50 text-sm truncate">{userData.username}</p>
                  {userData.is_premium && <p className="text-xs text-violet-500">Premium</p>}
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink-600 dark:text-ink-400 hover:bg-blush-50 dark:hover:bg-ink-600/20 transition-colors"
                >
                  {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-ink-600 dark:text-ink-400 hover:bg-blush-50 dark:hover:bg-ink-600/20 transition-colors"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-full hover:bg-blush-50 text-ink-600 dark:text-ink-400 ml-1 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="border-t border-blush-100 dark:border-ink-600/20 px-4 py-3 bg-white/95 dark:bg-ink-900/95 backdrop-blur-md">
          <div className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search manga, anime..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-blush-50 dark:bg-ink-600/20 border border-blush-100 dark:border-ink-600/30 text-ink-900 dark:text-cream-50 placeholder-ink-400 focus:outline-none focus:border-coral-300 text-sm"
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-blush-100 dark:border-ink-600/20 bg-white dark:bg-ink-900 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ key, path, label, Icon }) => (
            <button
              key={key}
              onClick={() => { navigate(path); setIsMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                getActivePage() === key
                  ? 'text-coral-500 bg-blush-50 dark:bg-ink-600/20'
                  : 'text-ink-600 dark:text-ink-400 hover:bg-blush-50 dark:hover:bg-ink-600/20'
              }`}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
          <button
            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-600 dark:text-ink-400 hover:bg-blush-50 dark:hover:bg-ink-600/20 transition-colors"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
