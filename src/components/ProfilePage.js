import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Edit2 } from 'lucide-react';
import Header from './Header';
import './ProfilePage.css';
import { API_BASE_URL, API_PREFIX } from '../config';

const ProfilePage = ({ hideHeader }) => {
  const [showEditModal, setShowEditModal]             = useState(false);
  const [showPremiumPackages, setShowPremiumPackages] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    avatar_url: '',
    is_premium: false,
    registered_at: '',
  });
  const [updateStatus, setUpdateStatus] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUpdateStatus('Failed to load profile data');
      }
    };
    fetchUserData();
  }, []);

  const handleSaveUsername = async (newUsername) => {
    const token = localStorage.getItem('token');
    if (!token) { setUpdateStatus('Session expired. Please sign in again.'); return; }
    if (!newUsername.trim()) { setUpdateStatus('Username cannot be empty'); return; }
    try {
      await axios.put(
        `${API_BASE_URL}${API_PREFIX}/me`,
        { username: newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData((prev) => ({ ...prev, username: newUsername }));
      setUpdateStatus('Username updated successfully');
      localStorage.setItem('userData', JSON.stringify({ ...userData, username: newUsername }));
      setShowEditModal(false);
      setTimeout(() => setUpdateStatus(''), 3000);
    } catch (error) {
      setUpdateStatus(error.response?.data?.detail || 'Failed to update username');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file  = e.target.files[0];
    const token = localStorage.getItem('token');
    if (!file || !token) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${API_BASE_URL}${API_PREFIX}/upload-avatar`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setUserData((prev) => ({ ...prev, avatar_url: response.data.avatar_url }));
      setUpdateStatus('Avatar updated successfully');
      localStorage.setItem('userData', JSON.stringify({ ...userData, avatar_url: response.data.avatar_url }));
      setTimeout(() => setUpdateStatus(''), 3000);
    } catch {
      setUpdateStatus('Failed to upload avatar');
    }
  };

  const formatDate = (dateString) =>
    !dateString
      ? 'Unknown'
      : new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const isError = updateStatus.includes('Failed') || updateStatus.includes('expired') || updateStatus.includes('cannot');

  if (hideHeader) return null;

  return (
    <div className="profile-container">
      <Header hideHeader={hideHeader} />
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-avatar-section">
          <motion.img
            src={userData.avatar_url || 'https://www.gravatar.com/avatar/?d=mp'}
            alt="Avatar"
            className="profile-avatar"
            onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" id="avatar-upload" />
          <motion.button
            className="avatar-button"
            onClick={() => document.getElementById('avatar-upload').click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Change Avatar
          </motion.button>

          <div className="profile-info">
            <div className={`premium-badge ${userData.is_premium ? 'premium-active' : ''}`}>
              {userData.is_premium ? 'Premium' : 'Free Plan'}
            </div>
            <h3 className="profile-username">{userData.username || 'User'}</h3>
            <p className="profile-joined">Joined: {formatDate(userData.registered_at)}</p>
            <AnimatePresence>
              {updateStatus && (
                <motion.p
                  className={`profile-status ${isError ? 'status-error' : 'status-success'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {updateStatus}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="profile-actions">
          <motion.div className="action-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              className={`action-button ${userData.is_premium ? 'button-disabled' : ''}`}
              onClick={userData.is_premium ? undefined : () => setShowPremiumPackages((p) => !p)}
              disabled={userData.is_premium}
            >
              <Crown size={22} />
            </button>
            <span className="action-label">Get Premium</span>
          </motion.div>

          <motion.div className="action-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="action-button" onClick={() => setShowEditModal(true)}>
              <Edit2 size={22} />
            </button>
            <span className="action-label">Edit Profile</span>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPremiumPackages && (
          <motion.div
            className="premium-packages"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h3 className="packages-title">Choose a Premium Plan</h3>
            <div className="packages-container">
              {[
                { type: 'Basic',    price: '₴99/mo',  description: 'Access to premium content, ad-free' },
                { type: 'Standard', price: '₴199/mo', description: 'All Basic benefits + early chapter access' },
                { type: 'Premium',  price: '₴299/mo', description: 'All Standard benefits + exclusive bonuses' },
              ].map((pkg, i) => (
                <motion.div
                  key={pkg.type}
                  className="package-card"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h4 className="package-title">{pkg.type}</h4>
                  <p className="package-price">{pkg.price}</p>
                  <p className="package-description">{pkg.description}</p>
                  <motion.button
                    className="package-button"
                    onClick={() => setShowPremiumPackages(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Choose
                  </motion.button>
                </motion.div>
              ))}
            </div>
            <motion.button
              className="close-packages"
              onClick={() => setShowPremiumPackages(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button onClick={() => setShowEditModal(false)} className="modal-close">
                <i className="fas fa-times" />
              </button>
              <h3 className="modal-title">Edit Profile</h3>
              <input
                type="text"
                value={userData.username}
                onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
                className="modal-input"
                placeholder="Enter new username"
              />
              <motion.button
                className="modal-save"
                onClick={() => handleSaveUsername(userData.username)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
