import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const { BASE_URL, API_PREFIX } = window._env_ || {
  BASE_URL: '',
  API_PREFIX: '/api'
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    form: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      form: ''
    };

    if (!formData.email) {
      newErrors.email = 'Пошта обов’язкова';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Введіть коректну пошту';
      isValid = false;
    }

    if (!isLogin && !formData.username) {
      newErrors.username = 'Нік обов’язковий';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обов’язковий';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль має бути не менше 6 символів';
      isValid = false;
    }

    if (!isLogin && formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Паролі не співпадають';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, form: '' }));

    const endpoint = isLogin ? 'login' : 'register';
    const bodyData = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password, confirm_password: formData.passwordConfirm };

    try {
      console.log(`Sending request to: ${BASE_URL}${API_PREFIX}/${endpoint}`);
      console.log('Request body:', bodyData);
      const response = await fetch(`${BASE_URL}${API_PREFIX}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.detail || 'Щось пішло не так');
      }

      if (isLogin) {
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        setErrors(prev => ({
          ...prev,
          form: 'Реєстрація успішна! Увійдіть.'
        }));
        setIsLogin(true);
        setFormData({
          email: formData.email,
          username: '',
          password: '',
          passwordConfirm: ''
        });
      }
    } catch (error) {
      console.error('Помилка авторизації:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Сталася помилка. Спробуйте ще раз.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setErrors(prev => ({
      ...prev,
      form: 'Зверніться до підтримки, щоб скинути пароль.'
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Вхід</h1>
        <div className="auth-content">
          <div className="form-block">
            <form id="authForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Електронна пошта</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="username">Нік</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  {errors.username && <p className="error">{errors.username}</p>}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Підтвердити пароль</label>
                  <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}
                </div>
              )}
              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span> Обробка...
                  </>
                ) : isLogin ? 'Увійти' : 'Зареєструватися'}
              </button>
            </form>
          </div>
          <div className="social-block">
            <h2>Або увійдіть через:</h2>
            <button className="social-btn google">Google</button>
            <button className="social-btn facebook">Facebook</button>
            <button className="social-btn whatsapp">WhatsApp</button>
            <button className="social-btn telegram">Telegram</button>
          </div>
        </div>
        <div className="toggle-block">
          <p>
            {isLogin ? 'Немає акаунта? ' : 'Вже є акаунт? '}
            <button onClick={handleToggleForm} disabled={isLoading}>
              {isLogin ? 'Зареєструватися' : 'Увійти'}
            </button>
          </p>
          {isLogin && (
            <button onClick={handleForgotPassword} className="forgot-password" disabled={isLoading}>
              Забули пароль?
            </button>
          )}
          {errors.form && (
            <p className={errors.form.includes('успішна') ? 'success' : 'error'}>
              {errors.form}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;