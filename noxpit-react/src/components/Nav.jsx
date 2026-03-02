import logo from '/noxpit-logo.png';

export default function Nav() {
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
      <a href="#products" className="nav-cta">Shop Now</a>
    </nav>
  );
}
