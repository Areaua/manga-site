import React from 'react';

const Header = () => {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold" style={{ color: 'var(--primary-color)' }}>
        Anime Hub
      </h1>
    </div>
  );
};

export default Header;