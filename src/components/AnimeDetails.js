// AnimeDetails.js
import React, { useState } from 'react';
import BackButton from './BackButton';
import SaveButton from './SaveButton';

const AnimeDetails = ({ selectedAnime, genreEmojis, onBackClick, savedAnimes, onSaveClick }) => {
  const [isSaved, setIsSaved] = useState(savedAnimes.includes(selectedAnime));

  const handleSaveClick = () => {
    onSaveClick(selectedAnime);
    setIsSaved(!isSaved);
  };

  const genreColors = {
    Thriller: 'bg-yellow-400',
    Drama: 'bg-orange-400',
    Supernatural: 'bg-yellow-200 text-orange-500',
    Romance: 'bg-pink-400',
    Adventure: 'bg-green-400',
    Business: 'bg-blue-400',
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md">
        <div className="flex justify-between items-center p-4">
          <BackButton onClick={onBackClick} />
        </div>
      </div>
      <div className="p-4">
        <img src={selectedAnime.image} alt={selectedAnime.name} className="w-full h-64 object-cover rounded-lg" />
        <div className="flex items-center justify-between mt-4">
          <span className={`${genreColors[selectedAnime.genre]} text-white px-4 py-1 rounded-full`}>
            {genreEmojis[selectedAnime.genre]} {selectedAnime.genre}
          </span>
          <SaveButton isSaved={isSaved} onClick={handleSaveClick} />
        </div>
        <h2 className="text-2xl font-bold mt-4">{selectedAnime.name}</h2>
        <div className="flex items-center mt-2">
          <i className="fas fa-star text-yellow-500"></i>
          <span className="ml-2 text-gray-600">4.6/5</span>
        </div>
        <p className="text-gray-600 mt-4">
          Disappearances in the city, old mystical skin scripture and one young boy with nightmares — how are they all connected? These days are complicated for Fang Zheng, but he can’t even imagine what challenges the future has in store. Only ancient runes can help him now.
        </p>
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-bold">3 Episodes</h3>
          <button className="text-blue-500">Sort by Latest</button>
        </div>
        <div className="mt-4">
          {['Prologue', 'Episode 1', 'Episode 2'].map((episode, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-2">
              <div className="flex items-center">
                <img src="https://placehold.co/100x100" alt="Episode thumbnail" className="w-16 h-16 object-cover rounded-lg" />
                <div className="ml-4">
                  <h4 className="text-sm font-bold">{episode}</h4>
                  <p className="text-xs text-gray-500">May 20, 2024</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-500"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;