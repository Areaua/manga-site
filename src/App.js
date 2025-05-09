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
                        <div>
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/favourites"
                      element={
                        <div>
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <div>
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <div>
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/anime/:id"
                      element={
                        <div>
                          <HomePage savedAnimes={savedAnimes} setSavedAnimes={setSavedAnimes} hideHeader={true} />
                        </div>
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