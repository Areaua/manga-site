import React, { useState, useEffect, useRef } from 'react';
import './MultiMangaSlideshow.css';

const MultiMangaSlideshow = ({ mangas, onReadClick, pornFilter }) => {
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

  // Ensure at least itemsPerSlide*3 items for smooth infinite scrolling
  while (filteredMangas.length < itemsPerSlide * 3) {
    filteredMangas = [...filteredMangas, ...filteredMangas];
  }

  // Create an extended array that loops both slides and items within slides
  const extendedMangas = [...filteredMangas, ...filteredMangas, ...filteredMangas];

  const totalSlides = Math.ceil(extendedMangas.length / itemsPerSlide);
  const realSlidesCount = Math.ceil(filteredMangas.length / itemsPerSlide);

  // Start at the middle section of the extended array
  const [displayIndex, setDisplayIndex] = useState(realSlidesCount);

  useEffect(() => {
    if (filteredMangas.length === 0 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setDisplayIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        // If we reach the end of extended array, reset to middle section
        return newIndex >= totalSlides - 1 ? realSlidesCount : newIndex;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredMangas.length, isAutoPlaying, totalSlides, realSlidesCount]);

  const resumeAutoPlay = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleTransitionEnd = () => {
    // Reset to middle section when near the edges
    if (displayIndex >= totalSlides - realSlidesCount) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(realSlidesCount);
    } else if (displayIndex <= 1) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(totalSlides - realSlidesCount - 1);
    }
  };

  useEffect(() => {
    // Reset transition after changing displayIndex without animation
    if (displayIndex === realSlidesCount || displayIndex === totalSlides - realSlidesCount - 1) {
      const timer = setTimeout(() => {
        slidesRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [displayIndex, realSlidesCount, totalSlides]);

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
                  key={`${slideIndex}-${index}`}
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