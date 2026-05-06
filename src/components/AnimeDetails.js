import React, { useState } from 'react';
import BackButton from './BackButton';
import SaveButton from './SaveButton';
import MangaReader from './MangaReader';

const AnimeDetails = ({ selectedAnime, genreEmojis, onBackClick, savedAnimes, onSaveClick, hideHeader }) => {
  const [isSaved, setIsSaved] = useState(savedAnimes.includes(selectedAnime));
  const [isMangaOpen, setIsMangaOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSaveClick = () => {
    onSaveClick(selectedAnime);
    setIsSaved(!isSaved);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    setIsMangaOpen(true);
  };

  const handleMangaClose = () => {
    setIsMangaOpen(false);
    setSelectedEpisode(null);
  };

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.history.back();
    }
  };

  const handleSortClick = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const genreColors = {
    Thriller: 'bg-yellow-400 text-white',
    Drama: 'bg-orange-400 text-white',
    Supernatural: 'bg-yellow-200 text-orange-500 dark:text-blue-300',
    Romance: 'bg-pink-400 text-white',
    Adventure: 'bg-green-400 text-white',
    Business: 'bg-orange-400 dark:bg-blue-500 text-white',
  };

  const episodes = [
    { name: 'Prologue', date: '2024-05-20' },
    { name: 'Episode 1', date: '2024-05-20' },
    { name: 'Episode 2', date: '2024-05-20' },
  ];

  const sortedEpisodes = [...episodes].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--body-color)' }}>
      {isMangaOpen && selectedEpisode ? (
        <MangaReader episode={selectedEpisode} onClose={handleMangaClose} />
      ) : (
        <>
          <div className="shadow-md z-[9999] relative" style={{ backgroundColor: 'var(--sidebar-color)' }}>
            <div className="flex justify-between items-center px-4 py-2">
              <BackButton onClick={handleBackClick} />
            </div>
          </div>
          <div className="px-4 py-2 w-full max-w-[1400px] mx-auto">
            <img src={selectedAnime.image} alt={selectedAnime.name} className="w-full h-64 object-cover rounded-lg fade-in" />
            <div className="flex items-center justify-between mt-4">
              <span className={`${genreColors[selectedAnime.genre]} px-4 py-1 rounded-full fade-in`}>
                {genreEmojis[selectedAnime.genre]} {selectedAnime.genre}
              </span>
              <SaveButton isSaved={isSaved} onClick={handleSaveClick} />
            </div>
            <h2 className="text-2xl font-bold mt-4 fade-in-down" style={{ color: 'var(--text-color)' }}>
              {selectedAnime.name}
            </h2>
            <div className="flex items-center mt-2 fade-in">
              <i className="fas fa-star text-yellow-500"></i>
              <span className="ml-2" style={{ color: 'var(--text-color)' }}>
                4.6/5
              </span>
            </div>
            <p className="mt-4 fade-in" style={{ color: 'var(--text-color)' }}>
              Disappearances in the city, old mystical skin scripture and one young boy with nightmares — how are they all connected? These days are complicated for Fang Zheng, but he can't even imagine what challenges the future has in store. Only ancient runes can help him now.
            </p>
            <div className="flex justify-between items-center mt-6">
              <h3 className="text-lg font-bold fade-in" style={{ color: 'var(--text-color)' }}>
                3 Episodes
              </h3>
              <button
                onClick={handleSortClick}
                className="px-4 py-1 rounded-full bg-[var(--primary-color-light)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300 hover:scale-105 shadow-md"
              >
                Sort by {sortOrder === 'desc' ? 'Oldest' : 'Latest'}
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {sortedEpisodes.map((episode, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 bg-[var(--sidebar-color)] hover:bg-[var(--primary-color)] group fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => handleEpisodeClick(episode.name)}
                >
                  <div className="flex items-center w-full">
                    <img src="https://placehold.co/100x100" alt="Episode thumbnail" className="w-16 h-16 object-cover rounded-lg" />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-bold transition-colors duration-300 group-hover:text-white" style={{ color: 'var(--text-color)' }}>
                        {episode.name}
                      </h4>
                      <p className="text-xs transition-colors duration-300 group-hover:text-white" style={{ color: 'var(--text-color)' }}>
                        {episode.date}
                      </p>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right transition-colors duration-300 group-hover:text-white" style={{ color: 'var(--text-color)' }}></i>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeDetails;