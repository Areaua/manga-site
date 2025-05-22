import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './ProfilePage.css';

const ProfilePage = ({ hideHeader }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    avatar_url: '',
    is_premium: false,
    registered_at: ''
  });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveUsername = async (newUsername) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.put('http://127.0.0.1:8000/me', {
          username: newUsername
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(prev => ({ ...prev, username: newUsername }));
        setUpdateStatus('Username successfully updated');
        setShowEditModal(false);
        setTimeout(() => setUpdateStatus(''), 3000);
      } catch (error) {
        console.error('Error updating username:', error);
      }
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem('token');
    if (file && token) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post('http://127.0.0.1:8000/upload-avatar', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        const newAvatarUrl = response.data.avatar_url;
        setUserData(prev => ({ ...prev, avatar_url: newAvatarUrl }));
        setUpdateStatus('Avatar updated successfully');
        setTimeout(() => setUpdateStatus(''), 3000);
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setUpdateStatus('Failed to update avatar');
      }
    }
  };

  if (hideHeader) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideHeader={hideHeader} />
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="p-4 mb-4 w-full max-w-md mx-auto">
          <div className="flex flex-col items-center mb-4">
            <img
              src={userData.avatar_url || 'https://www.gravatar.com/avatar/?d=mp'}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              id="avatar-upload"
            />
            <button
              onClick={() => document.getElementById('avatar-upload').click()}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
            >
              Change Avatar
            </button>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-sm font-bold mr-2" style={{ color: 'var(--text-color)' }}>
                  {userData.is_premium ? 'Premium' : 'Free Plan'}
                </span>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {userData.username || 'User'}
              </h3>
              <p className="text-gray-600 text-sm">Since {userData.registered_at || new Date().toLocaleDateString()}</p>
              {updateStatus && (
                <div className={`mt-2 ${updateStatus.includes('Failed') ? 'text-red-600' : 'text-green-600'} animate-pulse`}>
                  {updateStatus}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <div className="flex flex-col items-center">
              <button
                className="rounded-full w-12 h-12 flex items-center justify-center"
                style={{ backgroundColor: 'var(--primary-color)', color: '#ffffff' }}
                onClick={() => alert('Premium feature not implemented yet')}
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
              onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))}
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