// components/GenreSelector.js
import React, { useState } from 'react';
import './GenreSelector.css';

const GenreSelector = ({ genreEmojis, selectedGenre, handleGenreClick }) => {
  const [isGenresVisible, setIsGenresVisible] = useState(false);
  const [bouncedGenre, setBouncedGenre] = useState(null);

  const onGenreClick = (genre) => {
    setBouncedGenre(genre);
    handleGenreClick(genre);
    setTimeout(() => setBouncedGenre(null), 500);
  };

  const toggleGenres = () => {
    setIsGenresVisible(!isGenresVisible);
  };

  return (
    <div className="genre-selector-container">
      <div className="genre-toggle-wrapper">
        <button
          className={`genre-toggle-button pulse-animation ${selectedGenre === 'all' ? 'bg-gray-600' : 'bg-gray-400'}`}
          onClick={() => onGenreClick('all')}
        >
          All Genres
        </button>
        <button
          className="genre-arrow-button"
          onClick={toggleGenres}
        >
          <i className={`bx ${isGenresVisible ? 'bx-chevron-left' : 'bx-chevron-right'}`}></i>
        </button>
      </div>
      <div className={`genres-list ${isGenresVisible ? 'genres-list--visible' : ''}`}>
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
            } text-white px-4 py-2 rounded-full flex items-center genre-pulse-animation ${
              selectedGenre === genre ? 'bg-opacity-75' : ''
            } ${bouncedGenre === genre ? 'genre-bounce' : ''}`}
            onClick={() => onGenreClick(genre)}
          >
            <span className="mr-2">{genreEmojis[genre]}</span>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;