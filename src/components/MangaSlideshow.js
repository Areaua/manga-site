import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, BookmarkPlus, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const SLIDE_COUNT = 4;

const MangaSlideshow = ({ mangas, onReadClick, pornFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  let filtered = pornFilter ? mangas : mangas.filter((m) => !m.isAdult);

  const seen = new Set();
  filtered = filtered.filter((m) => {
    if (seen.has(m.title)) return false;
    seen.add(m.title);
    return true;
  });

  if (filtered.length < SLIDE_COUNT) {
    const extra = mangas.filter((m) => !m.isAdult && !seen.has(m.title));
    filtered = [...filtered, ...extra];
  }
  while (filtered.length > 0 && filtered.length < SLIDE_COUNT) {
    filtered = [...filtered, ...filtered];
  }
  filtered = filtered.slice(0, SLIDE_COUNT);

  const count = filtered.length;

  useEffect(() => {
    if (!isAutoPlaying || count === 0) return;
    const id = setInterval(() => setCurrentIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [isAutoPlaying, count]);

  const pauseAndResume = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const go = (dir) => {
    setCurrentIndex((i) => (i + dir + count) % count);
    pauseAndResume();
  };

  if (count === 0) {
    return (
      <div className="h-[360px] md:h-[480px] flex items-center justify-center text-ink-400 bg-blush-50 dark:bg-ink-900 rounded-2xl">
        No manga available
      </div>
    );
  }

  const manga = filtered[currentIndex];

  return (
    <div className="relative w-full h-[360px] md:h-[480px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={manga.image}
          alt={manga.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/55 to-transparent dark:from-ink-900/95 dark:via-ink-900/55" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`text-${currentIndex}`}
          className="absolute inset-y-0 left-0 flex flex-col justify-end p-6 md:p-10 max-w-[62%]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-coral-500 text-white mb-3 self-start tracking-widest uppercase">
            Featured
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-ink-900 dark:text-cream-50 leading-tight mb-2 line-clamp-2">
            {manga.title}
          </h1>

          <div className="flex items-center gap-0.5 mb-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={13}
                className={s <= 4 ? 'text-sunshine-400 fill-sunshine-400' : 'text-ink-400'}
              />
            ))}
            <span className="text-xs text-ink-400 ml-1.5">4.0</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onReadClick(manga)}
              className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white text-sm font-semibold rounded-full shadow-md transition-all hover:shadow-lg active:scale-95"
            >
              <Play size={14} fill="white" /> Start Reading
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-violet-400 text-violet-500 dark:text-violet-400 text-sm font-semibold rounded-full transition-all hover:bg-violet-50 dark:hover:bg-violet-400/10 active:scale-95">
              <BookmarkPlus size={14} /> Add to List
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-ink-900/80 text-ink-600 dark:text-ink-400 hover:text-coral-500 shadow transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-ink-900/80 text-ink-600 dark:text-ink-400 hover:text-coral-500 shadow transition-all"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {Array(count).fill(0).map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); pauseAndResume(); }}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 h-2 bg-coral-500' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MangaSlideshow;
