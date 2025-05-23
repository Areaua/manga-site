import React, { useState, useEffect } from 'react';
import MangaSlideshow from './MangaSlideshow';
import ComicReadingPage from './ComicReadingPage';
import GenrePanel from './GenrePanel';
import Header from './Header';
import AnimeList from './AnimeList';
import AnimeDetails from './AnimeDetails';
import MultiMangaSlideshow from './MultiMangaSlideshow';
import './HomePage.css';

// Головна сторінка з мангою та аніме
const HomePage = ({ savedAnimes, setSavedAnimes, hideHeader, genreEmojis, isAdultContentEnabled, areNotificationsEnabled }) => {
  const [showComicPage, setShowComicPage] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState(null);

  // Обробка вибору жанру
  const handleGenreClick = (genre) => setSelectedGenre(genre);

  // Обробка вибору року
  const handleYearChange = (year) => setSelectedYear(year);

  // Відкриття сторінки манги
  const handleReadClick = (manga) => setShowComicPage(true);

  // Повернення назад
  const handleBackClick = () => setShowComicPage(false);

  // Вибір аніме
  const handleAnimeClick = (anime) => setSelectedAnime(anime);

  // Збереження/видалення аніме
  const handleSaveClick = (anime) => {
    const updatedAnimes = savedAnimes.includes(anime)
      ? savedAnimes.filter((savedAnime) => savedAnime.name !== anime.name)
      : [...savedAnimes, anime];
    setSavedAnimes(updatedAnimes);
    localStorage.setItem('savedAnimes', JSON.stringify(updatedAnimes));
  };

  // Список аніме
  const animes = [
    { name: 'Аніме Трилер 1', genre: 'Трилер', href: 'https://example.com/page1.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Трилер 2', genre: 'Трилер', href: 'https://example.com/page2.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Драма 1', genre: 'Драма', href: 'https://example.com/page3.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Драма 2', genre: 'Драма', href: 'https://example.com/page4.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Надприродне 1', genre: 'Надприродне', href: 'https://example.com/page5.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Надприродне 2', genre: 'Надприродне', href: 'https://example.com/page6.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Романтика 1', genre: 'Романтика', href: 'https://example.com/page7.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Романтика 2', genre: 'Романтика', href: 'https://example.com/page8.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Пригоди 1', genre: 'Пригоди', href: 'https://example.com/page9.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Пригоди 2', genre: 'Пригоди', href: 'https://example.com/page10.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Бізнес 1', genre: 'Бізнес', href: 'https://example.com/page11.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Бізнес 2', genre: 'Бізнес', href: 'https://example.com/page12.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
    { name: 'Аніме Трилер 18+', genre: 'Трилер', href: 'https://example.com/page25.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
    { name: 'Аніме Драма 18+', genre: 'Драма', href: 'https://example.com/page26.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
    { name: 'Аніме Надприродне 18+', genre: 'Надприродне', href: 'https://example.com/page27.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
    { name: 'Аніме Романтика 18+', genre: 'Романтика', href: 'https://example.com/page28.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
    { name: 'Аніме Пригоди 18+', genre: 'Пригоди', href: 'https://example.com/page29.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
    { name: 'Аніме Бізнес 18+', genre: 'Бізнес', href: 'https://example.com/page30.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: true },
  ];

  // Список манги
  const mangas = [
    { title: "Шеф-кухар Попелюшка", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Інша манга", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
    { title: "Ще одна манга", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: true, year: 2024 },
    { title: "Четверта манга", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: true, year: 2021 },
    { title: "П'ята манга", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Шоста манга", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
    { title: "Сьома манга", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2025 },
    { title: "Восьма манга", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: true, year: 2024 },
    { title: "Дев'ята манга", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2021 },
  ];

  // Фільтрація аніме за жанром і 18+
  const filteredAnimes = selectedGenre === 'all' 
    ? animes.filter(anime => isAdultContentEnabled || !anime.isAdult)
    : animes.filter(anime => anime.genre === selectedGenre && (isAdultContentEnabled || !anime.isAdult));

  // Фільтрація манги за жанром, роком і 18+
  const filteredMangas = mangas.filter((manga) => {
    const genreMatch = selectedGenre === 'all' || manga.isAdult === (selectedGenre === 'adult') || manga.genre === selectedGenre;
    const yearMatch = selectedYear === 'all' || manga.year === parseInt(selectedYear);
    return genreMatch && yearMatch && (isAdultContentEnabled || !manga.isAdult);
  });

  if (showComicPage) return <ComicReadingPage onBackClick={handleBackClick} />;
  if (selectedAnime) {
    return (
      <AnimeDetails
        selectedAnime={selectedAnime}
        genreEmojis={genreEmojis}
        onBackClick={() => setSelectedAnime(null)}
        savedAnimes={savedAnimes}
        onSaveClick={handleSaveClick}
        hideHeader={hideHeader}
      />
    );
  }

  return (
    <div className="home-page">
      <Header hideHeader={hideHeader} areNotificationsEnabled={areNotificationsEnabled} />
      <div className="home-page__content">
        <MangaSlideshow mangas={filteredMangas} onReadClick={handleReadClick} isAdultContentEnabled={isAdultContentEnabled} />
        <MultiMangaSlideshow mangas={filteredMangas} onReadClick={handleReadClick} isAdultContentEnabled={isAdultContentEnabled} />
        <AnimeList
          animes={filteredAnimes}
          handleAnimeClick={handleAnimeClick}
          genreEmojis={genreEmojis}
          savedAnimes={savedAnimes}
          onSaveClick={handleSaveClick}
        />
      </div>
      <GenrePanel
        genreEmojis={genreEmojis}
        selectedGenre={selectedGenre}
        handleGenreClick={handleGenreClick}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
      />
    </div>
  );
};

export default HomePage;