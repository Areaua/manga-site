import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import HomePage from './components/HomePage';
import FavouritesPage from './components/FavouritesPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import AnimeDetails from './components/AnimeDetails';
import Footer from './components/Footer';
import './index.css';
import './welcome-auth.css';

// Компонент-обгортка для деталей аніме
const AnimeDetailsWrapper = ({ savedAnimes, setSavedAnimes }) => {
  const { id } = useParams();
  const anime = [...savedAnimes].find(a => a.name === id);

  return (
    <AnimeDetails
      selectedAnime={anime || { name: id, genre: 'Невідомо', href: '#', image: '' }}
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
  // Стан для збережених аніме
  const [savedAnimes, setSavedAnimes] = useState(() => {
    const saved = localStorage.getItem('savedAnimes');
    return saved ? JSON.parse(saved) : [];
  });

  // Стан для фільтра 18+ (вимкнено за замовчуванням)
  const [isAdultContentEnabled, setIsAdultContentEnabled] = useState(() => 
    localStorage.getItem('isAdultContentEnabled') === 'true' || false
  );

  // Стан для сповіщень (увімкнено за замовчуванням)
  const [areNotificationsEnabled, setAreNotificationsEnabled] = useState(() => 
    localStorage.getItem('areNotificationsEnabled') === 'true' || true
  );

  useEffect(() => {
    localStorage.setItem('savedAnimes', JSON.stringify(savedAnimes));
  }, [savedAnimes]);

  useEffect(() => {
    localStorage.setItem('isAdultContentEnabled', isAdultContentEnabled);
  }, [isAdultContentEnabled]);

  useEffect(() => {
    localStorage.setItem('areNotificationsEnabled', areNotificationsEnabled);
  }, [areNotificationsEnabled]);

  // Емодзі для жанрів
  const genreEmojis = {
    Thriller: '💀',
    Drama: '💔',
    Supernatural: '🔮',
    Romance: '❤️',
    Adventure: '🗺️',
    Business: '💼',
  };

  // Обробка збереження/видалення аніме
  const handleSaveClick = (anime) => {
    const updatedAnimes = savedAnimes.includes(anime)
      ? savedAnimes.filter((savedAnime) => savedAnime.name !== anime.name)
      : [...savedAnimes, anime];
    setSavedAnimes(updatedAnimes);
    localStorage.setItem('savedAnimes', JSON.stringify(updatedAnimes));
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
                <div className="home bg-black bg-opacity-50 min-h-screen">
                  <Routes>
                    <Route
                      path="/home"
                      element={
                        <HomePage
                          savedAnimes={savedAnimes}
                          setSavedAnimes={setSavedAnimes}
                          hideHeader={false}
                          genreEmojis={genreEmojis}
                        />
                      }
                    />
                    <Route
                      path="/favourites"
                      element={
                        <FavouritesPage
                          savedAnimes={savedAnimes}
                          setSavedAnimes={setSavedAnimes}
                          onSaveClick={handleSaveClick}
                          hideHeader={false}
                          genreEmojis={genreEmojis}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={<ProfilePage hideHeader={false} />}
                    />
                    <Route
                      path="/settings"
                      element={
                        <SettingsPage
                          isAdultContentEnabled={isAdultContentEnabled}
                          toggleAdultContent={() => setIsAdultContentEnabled(!isAdultContentEnabled)}
                          areNotificationsEnabled={areNotificationsEnabled}
                          toggleNotifications={() => setAreNotificationsEnabled(!areNotificationsEnabled)}
                          hideHeader={false}
                        />
                      }
                    />
                    <Route
                      path="/anime/:id"
                      element={
                        <AnimeDetailsWrapper
                          savedAnimes={savedAnimes}
                          setSavedAnimes={setSavedAnimes}
                        />
                      }
                    />
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;