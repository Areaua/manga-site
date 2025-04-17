import React, { useState, useEffect } from 'react';
import Header from './Header';

const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    photo_url: '',
    registered_at: '',
  });
  const [updateStatus, setUpdateStatus] = useState('');

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const telegramId = getCookie('tg_id');
        if (telegramId) {
          const response = await fetch(`https://manga.pagekite.me/api/v1/users/${telegramId}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setUserData({
            username: data.data.username || '',
            photo_url: data.data.photo_url || '',
            registered_at: data.data.registrated_at
              ? new Date(data.data.registrated_at).toLocaleDateString()
              : '',
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveUsername = async (newUsername) => {
    try {
      const telegramId = getCookie('tg_id');
      if (telegramId) {
        const response = await fetch(`https://manga.pagekite.me/api/v1/users/${telegramId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: newUsername }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        setUserData((prevData) => ({ ...prevData, username: newUsername }));
        setUpdateStatus('Username successfully updated');
        setShowEditModal(false);
        setTimeout(() => setUpdateStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGetPremium = () => {
    // Можно добавить логику для "Get Premium", если нужно
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="p-4 mb-4 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center mb-4">
            <img
              src={userData.photo_url || 'https://www.gravatar.com/avatar/?d=mp'}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            />
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-bold mr-2" style={{ color: 'var(--text-color)' }}>
                  Free Plan
                </span>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {userData.username || 'User'}
              </h3>
              <p className="text-gray-600 text-sm">Since {userData.registered_at}</p>
              {updateStatus && (
                <div className="mt-2 text-green-600 animate-pulse">{updateStatus}</div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="flex flex-col items-center">
              <button
                className="rounded-full w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
                onClick={handleGetPremium}
              >
                <span className="text-2xl">+</span>
              </button>
              <span className="text-gray-600 mt-2">Get Premium</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                className="rounded-full w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
                onClick={() => setShowEditModal(true)}
              >
                <span className="text-xl">✏️</span>
              </button>
              <span className="text-gray-600 mt-2">Edit Profile</span>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-500">
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-lg font-bold mb-2">Edit Profile</h3>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
              className="shadow border rounded w-full py-2 px-3"
            />
            <button
              className="px-4 py-2 rounded-full mt-4"
              style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
              onClick={() => handleSaveUsername(userData.username)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;