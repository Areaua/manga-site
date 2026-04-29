import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ITEMS_PER_SLIDE = 3;

const BADGE_LABEL = ['HOT', 'NEW', 'ONGOING'];
const BADGE_COLOR  = ['bg-coral-500', 'bg-violet-500', 'bg-sunshine-400 text-ink-900'];

const MangaCard = ({ manga, index, onClick, saved, onSave }) => {
  const badge = BADGE_LABEL[index % 3];
  const badgeColor = BADGE_COLOR[index % 3];

  return (
    <div
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-ink-900 shadow-sm border border-blush-100 dark:border-ink-600/20 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={manga.image}
          alt={manga.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${badgeColor}`}>
          {badge}
        </span>

        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/50 backdrop-blur-sm rounded-full px-1.5 py-0.5">
          <Star size={10} className="text-sunshine-400 fill-sunshine-400" />
          <span className="text-[10px] font-semibold text-white">4.{(index % 5) + 1}</span>
        </div>

        {onSave && (
          <button
            onClick={(e) => { e.stopPropagation(); onSave(manga); }}
            className={`absolute bottom-2 right-2 w-7 h-7 flex items-center justify-center rounded-full shadow transition-all ${
              saved ? 'bg-coral-500 text-white' : 'bg-white/80 text-ink-600 hover:bg-coral-500 hover:text-white'
            }`}
          >
            <Heart size={13} fill={saved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="p-2.5">
        <p className="text-xs font-semibold text-ink-900 dark:text-cream-50 line-clamp-2 leading-snug">
          {manga.title}
        </p>
      </div>
    </div>
  );
};

const MultiMangaSlideshow = ({ mangas, onReadClick, pornFilter, savedAnimes = [], onSaveClick }) => {
  const slidesRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  let filtered = pornFilter ? mangas : mangas.filter((m) => !m.isAdult);

  const seen = new Set();
  filtered = filtered.filter((m) => {
    if (seen.has(m.title)) return false;
    seen.add(m.title);
    return true;
  });

  while (filtered.length < ITEMS_PER_SLIDE * 3) {
    filtered = [...filtered, ...filtered];
  }

  const extended = [...filtered, ...filtered, ...filtered];
  const totalSlides = Math.ceil(extended.length / ITEMS_PER_SLIDE);
  const realSlides  = Math.ceil(filtered.length / ITEMS_PER_SLIDE);

  const [displayIndex, setDisplayIndex] = useState(realSlides);

  useEffect(() => {
    if (filtered.length === 0 || !isAutoPlaying) return;
    const id = setInterval(() => {
      setDisplayIndex((i) => {
        const next = i + 1;
        return next >= totalSlides - 1 ? realSlides : next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [filtered.length, isAutoPlaying, totalSlides, realSlides]);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTransitionEnd = () => {
    if (!slidesRef.current) return;
    if (displayIndex >= totalSlides - realSlides) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(realSlides);
    } else if (displayIndex <= 1) {
      slidesRef.current.style.transition = 'none';
      setDisplayIndex(totalSlides - realSlides - 1);
    }
  };

  useEffect(() => {
    if (!slidesRef.current) return;
    if (displayIndex === realSlides || displayIndex === totalSlides - realSlides - 1) {
      const t = setTimeout(() => {
        if (slidesRef.current) slidesRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
      return () => clearTimeout(t);
    }
  }, [displayIndex, realSlides, totalSlides]);

  const go = (dir) => {
    setDisplayIndex((i) => i + dir);
    pauseAndResume();
  };

  if (filtered.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-ink-400 bg-blush-50 dark:bg-ink-900 rounded-2xl">
        No manga available
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div
        ref={slidesRef}
        className="flex"
        style={{
          transform: `translateX(-${displayIndex * (100 / totalSlides)}%)`,
          width: `${totalSlides * 100}%`,
          transition: 'transform 0.5s ease-in-out',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {Array.from({ length: totalSlides }, (_, slideIdx) => (
          <div
            key={slideIdx}
            className="grid gap-3"
            style={{
              width: `${100 / totalSlides}%`,
              gridTemplateColumns: `repeat(${ITEMS_PER_SLIDE}, 1fr)`,
            }}
          >
            {extended
              .slice(slideIdx * ITEMS_PER_SLIDE, (slideIdx + 1) * ITEMS_PER_SLIDE)
              .map((manga, i) => {
                const isSaved = savedAnimes.some
                  ? savedAnimes.some((a) => a.name === manga.title || a.title === manga.title)
                  : false;
                return (
                  <MangaCard
                    key={`${slideIdx}-${i}`}
                    manga={manga}
                    index={slideIdx * ITEMS_PER_SLIDE + i}
                    onClick={() => onReadClick(manga)}
                    saved={isSaved}
                    onSave={onSaveClick}
                  />
                );
              })}
          </div>
        ))}
      </div>

      <button
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-ink-900 shadow border border-blush-100 dark:border-ink-600/20 text-ink-600 dark:text-ink-400 hover:text-coral-500 transition-all z-10"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-ink-900 shadow border border-blush-100 dark:border-ink-600/20 text-ink-600 dark:text-ink-400 hover:text-coral-500 transition-all z-10"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default MultiMangaSlideshow;
