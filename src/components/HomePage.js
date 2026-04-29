import React, { useState } from 'react';
import MangaSlideshow from './MangaSlideshow';
import ComicReadingPage from './ComicReadingPage';
import GenrePanel from './GenrePanel';
import Header from './Header';
import AnimeList from './AnimeList';
import AnimeDetails from './AnimeDetails';
import MultiMangaSlideshow from './MultiMangaSlideshow';

const ANIMES = [
  { name: 'Thriller Anime 1',      genre: 'Thriller',     href: 'https://example.com/page1.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Thriller Anime 2',      genre: 'Thriller',     href: 'https://example.com/page2.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Drama Anime 1',         genre: 'Drama',        href: 'https://example.com/page3.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Drama Anime 2',         genre: 'Drama',        href: 'https://example.com/page4.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Supernatural Anime 1',  genre: 'Supernatural', href: 'https://example.com/page5.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Supernatural Anime 2',  genre: 'Supernatural', href: 'https://example.com/page6.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Romance Anime 1',       genre: 'Romance',      href: 'https://example.com/page7.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Romance Anime 2',       genre: 'Romance',      href: 'https://example.com/page8.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Adventure Anime 1',     genre: 'Adventure',    href: 'https://example.com/page9.html',  image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Adventure Anime 2',     genre: 'Adventure',    href: 'https://example.com/page10.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Business Anime 1',      genre: 'Business',     href: 'https://example.com/page11.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
  { name: 'Business Anime 2',      genre: 'Business',     href: 'https://example.com/page12.html', image: 'https://storage.googleapis.com/a1aa/image/UiUwkO3dOFZXGp7f3JLCbH2G0WfaA5si1GHXNGdaZUErAmvTA.jpg', isAdult: false },
];

const MANGAS = [
  { title: 'Cinderella Chef',    image: 'https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg', isAdult: false, year: 2023 },
  { title: 'Shadow Chronicles',  image: 'https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg', isAdult: false, year: 2022 },
  { title: 'Starfall Academy',   image: 'https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg', isAdult: false, year: 2024 },
  { title: 'Crimson Pact',       image: 'https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg', isAdult: false, year: 2021 },
  { title: 'Bloom in Winter',    image: 'https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg', isAdult: false, year: 2023 },
  { title: 'Neon Labyrinth',     image: 'https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg', isAdult: false, year: 2022 },
  { title: 'The Seventh Gate',   image: 'https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg', isAdult: false, year: 2025 },
  { title: 'Phantom Melody',     image: 'https://storage.googleapis.com/a1aa/image/UdGsLfffIlcz0pfHAkLoBI5wXDPVzyzSdEOSNvA67M7NugedC.jpg', isAdult: false, year: 2024 },
  { title: 'Iron Blossom',       image: 'https://storage.googleapis.com/a1aa/image/aBzENfwKiJzoRKKEAQkYIdYlnVDuoReOHeTosFLUxdbEXQfOB.jpg', isAdult: false, year: 2021 },
];

const HomePage = ({ savedAnimes, setSavedAnimes, hideHeader, genreEmojis, isAdultContentEnabled, areNotificationsEnabled }) => {
  const [showComicPage, setShowComicPage] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear]   = useState('all');
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleSaveClick = (anime) => {
    const updated = savedAnimes.includes(anime)
      ? savedAnimes.filter((a) => a.name !== anime.name)
      : [...savedAnimes, anime];
    setSavedAnimes(updated);
    localStorage.setItem('savedAnimes', JSON.stringify(updated));
  };

  const filteredAnimes = ANIMES.filter(
    (a) => (selectedGenre === 'all' || a.genre === selectedGenre) && (isAdultContentEnabled || !a.isAdult)
  );

  const filteredMangas = MANGAS.filter((m) => {
    const yearOk  = selectedYear === 'all' || m.year === parseInt(selectedYear);
    const adultOk = isAdultContentEnabled || !m.isAdult;
    return yearOk && adultOk;
  });

  if (showComicPage) return <ComicReadingPage onBackClick={() => setShowComicPage(false)} />;

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
    <div className="min-h-screen">
      <Header hideHeader={hideHeader} areNotificationsEnabled={areNotificationsEnabled} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6 items-start">

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-8">
            <MangaSlideshow
              mangas={filteredMangas}
              onReadClick={() => setShowComicPage(true)}
              pornFilter={isAdultContentEnabled}
            />

            <section>
              <h2 className="text-lg font-bold text-ink-900 dark:text-cream-50 mb-4">New &amp; Trending</h2>
              <MultiMangaSlideshow
                mangas={filteredMangas}
                onReadClick={() => setShowComicPage(true)}
                pornFilter={isAdultContentEnabled}
                savedAnimes={savedAnimes}
                onSaveClick={handleSaveClick}
              />
            </section>

            <AnimeList
              animes={filteredAnimes}
              handleAnimeClick={(anime) => setSelectedAnime(anime)}
              genreEmojis={genreEmojis}
              savedAnimes={savedAnimes}
              onSaveClick={handleSaveClick}
            />
          </main>

          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-20">
              <GenrePanel
                genreEmojis={genreEmojis}
                selectedGenre={selectedGenre}
                handleGenreClick={(g) => setSelectedGenre(g)}
                selectedYear={selectedYear}
                handleYearChange={(y) => setSelectedYear(y)}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
