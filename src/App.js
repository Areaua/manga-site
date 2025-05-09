import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import AnimeDetails from './components/AnimeDetails';
import './index.css';
import './welcome-auth.css';

// Компонент-обёртка для обработки параметра :id
const AnimeDetailsWrapper = ({ savedAnimes, setSavedAnimes }) => {
  const { id } = useParams();
  const anime = [...savedAnimes].find(a => a.name === id); // Ищем аниме по имени (можно изменить логику поиска)

  return (
    <AnimeDetails
      selectedAnime={anime || { name: id, genre: 'Unknown', href: '#', image: '' }} // Заглушка, если аниме не найдено
      savedAnimes={savedAnimes}
      onSaveClick={(anime) => {
        const updatedAnimes = savedAnimes.includes(anime)
          ? savedAnimes.filter((savedAnime) => savedAnime.name !== anime.name)
          : [...savedAnimes, anime];
        setSavedAnimes(updatedAnimes);
        localStorage.setItem('savedAnimes', JSON.stringify(updatedAnimes));
      }}
      onBackClick={() => window.history.back()}
      hideHeader={true}
    />
  );
};

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
                          <HomePage
                            savedAnimes={savedAnimes}
                            setSavedAnimes={setSavedAnimes}
                            hideHeader={false}
                            genreEmojis={genreEmojis}
                          />
                        </div>
                      }
                    />
                    <Route
                      path="/favourites"
                      element={
                        <div>
                          <FavouritesPage
                            savedAnimes={savedAnimes}
                            setSavedAnimes={setSavedAnimes}
                            hideHeader={false}
                            genreEmojis={genreEmojis}
                          />
                        </div>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <div>
                          <ProfilePage hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <div>
                          <SettingsPage hideHeader={false} />
                        </div>
                      }
                    />
                    <Route
                      path="/anime/:id"
                      element={
                        <div>
                          <AnimeDetailsWrapper
                            savedAnimes={savedAnimes}
                            setSavedAnimes={setSavedAnimes}
                          />
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