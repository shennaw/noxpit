import { useCarousel, ACCENT_COLORS } from '../hooks/useCarousel';
import { XIcon } from './XIcon';

const slides = [
  {
    slideClass: 'slide-0',
    tag: 'Drivetrain • Best Seller',
    titleAccent: 'Gear Set',
    titleLine2: 'Honda',
    titleOutline: 'REVO',
    desc: 'Menyalurkan tenaga dari mesin ke roda secara optimal. Material kuat dan presisi untuk daya tahan lebih baik dan pemakaian yang stabil.',
    ghostLabel: 'Lihat Produk',
    stats: [{ num: 'Rp285K', label: 'Harga Terbaik' }, { num: 'OEM', label: 'Certified Quality' }, { num: '1 Yr', label: 'Garansi Resmi' }],
    badges: ['OEM Quality', 'Garansi Resmi', '500+ Variants'],
    visual: <GearSVG color="#0091d0" />,
  },
  {
    slideClass: 'slide-1',
    tag: 'Electrical • New Arrival',
    titleAccent: 'Stator',
    titleLine2: 'Assy',
    titleOutline: 'Vario 125',
    desc: 'Komponen kelistrikan premium dengan performa konsisten. Dirancang khusus untuk Honda Vario 125 dengan teknologi winding terkini.',
    ghostLabel: 'Lihat Detail',
    stats: [{ num: 'Rp420K', label: 'Harga Terbaik' }, { num: 'OEM', label: 'Certified Quality' }, { num: '2 Yr', label: 'Garansi Resmi' }],
    badges: ['Electrical', 'New Arrival', 'Premium Grade'],
    visual: <StatorSVG />,
  },
  {
    slideClass: 'slide-2',
    tag: 'Engine • Top Pick',
    titleAccent: 'Cylinder',
    titleLine2: 'Block',
    titleOutline: 'Assy MIO',
    desc: 'Blok silinder presisi tinggi dengan material paduan aluminium terpilih. Memastikan kompresi optimal dan umur mesin yang lebih panjang.',
    ghostLabel: 'Lihat Detail',
    stats: [{ num: 'Rp890K', label: 'Harga Terbaik' }, { num: 'OEM', label: 'Certified Quality' }, { num: '2 Yr', label: 'Garansi Resmi' }],
    badges: ['Engine Part', 'Top Seller', 'Precision Fit'],
    visual: <CylinderSVG />,
  },
];

function GearSVG({ color = '#0091d0' }) {
  return (
    <svg className="gear-svg" viewBox="0 0 340 340" fill="none">
      <circle cx="170" cy="170" r="130" stroke={`rgba(0,145,208,0.2)`} strokeWidth="1"/>
      <circle cx="170" cy="170" r="90" stroke={`rgba(0,145,208,0.15)`} strokeWidth="1"/>
      <circle cx="170" cy="170" r="50" stroke={`rgba(0,145,208,0.3)`} strokeWidth="2"/>
      <circle cx="170" cy="170" r="25" fill={`rgba(0,145,208,0.15)`} stroke={`rgba(0,145,208,0.5)`} strokeWidth="1.5"/>
      <g stroke={color} strokeWidth="2.5" opacity="0.7">
        <line x1="170" y1="40" x2="170" y2="20"/><line x1="210" y1="48" x2="220" y2="30"/>
        <line x1="242" y1="72" x2="258" y2="60"/><line x1="260" y1="110" x2="280" y2="108"/>
        <line x1="260" y1="150" x2="280" y2="155"/><line x1="242" y1="185" x2="258" y2="198"/>
        <line x1="210" y1="208" x2="220" y2="228"/><line x1="170" y1="218" x2="170" y2="238"/>
        <line x1="130" y1="208" x2="120" y2="228"/><line x1="98" y1="185" x2="82" y2="198"/>
        <line x1="80" y1="150" x2="60" y2="155"/><line x1="80" y1="110" x2="60" y2="108"/>
        <line x1="98" y1="72" x2="82" y2="60"/><line x1="130" y1="48" x2="120" y2="30"/>
      </g>
      <g stroke="rgba(0,145,208,0.4)" strokeWidth="1.5">
        <line x1="170" y1="120" x2="170" y2="145"/><line x1="170" y1="195" x2="170" y2="220"/>
        <line x1="120" y1="170" x2="145" y2="170"/><line x1="195" y1="170" x2="220" y2="170"/>
        <line x1="135" y1="135" x2="152" y2="152"/><line x1="188" y1="152" x2="205" y2="135"/>
        <line x1="135" y1="205" x2="152" y2="188"/><line x1="188" y1="188" x2="205" y2="205"/>
      </g>
      <line x1="155" y1="155" x2="185" y2="185" stroke={color} strokeWidth="3" opacity="0.8"/>
      <line x1="185" y1="155" x2="155" y2="185" stroke={color} strokeWidth="3" opacity="0.8"/>
    </svg>
  );
}

function StatorSVG() {
  return (
    <svg className="gear-svg" viewBox="0 0 340 340" fill="none">
      <circle cx="170" cy="170" r="130" stroke="rgba(242,135,183,0.2)" strokeWidth="1"/>
      <circle cx="170" cy="170" r="100" stroke="rgba(242,135,183,0.15)" strokeWidth="1" strokeDasharray="6 6"/>
      <circle cx="170" cy="170" r="60" stroke="rgba(242,135,183,0.35)" strokeWidth="2"/>
      <circle cx="170" cy="170" r="30" fill="rgba(242,135,183,0.1)" stroke="rgba(242,135,183,0.5)" strokeWidth="2"/>
      <g stroke="#f287b7" strokeWidth="3" opacity="0.8">
        <rect x="155" y="38" width="30" height="50" rx="4" fill="rgba(242,135,183,0.15)"/>
        <rect x="155" y="252" width="30" height="50" rx="4" fill="rgba(242,135,183,0.15)"/>
        <rect x="38" y="155" width="50" height="30" rx="4" fill="rgba(242,135,183,0.15)"/>
        <rect x="252" y="155" width="50" height="30" rx="4" fill="rgba(242,135,183,0.15)"/>
        <rect x="83" y="64" width="30" height="50" rx="4" fill="rgba(242,135,183,0.1)" transform="rotate(-45 98 89)"/>
        <rect x="204" y="64" width="30" height="50" rx="4" fill="rgba(242,135,183,0.1)" transform="rotate(45 219 89)"/>
        <rect x="83" y="226" width="30" height="50" rx="4" fill="rgba(242,135,183,0.1)" transform="rotate(45 98 251)"/>
        <rect x="204" y="226" width="30" height="50" rx="4" fill="rgba(242,135,183,0.1)" transform="rotate(-45 219 251)"/>
      </g>
      <line x1="155" y1="155" x2="185" y2="185" stroke="#f287b7" strokeWidth="3" opacity="0.8"/>
      <line x1="185" y1="155" x2="155" y2="185" stroke="#f287b7" strokeWidth="3" opacity="0.8"/>
    </svg>
  );
}

function CylinderSVG() {
  return (
    <svg className="gear-svg" viewBox="0 0 340 340" fill="none">
      <circle cx="170" cy="170" r="130" stroke="rgba(120,105,175,0.2)" strokeWidth="1"/>
      <rect x="90" y="90" width="160" height="160" rx="6" stroke="rgba(120,105,175,0.4)" strokeWidth="2" fill="rgba(120,105,175,0.07)"/>
      <circle cx="170" cy="170" r="55" stroke="#7869af" strokeWidth="2.5" fill="rgba(120,105,175,0.12)"/>
      <circle cx="170" cy="170" r="35" stroke="rgba(120,105,175,0.5)" strokeWidth="1.5" strokeDasharray="5 5"/>
      <g stroke="rgba(120,105,175,0.5)" strokeWidth="1.5">
        <line x1="90" y1="115" x2="250" y2="115"/><line x1="90" y1="135" x2="250" y2="135"/>
        <line x1="90" y1="155" x2="115" y2="155"/><line x1="225" y1="155" x2="250" y2="155"/>
        <line x1="90" y1="185" x2="115" y2="185"/><line x1="225" y1="185" x2="250" y2="185"/>
        <line x1="90" y1="205" x2="250" y2="205"/><line x1="90" y1="225" x2="250" y2="225"/>
      </g>
      <circle cx="108" cy="108" r="6" stroke="#7869af" strokeWidth="1.5" fill="rgba(120,105,175,0.3)"/>
      <circle cx="232" cy="108" r="6" stroke="#7869af" strokeWidth="1.5" fill="rgba(120,105,175,0.3)"/>
      <circle cx="108" cy="232" r="6" stroke="#7869af" strokeWidth="1.5" fill="rgba(120,105,175,0.3)"/>
      <circle cx="232" cy="232" r="6" stroke="#7869af" strokeWidth="1.5" fill="rgba(120,105,175,0.3)"/>
      <line x1="155" y1="155" x2="185" y2="185" stroke="#7869af" strokeWidth="3" opacity="0.8"/>
      <line x1="185" y1="155" x2="155" y2="185" stroke="#7869af" strokeWidth="3" opacity="0.8"/>
    </svg>
  );
}

export default function Hero() {
  const { current, goTo, trackRef, progressRef, SLIDE_COUNT } = useCarousel();

  return (
    <section className="hero" id="hero-carousel">
      <div className="noise" />
      <div className="carousel-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-slide ${slide.slideClass}`}>
            <div className="slide-bg" />
            <div className="hero-x">
              <XIcon />
            </div>
            <div className="hero-content">
              <div className="hero-tag">{slide.tag}</div>
              <h1 className="hero-title">
                <span className="accent">{slide.titleAccent}</span><br />
                {slide.titleLine2}<br />
                <span className="line-2">{slide.titleOutline}</span>
              </h1>
              <p className="hero-desc">{slide.desc}</p>
              <div className="hero-actions">
                <a href="#products" className="btn-primary">Order Sekarang</a>
                <a href="#products" className="btn-ghost">{slide.ghostLabel}</a>
              </div>
              <div className="hero-stats">
                {slide.stats.map((s, j) => (
                  <div className="stat" key={j}>
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-visual">
              <div className="product-showcase">
                <div className="glow-ring glow-ring-1" />
                <div className="glow-ring glow-ring-2" />
                <div className="glow-ring glow-ring-3" />
                {slide.visual}
                <div className="badge badge-1">{slide.badges[0]}</div>
                <div className="badge badge-2">{slide.badges[1]}</div>
                <div className="badge badge-3">{slide.badges[2]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${current === i ? ' active' : ''}`}
              data-index={i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="carousel-arrows">
          <button className="carousel-arrow" onClick={() => goTo(current - 1)}>&#8592;</button>
          <button className="carousel-arrow" onClick={() => goTo(current + 1)}>&#8594;</button>
        </div>
      </div>

      <div className="carousel-counter">
        <span>{current + 1}</span> / {SLIDE_COUNT}
      </div>

      <div
        className="carousel-progress"
        ref={progressRef}
        style={{ background: ACCENT_COLORS[0] }}
      />
    </section>
  );
}
