import React, { useState, useEffect } from 'react';
import './MangaReader.css';

const MangaReader = ({ episode, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const progress   = (currentPage / totalPages) * 100;

  useEffect(() => {
    const el = document.querySelector('.manga-container');
    if (el) el.classList.add('fade-in');
  }, []);

  return (
    <div className="manga-container fixed inset-0 z-50" style={{ backgroundColor: 'var(--body-color)' }}>
      <div className="progress-bar-container fixed top-0 left-0 w-full h-2 z-50">
        <div
          className="progress-bar h-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%`, backgroundColor: 'var(--primary-color)' }}
        />
      </div>

      <div className="flex justify-between items-center p-4 pt-8 shadow-md" style={{ backgroundColor: 'var(--sidebar-color)' }}>
        <h2
          className="text-xl font-bold max-w-[70%] truncate"
          style={{ color: 'var(--text-color)' }}
        >
          {episode}
        </h2>
        <button
          onClick={onClose}
          className="text-[var(--primary-color)] hover:scale-110 transition-transform duration-300"
        >
          <i className="fas fa-times text-2xl" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-center mb-4" style={{ color: 'var(--text-color)' }}>
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-[var(--primary-color)] hover:text-white'
            }`}
            style={{ color: 'var(--text-color)' }}
          >
            <i className="fas fa-chevron-left text-2xl" />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full transition-all duration-300 ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-[var(--primary-color)] hover:text-white'
            }`}
            style={{ color: 'var(--text-color)' }}
          >
            <i className="fas fa-chevron-right text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;
