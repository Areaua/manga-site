// components/Footer.js
import React from 'react';

const Footer = ({ activePage, setActivePage }) => {
  return (
    <div className="bg-white fixed bottom-0 w-full flex justify-around items-center py-2 border-t border-gray-200" style={{ height: '60px' }}>
      <div 
        className={`flex flex-col items-center footer-button-animation ${activePage === 'home' ? 'text-orange-500' : 'text-gray-400'}`} 
        onClick={() => setActivePage('home')}
      >
        <i className="fas fa-home text-2xl"></i>
        <span className="text-xs">Home</span>
      </div>
      <div 
        className={`flex flex-col items-center footer-button-animation ${activePage === 'favourites' ? 'text-orange-500' : 'text-gray-400'}`} 
        onClick={() => setActivePage('favourites')}
      >
        <i className="fas fa-heart text-2xl"></i>
        <span className="text-xs">Favourites</span>
      </div>
      <div 
        className={`flex flex-col items-center footer-button-animation ${activePage === 'profile' ? 'text-orange-500' : 'text-gray-400'}`} 
        onClick={() => setActivePage('profile')}
      >
        <i className="fas fa-user text-2xl"></i>
        <span className="text-xs">Profile</span>
      </div>
    </div>
  );
};

export default Footer;