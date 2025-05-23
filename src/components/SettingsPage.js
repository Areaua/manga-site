import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import './SettingsPage.css';

// Сторінка налаштувань
const SettingsPage = ({ hideHeader, isAdultContentEnabled, toggleAdultContent, areNotificationsEnabled, toggleNotifications }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportStatus, setSupportStatus] = useState('');

  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) {
      setSupportStatus('Повідомлення не може бути порожнім');
      return;
    }
    // Заглушка для відправки повідомлення в підтримку
    console.log('Повідомлення в підтримку:', supportMessage);
    setSupportStatus('Повідомлення надіслано (заглушка)');
    setSupportMessage('');
    setTimeout(() => {
      setSupportStatus('');
      setShowSupportModal(false);
    }, 2000);
  };

  if (hideHeader) return null;

  return (
    <div className="settings-container">
      <Header hideHeader={hideHeader} />
      <motion.div
        className="settings-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="settings-title">Налаштування</h1>
        <div className="settings-list">
          <motion.div
            className="settings-item"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="settings-item-content">
              <span className="settings-item-icon">🔞</span>
              <span className="settings-item-text">Увімкнути контент 18+</span>
            </div>
            <motion.div
              className={`toggle-switch ${isAdultContentEnabled ? 'active' : ''}`}
              onClick={toggleAdultContent}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="toggle-knob"
                animate={{ x: isAdultContentEnabled ? 18 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="settings-item"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="settings-item-content">
              <span className="settings-item-icon">🔔</span>
              <span className="settings-item-text">Увімкнути сповіщення</span>
            </div>
            <motion.div
              className={`toggle-switch ${areNotificationsEnabled ? 'active' : ''}`}
              onClick={toggleNotifications}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="toggle-knob"
                animate={{ x: areNotificationsEnabled ? 18 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="settings-item"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowSupportModal(true)}
          >
            <div className="settings-item-content">
              <span className="settings-item-icon">📧</span>
              <span className="settings-item-text">Написати в підтримку</span>
            </div>
            <i className="fas fa-chevron-right settings-item-arrow"></i>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showSupportModal && (
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
              <button
                onClick={() => setShowSupportModal(false)}
                className="modal-close"
              >
                <i className="fas fa-times"></i>
              </button>
              <h3 className="modal-title">Написати в підтримку</h3>
              <textarea
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="modal-textarea"
                placeholder="Опишіть вашу проблему..."
                rows="5"
              />
              <motion.button
                className="modal-save"
                onClick={handleSendSupportMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Надіслати
              </motion.button>
              {supportStatus && (
                <motion.p
                  className={`modal-status ${supportStatus.includes('не може') ? 'status-error' : 'status-success'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {supportStatus}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage;