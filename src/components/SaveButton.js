// SaveButton.js
import React from 'react';

const SaveButton = ({ isSaved, onClick }) => {
    const iconSrc = isSaved ? '/pngegg_4_.ico' : '/pngegg_3_.ico';


  return (
    <button onClick={onClick} className="focus:outline-none">
      <img src={iconSrc} alt="Save icon" className="w-8 h-8" />
    </button>
  );
};

export default SaveButton;