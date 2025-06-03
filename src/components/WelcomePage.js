import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/anime-girl.jpg')" }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white mb-4 animate-fadeIn">
          Веб-додаток для манги
        </h1>
        <p className="text-lg text-white mb-8 text-center max-w-lg animate-fadeIn">
          Ласкаво просимо у світ манги! Відкрий для себе захопливі історії та пригоди.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-orange-500 text-white px-4 py-4 rounded-full text-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 animate-pulse w-auto"
        >
          Почнімо!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;