// components/BackButton.js
import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <button className="text-blue-500 flex items-center" onClick={onClick}>
      <span>🔙</span> Back
    </button>
  );
};

export default BackButton;