import React, { useState, useEffect, useRef } from 'react';
import './MultiMangaSlideshow.css';

const MultiMangaSlideshow = ({ mangas, onReadClick, pornFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef(null);
  const slidesRef = useRef(null);
  const itemsPerSlide = 3;

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

  // Ensure at least 3 items for the slideshow
  while (filteredMangas.length < itemsPerSlide) {
    filteredMangas = [...filteredMangas, ...filteredMangas];
  }

  // Create an extended array for infinite scrolling: [last, ..., first, ..., last, ..., first]
  const totalRealSlides = Math.ceil(filteredMangas.length / itemsPerSlide);
  const extendedMangas = [
    ...filteredMangas.slice(-itemsPerSlide), // Last slide at the start
    ...filteredMangas,
    ...filteredMangas.slice(0, itemsPerSlide), // First slide at the end
  ];

  const totalSlides = Math.ceil(extendedMangas.length / itemsPerSlide);

  // Start at the first "real" slide (after the duplicated last slide)
  const [displayIndex, setDisplayIndex] = useState(1);

  useEffect(() => {
    if (filteredMangas.length === 0 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setDisplayIndex((prevIndex) => prevIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredMangas.length, isAutoPlaying]);

  // Resume auto-play after 10 seconds of manual interaction
  const resumeAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Handle transition end to reset index for infinite scrolling
  const handleTransitionEnd = () => {
    if (displayIndex === 0) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(totalRealSlides);
    } else if (displayIndex === totalSlides - 1) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(1);
    }
  };

  useEffect(() => {
    // Reset transition after changing displayIndex without animation
    if (displayIndex === totalRealSlides || displayIndex === 1) {
      slidesRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, [displayIndex]);

  const handlePrevClick = () => {
    setDisplayIndex((prevIndex) => prevIndex - 1);
    setIsAutoPlaying(false);
    resumeAutoPlay();
  };

  const handleNextClick = () => {
    setDisplayIndex((prevIndex) => prevIndex + 1);
    setIsAutoPlaying(false);
    resumeAutoPlay();
  };

  if (filteredMangas.length === 0) {
    return <div className="multi-manga-slideshow-container relative w-full h-40 overflow-hidden flex items-center justify-center text-gray-600">No manga available</div>;
  }

  return (
    <div className="multi-manga-slideshow-container">
      <div className="relative w-full h-40 overflow-hidden">
        <div
          className="multi-manga-slides"
          ref={slidesRef}
          style={{ transform: `translateX(-${displayIndex * (100 / totalSlides)}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div key={slideIndex} className="multi-manga-slide">
              {extendedMangas.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((manga, index) => (
                <div
                  key={index}
                  className="manga-item"
                  onClick={() => onReadClick(manga)}
                >
                  <img src={manga.image} alt={manga.title} className="w-full h-32 object-cover" />
                  <div className="manga-overlay">
                    <h3 className="text-sm font-bold">{manga.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default MultiMangaSlideshow;