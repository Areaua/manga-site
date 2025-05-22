import React, { useState, useEffect } from 'react';
import GenrePanel from './GenrePanel';
import MangaSlideshow from './MangaSlideshow';
import AnimeList from './AnimeList';
import ComicReadingPage from './ComicReadingPage';
import AnimeDetails from './AnimeDetails';
import Header from './Header';
import './FavouritesPage.css';

const FavouritesPage = ({ savedAnimes, genreEmojis, onSaveClick }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedManga, setSelectedManga] = useState(null);
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
  const handleMangaClick = (manga) => setSelectedManga(manga);
  const handleBackFromManga = () => setSelectedManga(null);
  const handleAnimeClick = (anime) => setSelectedAnime(anime);
  const handleBackFromAnime = () => setSelectedAnime(null);

  const filteredAnimes = selectedGenre === 'all' ? savedAnimes : savedAnimes.filter((anime) => anime.genre === selectedGenre);
  const allAnimes = pornFilter ? filteredAnimes : filteredAnimes.filter((anime) => !anime.name.includes('18+'));

  const mangas = [
    { title: "Cinderella Chef", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Another Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
    { title: "Yet Another Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: true, year: 2024 },
    { title: "Fourth Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: true, year: 2021 },
    { title: "Fifth Manga", image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg", isAdult: false, year: 2023 },
    { title: "Sixth Manga", image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg", isAdult: false, year: 2022 },
  ];

  // Фильтрация манги по жанру и году
  const filteredMangas = mangas.filter((manga) => {
    const genreMatch = selectedGenre === 'all' || manga.isAdult === (selectedGenre === 'adult') || manga.genre === selectedGenre;
    const yearMatch = selectedYear === 'all' || manga.year === parseInt(selectedYear);
    return genreMatch && yearMatch && (pornFilter || !manga.isAdult);
  });

  if (selectedManga) return <ComicReadingPage onBackClick={handleBackFromManga} />;
  if (selectedAnime) {
    return (
      <AnimeDetails
        selectedAnime={selectedAnime}
        genreEmojis={genreEmojis}
        onBackClick={handleBackFromAnime}
        savedAnimes={savedAnimes}
        onSaveClick={onSaveClick}
      />
    );
  }

  return (
    <div className="favourites-page">
      <Header />
      <div className="favourites-page__content">
        <MangaSlideshow mangas={filteredMangas} onReadClick={handleMangaClick} pornFilter={pornFilter} />
        <GenrePanel
          genreEmojis={genreEmojis}
          selectedGenre={selectedGenre}
          handleGenreClick={handleGenreClick}
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
        />
        <div className="favourites-page__anime-section">
          <h2 className="favourites-page__title">Favourites</h2>
          {allAnimes.length === 0 ? (
            <p className="favourites-page__empty">No favourites yet.</p>
          ) : (
            <AnimeList
              animes={allAnimes}
              handleAnimeClick={handleAnimeClick}
              genreEmojis={genreEmojis}
              savedAnimes={savedAnimes}
              onSaveClick={onSaveClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;