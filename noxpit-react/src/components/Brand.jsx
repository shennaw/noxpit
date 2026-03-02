export default function Brand() {
  return (
    <section className="brand-section" id="about">
      <div className="brand-bg-x">
        <svg viewBox="0 0 500 500" fill="none">
          <line x1="50" y1="50" x2="450" y2="450" stroke="white" strokeWidth="80"/>
          <line x1="450" y1="50" x2="50" y2="450" stroke="white" strokeWidth="80"/>
        </svg>
      </div>

      <div>
        <div className="brand-eyebrow reveal">Tentang NOXPIT</div>
        <h2 className="brand-title reveal">Gaya Baru<br />Dunia <span>Otomotif</span></h2>
        <p className="brand-desc reveal">
          NOXPIT adalah toko online dan offline yang menyediakan berbagai suku cadang motor berkualitas tinggi dengan harga terbaik. Mencoba tetap relevan dengan zaman, NOXPIT membawa gaya baru dalam dunia otomotif.
        </p>
        <div className="features-list">
          <div className="feature-item reveal reveal-delay-1">
            <div className="feature-icon">⚙</div>
            <div className="feature-text">
              <strong>Kualitas Terjamin</strong>
              Produk original dan OEM tersertifikasi dengan standar kualitas tinggi
            </div>
          </div>
          <div className="feature-item reveal reveal-delay-2">
            <div className="feature-icon">🚀</div>
            <div className="feature-text">
              <strong>Pengiriman Cepat</strong>
              Sistem pengiriman terintegrasi ke seluruh Indonesia
            </div>
          </div>
          <div className="feature-item reveal reveal-delay-3">
            <div className="feature-icon">🛡</div>
            <div className="feature-text">
              <strong>Garansi Resmi</strong>
              Setiap produk dilindungi garansi dan dapat diklaim dengan mudah
            </div>
          </div>
        </div>
      </div>

      <div className="brand-visual reveal">
        <div className="bv-card tall">
          <div className="bv-bg" />
          <div className="bv-num">01</div>
          <div className="bv-content">
            <div className="bv-label">Online & Offline</div>
            <div className="bv-sub">Bandung, Jawa Barat</div>
          </div>
        </div>
        <div className="bv-card">
          <div className="bv-bg" />
          <div className="bv-num">02</div>
          <div className="bv-content">
            <div className="bv-label">500+ SKU</div>
            <div className="bv-sub">Produk Tersedia</div>
          </div>
        </div>
        <div className="bv-card">
          <div className="bv-bg" />
          <div className="bv-num">03</div>
          <div className="bv-content">
            <div className="bv-label">10.000+</div>
            <div className="bv-sub">Pelanggan Puas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
