import React from 'react';
import AnimeCard from './AnimeCard';

const AnimeList = ({ animes, handleAnimeClick, genreEmojis, savedAnimes, onSaveClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {animes.map((anime, index) => (
        <AnimeCard 
          key={index} 
          anime={anime} 
          onClick={() => handleAnimeClick(anime)} 
          genreEmojis={genreEmojis} 
          savedAnimes={savedAnimes} 
          onSaveClick={onSaveClick} 
        />
      ))}
    </div>
  );
};

export default AnimeList;