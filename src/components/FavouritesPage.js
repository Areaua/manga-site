import React, { useState } from 'react';
import AnimeCard from './AnimeCard';
import GenreSelector from './GenreSelector';
import MangaSlideshow from './MangaSlideshow';
import ComicReadingPage from './ComicReadingPage';
import AnimeDetails from './AnimeDetails';
import Header from './Header';

const FavouritesPage = ({ savedAnimes, genreEmojis, onSaveClick }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedManga, setSelectedManga] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [pornFilter, setPornFilter] = useState(localStorage.getItem('pornFilter') === 'true');

  const handleGenreClick = (genre) => setSelectedGenre(genre);
  const handleMangaClick = (manga) => setSelectedManga(manga);
  const handleBackFromManga = () => setSelectedManga(null);
  const handleAnimeClick = (anime) => setSelectedAnime(anime);
  const handleBackFromAnime = () => setSelectedAnime(null);

  const filteredAnimes = selectedGenre === 'all' ? savedAnimes : savedAnimes.filter((anime) => anime.genre === selectedGenre);
  const allAnimes = pornFilter ? filteredAnimes : filteredAnimes.filter((anime) => !anime.name.includes('18+'));

  const mangas = [
    {
      title: "Cinderella Chef",
      image: "https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg"
    },
    {
      title: "Another Manga",
      image: "https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg"
    },
    {
      title: "Yet Another Manga",
      image: "https://storage.googleapis.com/a1aa/image/3.jpg"
    },
    {
      title: "Fourth Manga",
      image: "https://storage.googleapis.com/a1aa/image/XzBJtjW6lypKPF4VLR6QDMAyilFn9ulNcm8EXLiZtxyaey3JA.jpg"
    }
  ];

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
    <div className="min-h-screen overflow-y-auto">
      <Header />
      <MangaSlideshow mangas={mangas} onReadClick={handleMangaClick} />
      <GenreSelector genreEmojis={genreEmojis} selectedGenre={selectedGenre} handleGenreClick={handleGenreClick} />
      <div className="p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
          Favourites
        </h2>
        {allAnimes.length === 0 ? (
          <p className="text-gray-600">No favourites yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {allAnimes.map((anime, index) => (
              <AnimeCard
                key={index}
                anime={anime}
                onClick={() => handleAnimeClick(anime)}
                genreEmojis={genreEmojis}
                savedAnimes={savedAnimes}
                onSaveClick={onSaveClick}
                showSaveButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;