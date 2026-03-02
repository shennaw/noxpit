export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-x">
        <svg viewBox="0 0 300 300" fill="none">
          <line x1="30" y1="30" x2="270" y2="270" stroke="white" strokeWidth="60"/>
          <line x1="270" y1="30" x2="30" y2="270" stroke="white" strokeWidth="60"/>
        </svg>
      </div>
      <div>
        <h2 className="cta-title">Siap Upgrade<br />Motor Anda?</h2>
        <p className="cta-sub">Temukan semua kebutuhan suku cadang di satu tempat</p>
      </div>
      <a href="#" className="btn-white">Shop Sekarang</a>
    </section>
  );
}
