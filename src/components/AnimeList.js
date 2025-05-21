// components/AnimeList.js
import React, { useState } from 'react';
import AnimeCard from './AnimeCard';
import './AnimeList.css';

const AnimeList = ({ animes, handleAnimeClick, genreEmojis, savedAnimes, onSaveClick }) => {
  const [bannersPerRow, setBannersPerRow] = useState(2); // По умолчанию 2 баннера в ряду

  const handleLayoutChange = (num) => {
    setBannersPerRow(num);
  };

  return (
    <div className="anime-list">
      <div className="layout-controls">
        <button
          onClick={() => handleLayoutChange(2)}
          className={`layout-button ${bannersPerRow === 2 ? 'active' : ''}`}
        >
          ● ●
        </button>
        <button
          onClick={() => handleLayoutChange(4)}
          className={`layout-button ${bannersPerRow === 4 ? 'active' : ''}`}
        >
          ● ●<br />● ●
        </button>
        <button
          onClick={() => handleLayoutChange(8)}
          className={`layout-button ${bannersPerRow === 8 ? 'active' : ''}`}
        >
          ● ● ● ●<br />● ● ● ●
        </button>
      </div>
      <div className={`anime-grid banners-${bannersPerRow}`}>
        {animes.map((anime, index) => (
          <div key={index} className="anime-card-wrapper">
            <AnimeCard
              anime={anime}
              onClick={() => handleAnimeClick(anime)}
              genreEmojis={genreEmojis}
              savedAnimes={savedAnimes}
              onSaveClick={onSaveClick}
            />
            <span className="new-label">NEW</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;