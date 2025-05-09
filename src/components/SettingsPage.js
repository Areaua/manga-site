import React from 'react';

const SettingsPage = ({ pornFilter, togglePornFilter }) => {
  return (
    <div className="min-h-screen overflow-y-auto p-4 pt-16"> {/* Добавлен отступ сверху */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
        Settings
      </h1>
      <div className="space-y-6">
        {/* Переключатель 18+ контента */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-opacity-10 bg-gray-100 dark:bg-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
              🔞 Enable 18+ Content
            </span>
          </div>
          <div
            className={`toggle-switch-18 settings-toggle ${pornFilter ? 'active' : ''}`}
            onClick={togglePornFilter}
          />
        </div>
        {/* Пример другого пункта настроек */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-opacity-10 bg-gray-100 dark:bg-gray-700">
          <span className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
            🔔 Notifications
          </span>
          <div className="toggle-switch">
            <div className="switch" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;