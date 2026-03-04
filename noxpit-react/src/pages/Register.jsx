import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import './Register.css';

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError(t('auth.passwordMismatch'));
      return;
    }
    const result = register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    if (result.ok) {
      navigate('/', { replace: true });
    } else {
      setError(t(`auth.${result.error}`));
    }
  };

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="auth-root">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-eyebrow">{t('auth.welcome')}</div>
          <h1 className="auth-title">{t('auth.register')}</h1>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">{t('auth.name')}</label>
              <input type="text" className="auth-input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('auth.email')}</label>
              <input type="email" className="auth-input" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('auth.phone')}</label>
              <input type="tel" className="auth-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('auth.password')}</label>
              <input type="password" className="auth-input" value={form.password} onChange={(e) => update('password', e.target.value)} required minLength={6} />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('auth.confirmPassword')}</label>
              <input type="password" className="auth-input" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required minLength={6} />
            </div>
            <button type="submit" className="auth-submit">{t('auth.register')} →</button>
          </form>

          <div className="auth-alt">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="auth-alt-link">{t('auth.loginHere')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
