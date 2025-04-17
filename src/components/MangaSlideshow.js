import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';

const MangaSlideshow = ({ mangas, onReadClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pornFilter, setPornFilter] = useState(localStorage.getItem('pornFilter') === 'true');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mangas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mangas.length]);

  const handleToggleChange = (checked) => {
    setPornFilter(checked);
    localStorage.setItem('pornFilter', checked);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {mangas.map((manga, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={manga.image} alt={manga.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-white text-2xl font-bold">{manga.title}</h2>
            <button
              onClick={() => onReadClick(manga)}
              className="mt-4 bg-white text-black px-4 py-2 rounded-full hover:bg-opacity-80 transition-all duration-300"
            >
              Read
            </button>
          </div>
        </div>
      ))}
      <div className="absolute top-4 right-4">
        <ToggleSwitch onChange={handleToggleChange} checked={pornFilter} />
      </div>
    </div>
  );
};

export default MangaSlideshow;