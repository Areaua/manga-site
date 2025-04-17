import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const SettingsPage = ({ pornFilter, handleToggleChange }) => {
  return (
    <div className="min-h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>
          Settings
        </h2>
        <div
          className="flex items-center justify-between p-4 rounded-lg shadow-md"
          style={{ backgroundColor: 'var(--primary-color-light)', border: '2px solid var(--primary-color)' }}
        >
          <span className="text-lg" style={{ color: 'var(--text-color)' }}>
            Show 18+ Content
          </span>
          <ToggleSwitch onChange={handleToggleChange} checked={pornFilter} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;