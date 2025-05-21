import React, { useState } from 'react';
import './GenrePanel.css';

const GenrePanel = ({ genreEmojis, selectedGenre, handleGenreClick, selectedYear, handleYearChange }) => {
  const [bouncedGenre, setBouncedGenre] = useState(null);

  const onGenreClick = (genre) => {
    setBouncedGenre(genre);
    handleGenreClick(genre);
    setTimeout(() => setBouncedGenre(null), 500);
  };

  const years = ['all', 2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <div className="genre-panel">
      <div className="genre-panel-content">
        <button
          className={`genre-panel-button pulse-animation ${selectedGenre === 'all' ? 'bg-gray-600' : 'bg-gray-400'}`}
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
            } text-white px-4 py-2 rounded-full flex items-center genre-pulse-animation ${
              selectedGenre === genre ? 'bg-opacity-75' : ''
            } ${bouncedGenre === genre ? 'genre-bounce' : ''}`}
            onClick={() => onGenreClick(genre)}
          >
            <span className="mr-2">{genreEmojis[genre]}</span>
            {genre}
          </button>
        ))}
        <div className="year-filter mt-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default GenrePanel;