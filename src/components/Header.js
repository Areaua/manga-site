import React, { useState } from 'react';
import './Header.css';

const Header = ({ hideHeader }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const readAnimeCount = 7;
  const ranks = [
    { name: 'Новичок', threshold: 0 },
    { name: 'Фанат', threshold: 5 },
    { name: 'Мастер Аниме', threshold: 10 },
    { name: 'Легенда Аниме', threshold: 20 },
  ];

  let currentRank = ranks[0];
  let nextRank = ranks[1];

  for (let i = 0; i < ranks.length; i++) {
    if (readAnimeCount >= ranks[i].threshold) {
      currentRank = ranks[i];
      if (i + 1 < ranks.length) {
        nextRank = ranks[i + 1];
      } else {
        nextRank = null;
      }
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('Поиск:', e.target.value);
  };

  // Если hideHeader === true, не рендерим хедер
  if (hideHeader) return null;

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">AniAria</h1>
        <div className="search-bar">
          <i className="bx bx-search search-icon"></i>
          <input
            type="text"
            placeholder="Поиск аниме..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="rank-display">
          <span className="rank-title">{currentRank.name}</span>
          {nextRank && (
            <span className="rank-progress">
              ({readAnimeCount}/{nextRank.threshold} до {nextRank.name})
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;