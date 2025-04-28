import React, { useState, useEffect } from 'react';
import Header from './Header';

const SettingsPage = () => {
  const [pornFilter, setPornFilter] = useState(localStorage.getItem('pornFilter') === 'true');

  useEffect(() => {
    localStorage.setItem('pornFilter', pornFilter);
  }, [pornFilter]);

  const handlePornFilterChange = (e) => {
    setPornFilter(e.target.checked);
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
          Settings
        </h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg" style={{ color: 'var(--text-color)' }}>
            Show 18+ Content
          </span>
          <label className="relative inline-block">
            <input
              type="checkbox"
              checked={pornFilter}
              onChange={handlePornFilterChange}
              className="opacity-0 w-0 h-0"
            />
            <span
              className={`toggle-switch-18 ${pornFilter ? 'active' : ''}`}
              style={{ display: 'block', width: '40px', height: '22px' }}
            ></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;