import React from 'react';
import { Skull, HeartCrack, Sparkles, Heart, Compass, Briefcase, TrendingUp } from 'lucide-react';

const GENRE_ICONS = {
  Thriller:    Skull,
  Drama:       HeartCrack,
  Supernatural:Sparkles,
  Romance:     Heart,
  Adventure:   Compass,
  Business:    Briefcase,
};

const TOP_THIS_WEEK = [
  { rank: 1, title: 'Шеф-кухар Попелюшка', chapters: 47 },
  { rank: 2, title: 'Аніме Романтика 1',    chapters: 32 },
  { rank: 3, title: 'Інша манга',            chapters: 28 },
];

const GenrePanel = ({ genreEmojis, selectedGenre, handleGenreClick }) => {
  return (
    <div className="space-y-4">
      {/* Genre list */}
      <div className="bg-white dark:bg-ink-900 rounded-2xl p-4 shadow-sm border border-blush-100 dark:border-ink-600/20">
        <h3 className="text-base font-bold text-ink-900 dark:text-cream-50 mb-3">Browse by Genre</h3>

        <button
          onClick={() => handleGenreClick('all')}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium mb-1.5 border-2 transition-all ${
            selectedGenre === 'all'
              ? 'bg-gradient-to-r from-coral-400 to-violet-400 text-white border-transparent shadow-md'
              : 'border-ink-400/20 text-ink-600 dark:text-ink-400 hover:border-coral-400 hover:text-coral-500'
          }`}
        >
          All Genres
        </button>

        {Object.keys(genreEmojis).map((genre) => {
          const Icon   = GENRE_ICONS[genre] || Sparkles;
          const active = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`w-full flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-gradient-to-r from-coral-400 to-violet-400 text-white shadow-md'
                  : 'text-ink-600 dark:text-ink-400 hover:bg-blush-50 dark:hover:bg-ink-600/20 hover:text-violet-600'
              }`}
            >
              <Icon size={16} />
              {genre}
            </button>
          );
        })}
      </div>

      {/* Top This Week */}
      <div className="bg-white dark:bg-ink-900 rounded-2xl p-4 shadow-sm border border-blush-100 dark:border-ink-600/20">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-coral-500" />
          <h3 className="text-base font-bold text-ink-900 dark:text-cream-50">Top This Week</h3>
        </div>
        {TOP_THIS_WEEK.map(({ rank, title, chapters }) => (
          <div key={rank} className="flex items-center gap-3 py-2 border-b border-blush-100 dark:border-ink-600/20 last:border-0">
            <span className={`text-base font-extrabold w-5 text-center leading-none ${
              rank === 1 ? 'text-sunshine-400' : rank === 2 ? 'text-ink-400' : 'text-coral-400'
            }`}>
              {rank}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900 dark:text-cream-50 truncate">{title}</p>
              <p className="text-xs text-ink-400">{chapters} chapters</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePanel;
