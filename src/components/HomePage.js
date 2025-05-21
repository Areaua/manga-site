import React, { useState, useEffect } from 'react';
import MangaSlideshow from './MangaSlideshow';
import ComicReadingPage from './ComicReadingPage';
import GenrePanel from './GenrePanel';
import Header from './Header';
import AnimeList from './AnimeList';
import AnimeDetails from './AnimeDetails';
import MultiMangaSlideshow from './MultiMangaSlideshow'; // New component
import './HomePage.css';

const HomePage = ({ savedAnimes, setSavedAnimes, hideHeader, genreEmojis }) => {
  const [showComicPage, setShowComicPage] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [pornFilter, setPornFilter] = useState(localStorage.getItem('pornFilter') === 'true');

  useEffect(() => {
    const handleStorageChange = () => {
      setPornFilter(localStorage.getItem('pornFilter') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleGenreClick = (genre) => setSelectedGenre(genre);
  const handleYearChange = (year) => setSelectedYear(year);
  const handleReadClick = (manga) => setShowComicPage(true);
  const handleBackClick = () => setShowComicPage(false);
  const handleAnimeClick = (anime) => setSelectedAnime(anime);
  const handleSaveClick = (anime) => {
    const updatedAnimes = savedAnimes.includes(anime)
      ? savedAnimes.filter((savedAnime) => savedAnime.name !== anime.name)
      : [...savedAnimes, anime];
    setSavedAnimes(updatedAnimes);
    localStorage.setItem('savedAnimes', JSON.stringify(updatedAnimes));
  };

  const animes = [
    { name: 'Anime Thriller 1', genre: 'Thriller', href: 'https://example.com/page1.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Thriller 2', genre: 'Thriller', href: 'https://example.com/page2.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Drama 1', genre: 'Drama', href: 'https://example.com/page3.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Drama 2', genre: 'Drama', href: 'https://example.com/page4.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Supernatural 1', genre: 'Supernatural', href: 'https://example.com/page5.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Supernatural 2', genre: 'Supernatural', href: 'https://example.com/page6.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Romance 1', genre: 'Romance', href: 'https://example.com/page7.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Romance 2', genre: 'Romance', href: 'https://example.com/page8.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Adventure 1', genre: 'Adventure', href: 'https://example.com/page9.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Adventure 2', genre: 'Adventure', href: 'https://example.com/page10.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Business 1', genre: 'Business', href: 'https://example.com/page11.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Business 2', genre: 'Business', href: 'https://example.com/page12.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
  ];

  const adultAnimes = [
    { name: 'Anime Thriller 18+', genre: 'Thriller', href: 'https://example.com/page25.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Drama 18+', genre: 'Drama', href: 'https://example.com/page26.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Supernatural 18+', genre: 'Supernatural', href: 'https://example.com/page27.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Romance 18+', genre: 'Romance', href: 'https://example.com/page28.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Adventure 18+', genre: 'Adventure', href: 'https://example.com/page29.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
    { name: 'Anime Business 18+', genre: 'Business', href: 'https://example.com/page30.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg' },
  ];

  const mangas = [
    { title: "Cinderella Chef", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Another Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
    { title: "Yet Another Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: true, year: 2024 },
    { title: "Fourth Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: true, year: 2021 },
    { title: "Fifth Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Sixth Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
    { title: "Seventh Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2025 },
    { title: "Eighth Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: true, year: 2024 },
    { title: "Ninth Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2021 },
  ];

  const filteredAnimes = selectedGenre === 'all' ? animes : animes.filter((anime) => anime.genre === selectedGenre);
  const filteredAdultAnimes = selectedGenre === 'all' ? adultAnimes : adultAnimes.filter((anime) => anime.genre === selectedGenre);
  const allAnimes = pornFilter ? [...filteredAnimes, ...filteredAdultAnimes] : filteredAnimes;

  // Filter mangas by genre and year
  let filteredMangas = mangas.filter((manga) => {
    const genreMatch = selectedGenre === 'all' || manga.isAdult === (selectedGenre === 'adult') || manga.genre === selectedGenre;
    const yearMatch = selectedYear === 'all' || manga.year === parseInt(selectedYear);
    return genreMatch && yearMatch && (pornFilter || !manga.isAdult);
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
      <Header hideHeader={hideHeader} />
      <div className="home-page__content">
        <MangaSlideshow mangas={filteredMangas} onReadClick={handleReadClick} pornFilter={pornFilter} />
        <MultiMangaSlideshow mangas={filteredMangas} onReadClick={handleReadClick} pornFilter={pornFilter} />
        <AnimeList
          animes={allAnimes}
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