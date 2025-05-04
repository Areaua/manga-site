import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({
      email: '',
      password: '',
      form: ''
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
      form: ''
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    
    // Clear error when typing
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
    try {
      const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }

      if (isLogin) {
        // Сохраняем токен и перенаправляем
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        // После регистрации показываем сообщение и переключаем на логин
        setErrors(prev => ({
          ...prev,
          form: 'Registration successful! Please login.'
        }));
        setIsLogin(true);
        setFormData({
          email: formData.email,
          password: ''
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'An error occurred. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setErrors(prev => ({
      ...prev,
      form: 'Please contact support to reset your password.'
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {isLogin && (
            <div className="flex justify-between mb-4">
              <button
                type="button"
                onClick={handleToggleForm}
                className="text-blue-500 hover:underline text-sm"
                disabled={isLoading}
              >
                Don't have an account?
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-500 hover:underline text-sm"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } transition-all duration-300 flex justify-center items-center`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isLogin ? 'Sign In' : 'Sign Up'
            )}
          </button>

          {errors.form && (
            <p className={`mt-4 text-center ${
              errors.form.includes('successful') 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {errors.form}
            </p>
          )}
        </form>

        {!isLogin && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleToggleForm}
                className="text-blue-500 hover:underline"
                disabled={isLoading}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;