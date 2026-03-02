import { Link } from 'react-router-dom';

function GearIconSVG() {
  return (
    <svg className="gear-icon" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="80" stroke="#0091d0" strokeWidth="3" opacity="0.4"/>
      <circle cx="100" cy="100" r="50" stroke="#0091d0" strokeWidth="2" opacity="0.6"/>
      <circle cx="100" cy="100" r="20" fill="rgba(0,145,208,0.2)" stroke="#0091d0" strokeWidth="2"/>
      <g stroke="#0091d0" strokeWidth="3">
        <line x1="100" y1="20" x2="100" y2="5"/><line x1="130" y1="28" x2="138" y2="15"/>
        <line x1="152" y1="48" x2="163" y2="38"/><line x1="168" y1="75" x2="182" y2="72"/>
        <line x1="168" y1="105" x2="182" y2="108"/><line x1="152" y1="130" x2="163" y2="142"/>
        <line x1="130" y1="150" x2="138" y2="165"/><line x1="100" y1="158" x2="100" y2="175"/>
        <line x1="70" y1="150" x2="62" y2="165"/><line x1="48" y1="130" x2="37" y2="142"/>
        <line x1="32" y1="105" x2="18" y2="108"/><line x1="32" y1="75" x2="18" y2="72"/>
        <line x1="48" y1="48" x2="37" y2="38"/><line x1="70" y1="28" x2="62" y2="15"/>
      </g>
      <line x1="85" y1="85" x2="115" y2="115" stroke="#0091d0" strokeWidth="3"/>
      <line x1="115" y1="85" x2="85" y2="115" stroke="#0091d0" strokeWidth="3"/>
    </svg>
  );
}

function ShockSVG() {
  return (
    <svg className="gear-icon" viewBox="0 0 120 200" fill="none">
      <rect x="50" y="10" width="20" height="180" rx="10" stroke="rgba(0,145,208,0.6)" strokeWidth="2" fill="rgba(0,145,208,0.1)"/>
      <circle cx="60" cy="30" r="15" stroke="#0091d0" strokeWidth="2" fill="none"/>
      <circle cx="60" cy="170" r="15" stroke="#0091d0" strokeWidth="2" fill="none"/>
      <g stroke="rgba(0,145,208,0.4)" strokeWidth="1.5">
        <line x1="35" y1="60" x2="85" y2="60"/><line x1="35" y1="80" x2="85" y2="80"/>
        <line x1="35" y1="100" x2="85" y2="100"/><line x1="35" y1="120" x2="85" y2="120"/>
        <line x1="35" y1="140" x2="85" y2="140"/>
      </g>
    </svg>
  );
}

function CylBlockSVG() {
  return (
    <svg className="gear-icon" viewBox="0 0 160 160" fill="none">
      <rect x="30" y="30" width="100" height="100" rx="4" stroke="rgba(120,105,175,0.6)" strokeWidth="2" fill="rgba(120,105,175,0.1)"/>
      <rect x="50" y="50" width="60" height="60" rx="4" stroke="#7869af" strokeWidth="1.5" fill="rgba(120,105,175,0.1)"/>
      <line x1="80" y1="65" x2="80" y2="95" stroke="#7869af" strokeWidth="2"/>
      <line x1="65" y1="80" x2="95" y2="80" stroke="#7869af" strokeWidth="2"/>
      <g stroke="rgba(120,105,175,0.4)" strokeWidth="1">
        <line x1="30" y1="50" x2="50" y2="50"/><line x1="30" y1="80" x2="50" y2="80"/>
        <line x1="30" y1="110" x2="50" y2="110"/><line x1="110" y1="50" x2="130" y2="50"/>
        <line x1="110" y1="80" x2="130" y2="80"/><line x1="110" y1="110" x2="130" y2="110"/>
      </g>
    </svg>
  );
}

export default function Products() {
  return (
    <>
      <div className="section-header reveal" style={{ padding: '0 60px', marginBottom: 60 }}>
        <div>
          <div className="section-tag">Best Sellers</div>
          <h2 className="section-title">Produk<br />Terlaris</h2>
        </div>
      </div>

      <div className="products-grid reveal" style={{ margin: '0 60px' }}>
        <div className="prod-card featured">
          <div className="prod-corner" />
          <div className="prod-label">Best Seller • Drivetrain</div>
          <div className="prod-name">Gear Set<br />Honda REVO</div>
          <div className="prod-sub">Menyalurkan tenaga optimal dari mesin ke roda</div>
          <div className="prod-img-area"><GearIconSVG /></div>
          <div className="prod-price">Rp 285.000</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
            <a href="#" className="prod-action" style={{ margin: 0 }}>Order →</a>
            <Link to="/product" className="prod-action" style={{ margin: 0, color: 'rgba(0,145,208,0.7)' }}>Detail →</Link>
          </div>
        </div>

        <div className="prod-card">
          <div className="prod-corner" />
          <div className="prod-label">Suspension</div>
          <div className="prod-name">Shock Belakang Supra X 125</div>
          <div className="prod-img-area"><ShockSVG /></div>
          <div className="prod-price">Rp 320.000</div>
          <a href="#" className="prod-action">Order →</a>
        </div>

        <div className="prod-card">
          <div className="prod-corner" />
          <div className="prod-label">Engine</div>
          <div className="prod-name">Cylinder Block Assy MIO</div>
          <div className="prod-img-area"><CylBlockSVG /></div>
          <div className="prod-price">Rp 890.000</div>
          <a href="#" className="prod-action">Order →</a>
        </div>
      </div>
    </>
  );
}
