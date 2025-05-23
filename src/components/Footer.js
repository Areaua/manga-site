import React, { useState, useEffect, useCallback } from 'react';
import './Footer.css';

const Footer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setCurrentY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (startY - currentY > 50) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setCurrentY(e.clientY);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (startY - currentY > 50) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [startY, currentY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className={`footer ${isOpen ? 'footer--open' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      <div className="footer__tab">Потягни мене</div>
      <div className="footer__content">
        <p className="footer__text">Усі права захищено © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;