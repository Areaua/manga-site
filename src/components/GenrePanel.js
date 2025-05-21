import React, { useState, useEffect } from 'react';
import './GenrePanel.css';

const GenrePanel = ({ genreEmojis, selectedGenre, handleGenreClick, selectedYear, handleYearChange }) => {
  const [bouncedGenre, setBouncedGenre] = useState(null);
  const [yearValue, setYearValue] = useState(selectedYear === 'all' ? 2025 : parseInt(selectedYear));
  const [valueChanged, setValueChanged] = useState(false);

  const onGenreClick = (genre) => {
    setBouncedGenre(genre);
    handleGenreClick(genre);
    setTimeout(() => setBouncedGenre(null), 500);
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setYearValue(value);
    setValueChanged(true);
    handleYearChange(value.toString());
  };

  useEffect(() => {
    if (valueChanged) {
      const timer = setTimeout(() => setValueChanged(false), 500);
      return () => clearTimeout(timer);
    }
  }, [valueChanged]);

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
        <div className="year-slider">
          <label htmlFor="yearRange">Year: {yearValue}</label>
          <div className="year-slider-container">
            <span>1998</span>
            <input
              type="range"
              id="yearRange"
              min="1998"
              max="2025"
              value={yearValue}
              onChange={handleSliderChange}
              className="year-slider-input"
            />
            <span>2025</span>
            <span className={`year-slider-value ${valueChanged ? 'changed' : ''}`}>
              {yearValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePanel;