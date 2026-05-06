import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { API_BASE_URL, API_PREFIX } from '../config';

const FormField = ({
  name, label, type, icon: Icon, placeholder,
  value, error, onChange, disabled,
  showToggle, showValue, onToggleShow,
}) => (
  <div>
    <label className="block text-sm font-semibold text-ink-900 mb-1.5">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none">
        <Icon size={16} />
      </span>
      <input
        type={showToggle ? (showValue ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={name === 'password' || name === 'passwordConfirm' ? 'current-password' : name}
        className={`w-full pl-10 ${showToggle ? 'pr-10' : 'pr-4'} py-3 rounded-xl border-2 bg-white text-ink-900 placeholder:text-ink-400 outline-none transition-all ${
          error
            ? 'border-coral-400 ring-2 ring-coral-100'
            : 'border-blush-100 focus:border-coral-400 focus:ring-2 focus:ring-coral-100'
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors"
        >
          {showValue ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-xs text-coral-600">{error}</p>}
  </div>
);

const EMPTY_ERRORS = { email: '', username: '', password: '', passwordConfirm: '', form: '' };
const EMPTY_FORM   = { email: '', username: '', password: '', passwordConfirm: '' };

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin]               = useState(true);
  const [showPassword, setShowPassword]     = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);
  const [formData, setFormData]             = useState(EMPTY_FORM);
  const [errors, setErrors]                 = useState(EMPTY_ERRORS);
  const [isLoading, setIsLoading]           = useState(false);

  const switchTab = (toLogin) => {
    if (toLogin === isLogin) return;
    setIsLogin(toLogin);
    setErrors(EMPTY_ERRORS);
    setFormData(EMPTY_FORM);
    setShowPassword(false);
    setShowConfirm(false);
  };

  const validate = () => {
    const e = { ...EMPTY_ERRORS };
    let ok = true;

    if (!formData.email) {
      e.email = 'Email is required'; ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Enter a valid email address'; ok = false;
    }
    if (!isLogin && !formData.username) {
      e.username = 'Username is required'; ok = false;
    }
    if (!formData.password) {
      e.password = 'Password is required'; ok = false;
    } else if (formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters'; ok = false;
    }
    if (!isLogin && formData.password !== formData.passwordConfirm) {
      e.passwordConfirm = 'Passwords do not match'; ok = false;
    }
    setErrors(e);
    return ok;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors((p) => ({ ...p, form: '' }));

    const endpoint = isLogin ? 'login' : 'register';
    const body = isLogin
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, email: formData.email, password: formData.password, confirm_password: formData.passwordConfirm };

    try {
      const res = await fetch(`${API_BASE_URL}${API_PREFIX}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      let data;
      try { data = await res.json(); } catch { throw new Error('Server returned an invalid response.'); }
      if (!res.ok) throw new Error(data.detail || 'Something went wrong');

      if (isLogin) {
        localStorage.setItem('token', data.access_token);
        navigate('/home');
      } else {
        setErrors((p) => ({ ...p, form: '__success__Registration successful! Please sign in.' }));
        setIsLogin(true);
        setFormData({ ...EMPTY_FORM, email: formData.email });
      }
    } catch (err) {
      setErrors((p) => ({ ...p, form: err.message || 'An error occurred. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = errors.form.startsWith('__success__');
  const formMsg   = isSuccess ? errors.form.replace('__success__', '') : errors.form;

  return (
    <div className="min-h-screen flex">
      {/* ── Branding side ── */}
      <div className="hidden md:flex w-[40%] bg-gradient-to-br from-coral-400 via-coral-300 to-violet-400 flex-col justify-between p-12">
        <span className="text-5xl font-extrabold text-white tracking-tight">AniAria</span>

        <div className="flex flex-col items-center gap-2 select-none pointer-events-none">
          <span className="text-[6rem] opacity-40 leading-none">📚</span>
          <span className="text-[4rem] opacity-35 leading-none">✨</span>
          <span className="text-[5rem] opacity-40 leading-none">🌸</span>
        </div>

        <p className="text-xl text-white/90 font-medium leading-snug">
          Your gateway to the world of manga
        </p>
      </div>

      {/* ── Form side ── */}
      <div className="flex-1 bg-cream-50 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <span className="text-4xl font-extrabold bg-gradient-to-r from-coral-500 to-violet-500 bg-clip-text text-transparent">
              AniAria
            </span>
          </div>

          <h1 className="text-3xl font-bold text-ink-900 mb-1.5">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-base text-ink-600 mb-7">
            {isLogin ? 'Sign in to continue reading' : 'Join thousands of manga readers'}
          </p>

          {/* Tab toggle */}
          <div className="flex bg-blush-50 rounded-full p-1 mb-7">
            <button
              type="button"
              onClick={() => switchTab(true)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                isLogin ? 'bg-white shadow-sm text-coral-600' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchTab(false)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                !isLogin ? 'bg-white shadow-sm text-coral-600' : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              name="email" label="Email" type="email" icon={Mail}
              placeholder="you@example.com"
              value={formData.email} error={errors.email}
              onChange={handleChange} disabled={isLoading}
            />

            {!isLogin && (
              <FormField
                name="username" label="Username" type="text" icon={User}
                placeholder="Choose a username"
                value={formData.username} error={errors.username}
                onChange={handleChange} disabled={isLoading}
              />
            )}

            <FormField
              name="password" label="Password" type="password" icon={Lock}
              placeholder="••••••••"
              value={formData.password} error={errors.password}
              onChange={handleChange} disabled={isLoading}
              showToggle showValue={showPassword} onToggleShow={() => setShowPassword((p) => !p)}
            />

            {!isLogin && (
              <FormField
                name="passwordConfirm" label="Confirm Password" type="password" icon={Lock}
                placeholder="••••••••"
                value={formData.passwordConfirm} error={errors.passwordConfirm}
                onChange={handleChange} disabled={isLoading}
                showToggle showValue={showConfirm} onToggleShow={() => setShowConfirm((p) => !p)}
              />
            )}

            {isLogin && (
              <div className="text-right -mt-1">
                <button
                  type="button"
                  onClick={() => setErrors((p) => ({ ...p, form: 'Contact support to reset your password.' }))}
                  className="text-sm text-coral-500 hover:text-coral-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {formMsg && (
              <div className={`flex items-start gap-2 px-4 py-3 rounded-xl text-sm border ${
                isSuccess
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-coral-50 border-coral-200 text-coral-700'
              }`}>
                {isSuccess
                  ? <CheckCircle size={16} className="mt-0.5 shrink-0" />
                  : <AlertCircle size={16} className="mt-0.5 shrink-0" />}
                {formMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-coral-500 to-violet-500 hover:from-coral-600 hover:to-violet-600 text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
            >
              {isLoading
                ? <LoadingSpinner size={20} />
                : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-blush-100" />
            <span className="text-xs text-ink-400 whitespace-nowrap">or continue with</span>
            <div className="flex-1 h-px bg-blush-100" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Google',   icon: '🔍' },
              { label: 'Facebook', icon: '📘' },
              { label: 'Telegram', icon: '✈️' },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="bg-white border-2 border-blush-100 hover:border-violet-300 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-600 transition-all hover:shadow-sm"
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          {/* Switch link */}
          <p className="text-center text-sm text-ink-600 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => switchTab(!isLogin)}
              className="text-coral-500 font-semibold hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
