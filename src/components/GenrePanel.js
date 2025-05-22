import React, { useState, useEffect } from 'react';
import './GenrePanel.css';

const GenrePanel = ({ genreEmojis, selectedGenre, handleGenreClick }) => {
  const [bouncedGenre, setBouncedGenre] = useState(null);

  const onGenreClick = (genre) => {
    setBouncedGenre(genre);
    handleGenreClick(genre);
    setTimeout(() => setBouncedGenre(null), 500);
  };

  return (
    <div className="genre-panel">
      <div className="genre-panel-content">
        <button
          className={`genre-panel-button float-animation ${selectedGenre === 'all' ? 'bg-gray-600' : 'bg-gray-400'}`}
          onClick={() => onGenreClick('all')}
        >
          All Genres
        </button>
        {Object.keys(genreEmojis).map((genre) => (
          <button
            key={genre}
            className={`${
              genre === 'Thriller'
                ? 'bg-yellow-400'
                : genre === 'Drama'
                ? 'bg-orange-400'
                : genre === 'Supernatural'
                ? 'bg-purple-400'
                : genre === 'Romance'
                ? 'bg-pink-400'
                : genre === 'Adventure'
                ? 'bg-green-400'
                : genre === 'Business'
                ? 'bg-blue-400'
                : ''
            } text-white px-4 py-2 rounded-full flex items-center float-animation ${
              selectedGenre === genre ? 'bg-opacity-75' : ''
            } ${bouncedGenre === genre ? 'float-animation' : ''}`}
            onClick={() => onGenreClick(genre)}
          >
            <span className="mr-2">{genreEmojis[genre]}</span>
            {genre}
          </button>
        ))}
        <div className="advertisement twinkle-animation">
          Тут могла бути ваша реклама
        </div>
      </div>
    </div>
  );
};

export default GenrePanel;