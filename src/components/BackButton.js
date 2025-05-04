import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <button
      className="flex items-center text-[var(--primary-color)] hover:scale-105 active:scale-95 transition-transform duration-300"
      onClick={onClick}
    >
      <i className="fas fa-arrow-left mr-2"></i>
      Back
    </button>
  );
};

export default BackButton;