import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 to-orange-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate-slideIn">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600 animate-fadeIn">
            {isLogin ? 'Добро пожаловать!' : 'Создай аккаунт!'}
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              required
            />
          </div>
          {isLogin && (
            <div className="flex justify-between mb-4">
              <a href="#" className="text-orange-500 hover:underline text-sm">
                Нет аккаунта?
              </a>
              <a href="#" className="text-orange-500 hover:underline text-sm">
                Забыли пароль?
              </a>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">или</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex justify-center gap-4">
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300">
            <i className="fab fa-google text-red-500"></i>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300">
            <i className="fab fa-facebook text-blue-600"></i>
          </button>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300">
            <i className="fab fa-linkedin text-blue-800"></i>
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleToggleForm}
            className="text-orange-500 hover:underline"
          >
            {isLogin ? 'Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;