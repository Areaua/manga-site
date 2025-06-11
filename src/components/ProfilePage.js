import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import './ProfilePage.css';

const { BASE_URL, API_PREFIX } = window._env_ || {
  BASE_URL: 'http://13.53.132.93',
  API_PREFIX: '/api'
};

const ProfilePage = ({ hideHeader }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPremiumPackages, setShowPremiumPackages] = useState(false);
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
          const response = await axios.get(`${BASE_URL}${API_PREFIX}/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(response.data);
          localStorage.setItem('userData', JSON.stringify(response.data));
        } catch (error) {
          console.error('Помилка отримання даних користувача:', error);
          setUpdateStatus('Не вдалося отримати дані профілю');
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSaveUsername = async (newUsername) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUpdateStatus('Токен не знайдено. Увійдіть знову');
      return;
    }
    if (!newUsername.trim()) {
      setUpdateStatus('Ім’я користувача не може бути порожнім');
      return;
    }
    try {
      console.log('Відправка імені:', newUsername);
      const response = await axios.put(`${BASE_URL}${API_PREFIX}/me`, { username: newUsername }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(prev => ({ ...prev, username: newUsername }));
      setUpdateStatus('Ім’я користувача успішно оновлено');
      localStorage.setItem('userData', JSON.stringify({ ...userData, username: newUsername }));
      setShowEditModal(false);
      setTimeout(() => setUpdateStatus(''), 3000);
    } catch (error) {
      console.error('Помилка оновлення імені користувача:', error);
      setUpdateStatus(error.response?.data?.detail || 'Не вдалося оновити ім’я користувача');
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem('token');
    if (file && token) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(`${BASE_URL}${API_PREFIX}/upload-avatar`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setUserData(prev => ({ ...prev, avatar_url: response.data.avatar_url }));
        setUpdateStatus('Аватар успішно оновлено');
        localStorage.setItem('userData', JSON.stringify({ ...userData, avatar_url: response.data.avatar_url }));
        setTimeout(() => setUpdateStatus(''), 3000);
      } catch (error) {
        console.error('Помилка завантаження аватара:', error);
        setUpdateStatus('Не вдалося завантажити аватар');
      }
    }
  };

  const handleUpgradePremium = (packageType) => {
    console.log(`Вибрано пакет: ${packageType}`);
    setShowPremiumPackages(false);
  };

  const togglePremiumPackages = () => setShowPremiumPackages(prev => !prev);

  const formatDate = (dateString) => !dateString ? 'Невідомо' : new Date(dateString).toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });

  if (hideHeader) return null;

  return (
    <div className="profile-container">
      <Header hideHeader={hideHeader} />
      <motion.div className="profile-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="profile-avatar-section">
          <motion.img
            src={userData.avatar_url || 'https://www.gravatar.com/avatar/?d=mp'}
            alt="Аватар"
            className="profile-avatar"
            onError={(e) => (e.target.src = 'https://www.gravatar.com/avatar/?d=mp')}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" id="avatar-upload" />
          <motion.button className="avatar-button" onClick={() => document.getElementById('avatar-upload').click()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Змінити аватар
          </motion.button>
          <div className="profile-info">
            <div className={`premium-badge ${userData.is_premium ? 'premium-active' : ''}`}>
              {userData.is_premium ? 'Преміум' : 'Безкоштовний план'}
            </div>
            <h3 className="profile-username">{userData.username || 'Користувач'}</h3>
            <p className="profile-joined">Приєднався: {formatDate(userData.registered_at)}</p>
            <AnimatePresence>
              {updateStatus && (
                <motion.p
                  className={`profile-status ${updateStatus.includes('Не вдалося') ? 'status-error' : 'status-success'}`}
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
            <button className={`action-button ${userData.is_premium ? 'button-disabled' : ''}`} onClick={userData.is_premium ? null : togglePremiumPackages} disabled={userData.is_premium}>
              <i className="fas fa-crown"></i>
            </button>
            <span className="action-label">Отримати преміум</span>
          </motion.div>
          <motion.div className="action-item" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="action-button" onClick={() => setShowEditModal(true)}><i className="fas fa-edit"></i></button>
            <span className="action-label">Редагувати профіль</span>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showPremiumPackages && (
          <motion.div className="premium-packages" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            <h3 className="packages-title">Оберіть преміум-підписку</h3>
            <div className="packages-container">
              {[{ type: 'Базовий', price: '₴99/міс', description: 'Доступ до преміум-контенту, без реклами' }, { type: 'Стандарт', price: '₴199/міс', description: 'Усі переваги Базового + ранній доступ до глав' }, { type: 'Преміум', price: '₴299/міс', description: 'Усі переваги Стандарт + ексклюзивні бонуси' }].map((pkg, index) => (
                <motion.div key={pkg.type} className="package-card" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <h4 className="package-title">{pkg.type}</h4>
                  <p className="package-price">{pkg.price}</p>
                  <p className="package-description">{pkg.description}</p>
                  <motion.button className="package-button" onClick={() => handleUpgradePremium(pkg.type)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Вибрати</motion.button>
                </motion.div>
              ))}
            </div>
            <motion.button className="close-packages" onClick={togglePremiumPackages} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Закрити</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showEditModal && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="modal-content" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setShowEditModal(false)} className="modal-close"><i className="fas fa-times"></i></button>
              <h3 className="modal-title">Редагувати профіль</h3>
              <input type="text" value={userData.username} onChange={(e) => setUserData(prev => ({ ...prev, username: e.target.value }))} className="modal-input" placeholder="Введіть нове ім’я користувача" />
              <motion.button className="modal-save" onClick={() => handleSaveUsername(userData.username)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Зберегти</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;