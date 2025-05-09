import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import AnimeDetails from './components/AnimeDetails'; // Добавляем импорт AnimeDetails
import './index.css';
import './welcome-auth.css';

const App = () => {
  const [savedAnimes, setSavedAnimes] = useState(() => {
    const saved = localStorage.getItem('savedAnimes');
    return saved ? JSON.parse(saved) : [];
  });
  const [pornFilter, setPornFilter] = useState(() => localStorage.getItem('PornFilter') === 'true');

  useEffect(() => {
    localStorage.setItem('savedAnimes', JSON.stringify(savedAnimes));
  }, [savedAnimes]);

  useEffect(() => {
    localStorage.setItem('PornFilter', pornFilter);
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
            <div className="app-container">
              <div className="main-content">
                <Sidebar />
                <div className="home bg-black bg-opacity-50 min-h-screen">
                  <Routes>
                    <Route
                      path="/home"
                      element={
                        <>
                          <Header hideHeader={false} />
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} />
                        </>
                      }
                    />
                    <Route
                      path="/favourites"
                      element={
                        <>
                          <Header hideHeader={false} />
                          <FavouritesPage
                            savedAnimes={savedAnimes}
                            genreEmojis={genreEmojis}
                            onSaveClick={(anime) => {
                              if (!savedAnimes.includes(anime)) {
                                const updatedAnimes = [...savedAnimes, anime];
                                setSavedAnimes(updatedAnimes);
                              }
                            }}
                          />
                        </>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <>
                          <Header hideHeader={false} />
                          <ProfilePage />
                        </>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <>
                          <Header hideHeader={false} />
                          <SettingsPage pornFilter={pornFilter} togglePornFilter={togglePornFilter} />
                        </>
                      }
                    />
                    <Route
                      path="/anime/:id"
                      element={
                        <>
                          <Header hideHeader={true} />
                          <AnimeDetails
                            savedAnimes={savedAnimes}
                            onSaveClick={(anime) => {
                              if (!savedAnimes.includes(anime)) {
                                const updatedAnimes = [...savedAnimes, anime];
                                setSavedAnimes(updatedAnimes);
                              }
                            }}
                          />
                        </>
                      }
                    />
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;