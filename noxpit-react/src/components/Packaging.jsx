const packs = [
  { label: 'Drivetrain', color: '#f07020', img: '/drivetrain-component.png' },
  { label: 'CVT', color: '#0091d0', img: '/cvt-component.png' },
  { label: 'Brakes', color: '#f5c800', img: '/brake-component.png' },
];

export default function Packaging() {
  return (
    <section className="packaging-section" id="features">
      <div className="pack-header reveal">
        <div className="section-tag">Packaging Experience</div>
        <h2 className="section-title">Bukan Sekadar<br />Kemasan</h2>
      </div>

      <div className="pack-grid">
        <div className="pack-hero reveal">
          <img src="/electrical-component.png" alt="NOXPIT Packaging" className="pack-hero-img" />
          <div className="pack-hero-overlay" />
          <div className="pack-hero-badge">Distinctive Experience</div>
          <div className="pack-hero-bottom">
            <div className="pack-hero-label">Vibrant Industrial Color</div>
            <div className="pack-hero-sub">Sistem warna per kategori produk</div>
          </div>
        </div>

        <div className="pack-right">
          <div className="pack-text reveal">
            <div className="pack-tagline">Not just a part, it's an upgrade experience.</div>
            <p className="pack-desc">
              Setiap produk NOXPIT dikemas dengan sistem warna vibrant yang khas — memudahkan identifikasi kategori sekaligus memberikan pengalaman unboxing yang berbeda dari kompetitor.
            </p>
            <div className="pack-features">
              <div className="pack-feat reveal reveal-delay-1">
                <span className="pack-feat-dot" style={{ background: '#0091d0' }} />
                Warna unik per kategori produk
              </div>
              <div className="pack-feat reveal reveal-delay-2">
                <span className="pack-feat-dot" style={{ background: '#f287b7' }} />
                Kemasan terorganisir dan informatif
              </div>
              <div className="pack-feat reveal reveal-delay-3">
                <span className="pack-feat-dot" style={{ background: '#7869af' }} />
                Perlindungan produk premium
              </div>
            </div>
          </div>

          <div className="pack-colors reveal">
            {packs.map((p) => (
              <div className="pack-color-card" key={p.label}>
                <div className="pack-color-bg" style={{ background: p.color }} />
                <img src={p.img} alt={p.label} className="pack-color-img" />
                <div className="pack-color-label">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
