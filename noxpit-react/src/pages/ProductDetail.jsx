import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProductDetail.css';

/* ─── Data ─── */
const PRODUCT = {
  sku: 'NXP-GS-REVO-07',
  category: 'Drivetrain',
  badge: 'Best Seller',
  name: 'Gear Set',
  nameHighlight: 'Honda REVO',
  subtitle: '2007 — 2015',
  price: 285000,
  originalPrice: 320000,
  rating: 4.9,
  reviewCount: 847,
  stock: 23,
  keyStats: [
    { num: '13T', label: 'Front Sprocket' },
    { num: '38T', label: 'Rear Sprocket' },
    { num: '420', label: 'Chain Pitch' },
    { num: '1 Yr', label: 'Warranty' },
  ],
  specs: [
    { label: 'Material', value: 'Hardened Carbon Steel' },
    { label: 'Permukaan', value: 'Black Phosphate Coat' },
    { label: 'Chain Pitch', value: '420 mm' },
    { label: 'Drive Ratio', value: '13 : 38 (2.92)' },
    { label: 'Torque Rating', value: '18 Nm' },
    { label: 'Berat Set', value: '680 g' },
    { label: 'Standar', value: 'OEM Specification' },
    { label: 'Country of Origin', value: 'Made in Japan' },
  ],
  features: [
    {
      icon: '⚙',
      title: 'Presisi Tinggi',
      desc: 'Toleransi produksi ±0.01 mm. Kesesuaian sempurna dengan sistem transmisi Honda REVO original tanpa modifikasi apapun.',
    },
    {
      icon: '⬡',
      title: 'Material Premium',
      desc: 'Baja karbon tinggi dengan heat treatment HRC 58–62. Ketahanan aus 3× lebih lama dari produk aftermarket biasa.',
    },
    {
      icon: '◎',
      title: 'Anti-Kebisingan',
      desc: 'Profil gigi teroptimasi meminimalkan getaran dan kebisingan pada semua kondisi berkendara, dari RPM rendah hingga tinggi.',
    },
    {
      icon: '✦',
      title: 'Garansi Resmi',
      desc: 'Perlindungan garansi penggantian 1 tahun dari NOXPIT. Klaim mudah via online maupun toko offline Bandung.',
    },
  ],
  compatibility: [
    { model: 'Honda REVO', cc: '100cc', years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015] },
    { model: 'Honda Supra X', cc: '100cc', years: [2005, 2006, 2007, 2008, 2009, 2010] },
    { model: 'Honda Blade', cc: '110cc', years: [2008, 2009, 2010, 2011, 2012] },
  ],
};

const RELATED = [
  { label: 'Suspension', name: 'Shock Belakang Supra X 125', price: '320.000', color: '#0091d0' },
  { label: 'Engine', name: 'Cylinder Block Assy MIO', price: '890.000', color: '#7869af' },
  { label: 'Electrical', name: 'Stator Assy Vario 125', price: '420.000', color: '#f287b7' },
];

/* ─── Annotation positions (relative to 520×520 center = 260,260) ─── */
const ANNOTATIONS = [
  { angle: -45,  r: 135, lx: 370, ly: 80,  title: 'Hardened Teeth', value: 'HRC 60' },
  { angle: 135,  r: 130, lx: 60,  ly: 360, title: 'Anti-Rust', value: 'Black Phosphate' },
  { angle: 50,   r: 130, lx: 360, ly: 370, title: 'Chain Compat.', value: 'Pitch 420' },
  { angle: -130, r: 135, lx: 55,  ly: 90,  title: 'OEM Spec', value: '13T / 38T' },
];

function polarXY(cx, cy, angleDeg, r) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/* ─── Gear SVG ─── */
function GearVisual() {
  const cx = 260, cy = 260;
  const TICKS = Array.from({ length: 36 });

  return (
    <div className="pd-gear-wrap">
      {/* Tick ring */}
      <div className="pd-tick-ring">
        {TICKS.map((_, i) => (
          <div
            key={i}
            className="pd-tick"
            style={{ transform: `rotate(${i * 10}deg)` }}
          />
        ))}
      </div>

      {/* Outer decorative ring */}
      <div className="pd-ring-outer" />

      {/* Main gear */}
      <svg
        className="pd-gear-main"
        width="240" height="240"
        viewBox="0 0 340 340"
        fill="none"
      >
        {/* Outer faint circles */}
        <circle cx="170" cy="170" r="155" stroke="rgba(0,145,208,0.06)" strokeWidth="1" />
        <circle cx="170" cy="170" r="130" stroke="rgba(0,145,208,0.15)" strokeWidth="1" />
        <circle cx="170" cy="170" r="90"  stroke="rgba(0,145,208,0.12)" strokeWidth="1" />
        <circle cx="170" cy="170" r="50"  stroke="rgba(0,145,208,0.28)" strokeWidth="1.5" />
        <circle cx="170" cy="170" r="25"  fill="rgba(0,145,208,0.12)" stroke="rgba(0,145,208,0.5)" strokeWidth="1.5" />
        {/* Center cross */}
        <line x1="170" y1="158" x2="170" y2="182" stroke="rgba(0,145,208,0.6)" strokeWidth="1.5" />
        <line x1="158" y1="170" x2="182" y2="170" stroke="rgba(0,145,208,0.6)" strokeWidth="1.5" />
        {/* Gear teeth */}
        <g stroke="#0091d0" strokeWidth="2.5" opacity="0.8">
          {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={170 + 115 * Math.cos(rad)}
                y1={170 + 115 * Math.sin(rad)}
                x2={170 + 130 * Math.cos(rad)}
                y2={170 + 130 * Math.sin(rad)}
              />
            );
          })}
        </g>
        {/* Spoke lines */}
        <g stroke="rgba(0,145,208,0.35)" strokeWidth="1.2">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={170 + 28 * Math.cos(rad)}
                y1={170 + 28 * Math.sin(rad)}
                x2={170 + 88 * Math.cos(rad)}
                y2={170 + 88 * Math.sin(rad)}
              />
            );
          })}
        </g>
        {/* Inner X */}
        <line x1="155" y1="155" x2="185" y2="185" stroke="#0091d0" strokeWidth="2.5" opacity="0.7" />
        <line x1="185" y1="155" x2="155" y2="185" stroke="#0091d0" strokeWidth="2.5" opacity="0.7" />
      </svg>

      {/* Annotation SVG overlay */}
      <svg
        className="pd-annotation-svg"
        viewBox="0 0 520 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        {ANNOTATIONS.map((ann, i) => {
          const inner = polarXY(cx, cy, ann.angle, ann.r);
          const mid   = polarXY(cx, cy, ann.angle, ann.r + 40);
          return (
            <g key={i}>
              <line
                className="ann-line"
                x1={inner.x} y1={inner.y}
                x2={ann.lx + 10} y2={ann.ly + 10}
                style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              />
              <circle
                className="ann-dot"
                cx={ann.lx + 10} cy={ann.ly + 10} r="2.5"
                style={{ animationDelay: `${0.5 + i * 0.2}s` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Annotation labels */}
      {ANNOTATIONS.map((ann, i) => (
        <div
          key={i}
          className="pd-ann-label"
          style={{
            position: 'absolute',
            left: ann.lx,
            top: ann.ly,
            animationDelay: `${0.6 + i * 0.2}s`,
          }}
        >
          <div className="pd-ann-title">{ann.title}</div>
          <div className="pd-ann-value">{ann.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Animated counter ─── */
function AnimCounter({ target, suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const numTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        const isAlpha = isNaN(numTarget);
        if (isAlpha) { setVal(target); return; }
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(numTarget * ease));
          if (progress < 1) requestAnimationFrame(tick);
          else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Main Component ─── */
export default function ProductDetail() {
  const [qty, setQty] = useState(1);

  const fmtPrice = (n) =>
    'Rp ' + n.toLocaleString('id-ID').replace(/\./g, '.');

  return (
    <div className="pd-root">

      {/* NAV */}
      <nav className="pd-nav">
        <Link to="/" className="pd-nav-back">Kembali</Link>
        <Link to="/" className="pd-nav-logo">NOX<span>PIT</span></Link>
        <span className="pd-nav-sku">{PRODUCT.sku}</span>
      </nav>

      {/* ─── HERO ─── */}
      <div className="pd-hero">

        {/* INFO COLUMN */}
        <div className="pd-info">
          <div className="pd-category">
            <span className="pd-cat-badge">{PRODUCT.badge}</span>
            <span className="pd-cat-label">{PRODUCT.category}</span>
          </div>

          <div className="pd-name">
            <div className="pd-name-line1">{PRODUCT.name}</div>
            <div className="pd-name-line2">{PRODUCT.nameHighlight}</div>
          </div>
          <div className="pd-name-sub">{PRODUCT.subtitle}</div>

          <div className="pd-rating">
            <span className="pd-stars">★★★★★</span>
            <span className="pd-rating-num">{PRODUCT.rating}</span>
            <span className="pd-rating-count">({PRODUCT.reviewCount.toLocaleString()} ulasan)</span>
          </div>

          <div className="pd-price-block">
            <div className="pd-price-original">{fmtPrice(PRODUCT.originalPrice)}</div>
            <div className="pd-price">
              <span className="pd-price-currency">Rp</span>
              {PRODUCT.price.toLocaleString('id-ID')}
            </div>
            <div className="pd-price-label">Harga sudah termasuk PPN</div>
          </div>

          <div className="pd-divider" />

          <div className="pd-qty-row">
            <span className="pd-qty-label">Qty</span>
            <div className="pd-qty-ctrl">
              <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pd-qty-val">{qty}</span>
              <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="pd-stock">Stok: {PRODUCT.stock} unit</span>
          </div>

          <button className="pd-cta-primary">Order Sekarang →</button>
          <a href="https://wa.me/6285162659298" className="pd-cta-ghost">Hubungi via WhatsApp</a>

          <div className="pd-trust">
            <div className="pd-trust-item">OEM Certified — Kualitas terjamin</div>
            <div className="pd-trust-item">Garansi resmi 1 tahun NOXPIT</div>
            <div className="pd-trust-item">Pengiriman same-day Bandung</div>
            <div className="pd-trust-item">Gratis ongkir min. Rp 300.000</div>
          </div>
        </div>

        {/* VISUAL COLUMN */}
        <div className="pd-visual">
          {/* HUD corners */}
          <div className="pd-hud-corner-line tl" />
          <div className="pd-hud-corner-line tr" />
          <div className="pd-hud-corner-line bl" />
          <div className="pd-hud-corner-line br" />
          <div className="pd-hud-corner pd-hud-tl">
            NXP · Drivetrain<br />
            <span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>Engineering Grade</span>
          </div>
          <div className="pd-hud-corner pd-hud-tr">
            OEM Spec<br />
            <span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>ISO 9001 Certified</span>
          </div>
          <div className="pd-hud-corner pd-hud-bl">
            Stock: {PRODUCT.stock} units<br />
            <span style={{ color: '#48c05c', fontSize: 9 }}>● Available</span>
          </div>
          <div className="pd-hud-corner pd-hud-br">
            SKU {PRODUCT.sku}<br />
            <span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>Drive Chain Set</span>
          </div>

          <GearVisual />
        </div>
      </div>

      {/* ─── STAT STRIP ─── */}
      <div className="pd-stat-strip">
        {PRODUCT.keyStats.map((s, i) => (
          <div className="pd-stat-item" key={i}>
            <div className="pd-stat-num">
              <AnimCounter target={s.num} duration={900 + i * 150} />
            </div>
            <div className="pd-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─── SPECS ─── */}
      <div className="pd-specs-section">
        <div className="pd-section-eyebrow">Spesifikasi Teknis</div>
        <h2 className="pd-section-title">Data &amp;<br />Dimensi</h2>
        <div className="pd-specs-grid">
          {PRODUCT.specs.map((s, i) => (
            <div className="pd-spec-row" key={i}>
              <div className="pd-spec-label">{s.label}</div>
              <div className="pd-spec-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <div className="pd-features-section">
        <div className="pd-section-eyebrow">Keunggulan Produk</div>
        <h2 className="pd-section-title">Mengapa<br />NOXPIT?</h2>
        <div className="pd-features-grid">
          {PRODUCT.features.map((f, i) => (
            <div className="pd-feature-card" key={i}>
              <span className="pd-feature-icon">{f.icon}</span>
              <div className="pd-feature-title">{f.title}</div>
              <div className="pd-feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── COMPATIBILITY ─── */}
      <div className="pd-compat-section">
        <div className="pd-section-eyebrow">Kompatibilitas</div>
        <h2 className="pd-section-title">Motor<br />Yang Cocok</h2>
        <table className="pd-compat-table">
          <thead>
            <tr>
              <th>Model Motor</th>
              <th>Tahun Produksi</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCT.compatibility.map((row, i) => (
              <tr key={i}>
                <td>
                  <span className="pd-compat-model">{row.model}</span>
                  <span className="pd-compat-cc">{row.cc}</span>
                </td>
                <td>
                  <div className="pd-compat-years">
                    {row.years.map(y => (
                      <span className="pd-year-chip" key={y}>{y}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── RELATED ─── */}
      <div className="pd-related-section">
        <div className="pd-section-eyebrow">Produk Lainnya</div>
        <h2 className="pd-section-title">Lihat Juga</h2>
        <div className="pd-related-grid">
          {RELATED.map((r, i) => (
            <Link to="/product" className="pd-related-card" key={i}>
              <div className="pd-rel-corner" style={{ borderColor: `transparent ${r.color} transparent transparent` }} />
              <div className="pd-rel-label">{r.label}</div>
              <div className="pd-rel-name">{r.name}</div>
              <div className="pd-rel-visual">
                <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                  <circle cx="50" cy="50" r="40" stroke={r.color} strokeWidth="1.5" opacity="0.4" />
                  <circle cx="50" cy="50" r="24" stroke={r.color} strokeWidth="1.5" opacity="0.6" />
                  <line x1="41" y1="41" x2="59" y2="59" stroke={r.color} strokeWidth="2" />
                  <line x1="59" y1="41" x2="41" y2="59" stroke={r.color} strokeWidth="2" />
                </svg>
              </div>
              <div className="pd-rel-price" style={{ color: r.color }}>Rp {r.price}</div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
