import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { API_BASE_URL, API_PREFIX } from '../config';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    form: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const resetState = () => ({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    form: '',
  });

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrors(resetState());
    setFormData({ email: '', username: '', password: '', passwordConfirm: '' });
  };

  const validateForm = () => {
    let valid = true;
    const e = resetState();

    if (!formData.email) {
      e.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Enter a valid email address';
      valid = false;
    }

    if (!isLogin && !formData.username) {
      e.username = 'Username is required';
      valid = false;
    }

    if (!formData.password) {
      e.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!isLogin && formData.password !== formData.passwordConfirm) {
      e.passwordConfirm = 'Passwords do not match';
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: '' }));

    const endpoint = isLogin ? 'login' : 'register';
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.passwordConfirm,
        };

    try {
      const response = await fetch(`${API_BASE_URL}${API_PREFIX}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server returned an invalid response. Check your API configuration.');
      }

      if (!response.ok) throw new Error(data.detail || 'Something went wrong');

      if (isLogin) {
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        setErrors((prev) => ({ ...prev, form: 'Registration successful! Please sign in.' }));
        setIsLogin(true);
        setFormData({ email: formData.email, username: '', password: '', passwordConfirm: '' });
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message || 'An error occurred. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setErrors((prev) => ({ ...prev, form: 'Contact support to reset your password.' }));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
        <div className="auth-content">
          <div className="form-block">
            <form id="authForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
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
                  <label htmlFor="username">Username</label>
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
                <label htmlFor="password">Password</label>
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
                  <label htmlFor="passwordConfirm">Confirm Password</label>
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
                    <span className="spinner" /> Processing...
                  </>
                ) : isLogin ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          <div className="social-block">
            <h2>Or sign in with:</h2>
            <button className="social-btn google">Google</button>
            <button className="social-btn facebook">Facebook</button>
            <button className="social-btn whatsapp">WhatsApp</button>
            <button className="social-btn telegram">Telegram</button>
          </div>
        </div>

        <div className="toggle-block">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={handleToggleForm} disabled={isLoading}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          {isLogin && (
            <button onClick={handleForgotPassword} className="forgot-password" disabled={isLoading}>
              Forgot password?
            </button>
          )}
          {errors.form && (
            <p className={errors.form.includes('successful') ? 'success' : 'error'}>{errors.form}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
