import React, { useState, useEffect, useRef } from 'react';
import './MangaSlideshow.css';

const MangaSlideshow = ({ mangas, onReadClick, pornFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef(null);

  useEffect(() => {
    if (mangas.length === 0 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [mangas.length, isAutoPlaying]);

  // Resume auto-play after 10 seconds of manual interaction
  const resumeAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Filter mangas: remove adult content if pornFilter is off
  let filteredMangas = pornFilter ? mangas : mangas.filter((manga) => !manga.isAdult);

  // Remove duplicates based on title
  const uniqueMangas = [];
  const seenTitles = new Set();
  for (const manga of filteredMangas) {
    if (!seenTitles.has(manga.title)) {
      seenTitles.add(manga.title);
      uniqueMangas.push(manga);
    }
  }
  filteredMangas = uniqueMangas;

  // Ensure 4 slides: add non-adult mangas if needed
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

  // Duplicate slides if still less than 4
  while (filteredMangas.length < 4) {
    filteredMangas = [...filteredMangas, ...filteredMangas].slice(0, 4);
  }

  if (filteredMangas.length === 0) {
    return <div className="manga-slideshow-container relative w-full h-40 overflow-hidden flex items-center justify-center text-gray-600">No manga available</div>;
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    resumeAutoPlay();
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
    setIsAutoPlaying(false);
    resumeAutoPlay();
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    setIsAutoPlaying(false);
    resumeAutoPlay();
  };

  return (
    <div className="manga-slideshow-container">
      <div className="relative w-full h-40 overflow-hidden">
        {filteredMangas.slice(0, 4).map((manga, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={manga.image} alt={manga.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-white text-lg font-bold">{manga.title}</h2>
              <button
                onClick={() => onReadClick(manga)}
                className="read-button mt-4 px-3 py-1 rounded-full transition-all duration-300 relative z-10"
              >
                Read
              </button>
            </div>
          </div>
        ))}
        <button
          className="slideshow-arrow slideshow-arrow-left"
          onClick={handlePrevClick}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className="slideshow-arrow slideshow-arrow-right"
          onClick={handleNextClick}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
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