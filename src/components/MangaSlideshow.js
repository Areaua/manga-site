import React, { useState, useEffect } from 'react';

const MangaSlideshow = ({ mangas, onReadClick, pornFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (mangas.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4); // Всегда 4 слайда
    }, 5000);
    return () => clearInterval(interval);
  }, [mangas.length]);

  // Фильтруем мангу: если pornFilter выключен, заменяем adult-контент на другие слайды
  let filteredMangas = pornFilter ? mangas : mangas.filter((manga) => !manga.isAdult);

  // Удаляем дубликаты на основе title
  const uniqueMangas = [];
  const seenTitles = new Set();
  for (const manga of filteredMangas) {
    if (!seenTitles.has(manga.title)) {
      seenTitles.add(manga.title);
      uniqueMangas.push(manga);
    }
  }
  filteredMangas = uniqueMangas;

  // Если после фильтрации меньше 4 слайдов, добавляем недостающие из не-adult контента
  if (filteredMangas.length < 4) {
    const nonAdultMangas = mangas.filter((manga) => !manga.isAdult);
    const uniqueNonAdultMangas = [];
    for (const manga of nonAdultMangas) {
      if (!seenTitles.has(manga.title)) {
        seenTitles.add(manga.title);
        uniqueNonAdultMangas.push(manga);
      }
    }
    filteredMangas = [...filteredMangas, ...uniqueNonAdultMangas].slice(0, 4);
  }

  // Если всё ещё меньше 4 слайдов, дублируем существующие
  while (filteredMangas.length < 4) {
    filteredMangas = [...filteredMangas, ...filteredMangas].slice(0, 4);
  }

  if (filteredMangas.length === 0) {
    return <div className="manga-slideshow-container relative w-full h-64 overflow-hidden flex items-center justify-center text-gray-600">No manga available</div>;
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="manga-slideshow-container">
      <div className="relative w-full h-64 overflow-hidden">
        {filteredMangas.slice(0, 4).map((manga, index) => (
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
                className="read-button mt-4 px-4 py-2 rounded-full transition-all duration-300 relative z-10"
              >
                Read
              </button>
            </div>
          </div>
        ))}
        <div className="slider-dots">
          {Array(4).fill(0).map((_, index) => (
            <span
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MangaSlideshow;