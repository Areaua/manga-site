import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import './index.css';
import './welcome-auth.css';

const App = () => {
  const [savedAnimes, setSavedAnimes] = useState(() => {
    const saved = localStorage.getItem('savedAnimes');
    return saved ? JSON.parse(saved) : [];
  });
  const [pornFilter, setPornFilter] = useState(() => localStorage.getItem('pornFilter') === 'true');

  useEffect(() => {
    localStorage.setItem('savedAnimes', JSON.stringify(savedAnimes));
  }, [savedAnimes]);

  useEffect(() => {
    localStorage.setItem('pornFilter', pornFilter);
  }, [pornFilter]);

  const togglePornFilter = () => setPornFilter(!pornFilter);

  const genreEmojis = {
    Thriller: '💀',
    Drama: '💔',
    Supernatural: '🔮',
    Romance: '❤️',
    Adventure: '🗺️',
    Business: '💼',
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <div>
              <Sidebar />
              <div className="home bg-black bg-opacity-50 min-h-screen">
                <Routes>
                  <Route
                    path="/home"
                    element={<HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} />}
                  />
                  <Route
                    path="/favourites"
                    element={
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
                    }
                  />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/settings"
                    element={
                      <SettingsPage pornFilter={pornFilter} togglePornFilter={togglePornFilter} />
                    }
                  />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;