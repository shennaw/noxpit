import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/noxpit-logo.png';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';
import CartIcon from './CartIcon';

export default function Nav() {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const { user, isAuthenticated, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="NOXPIT" />
      </Link>
      <ul className="nav-links">
        <li><a href="/#about">{t('nav.about')}</a></li>
        <li><a href="/#products">{t('nav.products')}</a></li>
        <li><a href="/#contact">{t('nav.contact')}</a></li>
      </ul>
      <div className="nav-right">
        {/* Language toggle */}
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          title="Switch language"
        >
          {lang === 'id' ? 'EN' : 'ID'}
        </button>

        {/* Theme toggle */}
        <button
          className="theme-toggle"
          onClick={toggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        {/* Wishlist */}
        {isAuthenticated && (
          <Link to="/wishlist" className="nav-icon-btn" title={t('nav.wishlist')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>
        )}

        {/* Cart */}
        <CartIcon />

        {/* User menu */}
        {isAuthenticated ? (
          <div className="nav-user-wrap" ref={menuRef}>
            <button
              className="nav-user-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="nav-user-avatar">{user.name?.charAt(0)?.toUpperCase()}</span>
            </button>
            {userMenuOpen && (
              <div className="nav-user-menu">
                <div className="nav-user-name">{user.name}</div>
                <div className="nav-user-email">{user.email}</div>
                <div className="nav-user-divider" />
                <Link to="/orders" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>{t('nav.orders')}</Link>
                <Link to="/addresses" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>{t('nav.addresses')}</Link>
                <Link to="/wishlist" className="nav-user-item" onClick={() => setUserMenuOpen(false)}>{t('nav.wishlist')}</Link>
                <div className="nav-user-divider" />
                <button className="nav-user-item nav-user-logout" onClick={() => { logout(); setUserMenuOpen(false); }}>{t('nav.logout')}</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-login-link">{t('nav.login')}</Link>
        )}

        <Link to="/products" className="nav-cta">{t('nav.shopNow')}</Link>
      </div>
    </nav>
  );
}
