import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import './Login.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(form);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(t(`auth.${result.error}`));
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-eyebrow">{t('auth.welcome')}</div>
          <h1 className="auth-title">{t('auth.login')}</h1>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">{t('auth.email')}</label>
              <input
                type="email"
                className="auth-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">{t('auth.password')}</label>
              <input
                type="password"
                className="auth-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="auth-submit">{t('auth.login')} →</button>
          </form>

          <div className="auth-alt">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="auth-alt-link">{t('auth.registerHere')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
