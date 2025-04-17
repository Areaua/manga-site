import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import './index.css';

const App = () => {
  const [savedAnimes, setSavedAnimes] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [pornFilter, setPornFilter] = useState(false);

  const handleToggleChange = (checked) => setPornFilter(checked);

  return (
    <div className="App flex min-h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <section className="home">
        {activePage === 'home' && (
          <HomePage
            savedAnimes={savedAnimes}
            setSavedAnimes={setSavedAnimes}
            pornFilter={pornFilter}
            handleToggleChange={handleToggleChange}
          />
        )}
        {activePage === 'favourites' && (
          <FavouritesPage
            savedAnimes={savedAnimes}
            genreEmojis={{
              Thriller: '💀',
              Drama: '💔',
              Supernatural: '🔮',
              Romance: '❤️',
              Adventure: '🗺️',
              Business: '💼',
            }}
            onSaveClick={(anime) => {
              if (savedAnimes.includes(anime)) {
                setSavedAnimes(savedAnimes.filter((savedAnime) => savedAnime !== anime));
              } else {
                setSavedAnimes([...savedAnimes, anime]);
              }
            }}
            pornFilter={pornFilter}
            handleToggleChange={handleToggleChange}
          />
        )}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'settings' && (
          <SettingsPage pornFilter={pornFilter} handleToggleChange={handleToggleChange} />
        )}
      </section>
    </div>
  );
};

export default App;