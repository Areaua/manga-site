import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import './index.css';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [savedAnimes, setSavedAnimes] = useState(() => {
    const saved = localStorage.getItem('savedAnimes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedAnimes', JSON.stringify(savedAnimes));
  }, [savedAnimes]);

  const genreEmojis = {
    Thriller: '💀',
    Drama: '💔',
    Supernatural: '🔮',
    Romance: '❤️',
    Adventure: '🗺️',
    Business: '💼',
  };

  return (
    <div>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="home">
        {activePage === 'home' && <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} />}
        {activePage === 'favourites' && (
          <FavouritesPage
            savedAnimes={savedAnimes}
            genreEmojis={genreEmojis}
            onSaveClick={(anime) => {
              const updatedAnimes = savedAnimes.includes(anime)
                ? savedAnimes.filter((savedAnime) => savedAnime.name !== anime.name)
                : [...savedAnimes, anime];
              setSavedAnimes(updatedAnimes);
            }}
          />
        )}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
};

export default App;