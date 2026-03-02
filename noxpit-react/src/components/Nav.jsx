import logo from '/noxpit-logo.png';
import { useTheme } from '../context/ThemeContext';

export default function Nav() {
  const { theme, toggle } = useTheme();

  return (
    <nav>
      <a href="#" className="logo">
        <img src={logo} alt="NOXPIT" />
      </a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          className="theme-toggle"
          onClick={toggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <a href="#products" className="nav-cta">Shop Now</a>
      </div>
    </nav>
  );
}
