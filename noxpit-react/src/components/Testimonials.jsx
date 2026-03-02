const reviews = [
  {
    text: 'Packaging-nya keren banget, warna-warni vibrant bikin produknya keliatan premium. Gear set-nya juga original dan presisi banget dipasangnya.',
    avatar: 'R',
    name: 'Rizky Pratama',
    role: 'Mekanik, Bandung',
    avatarStyle: {},
    delay: '',
  },
  {
    text: 'Pesan online, tiba keesokan harinya dalam kondisi sempurna. Shock belakangnya jauh lebih baik dari produk yang biasa saya pakai.',
    avatar: 'A',
    name: 'Agus Setiawan',
    role: 'Pelanggan Setia',
    avatarStyle: { background: 'var(--pink)' },
    delay: 'reveal-delay-1',
  },
  {
    text: 'Brand lokal tapi kualitasnya nggak main-main. Cylinder block assy-nya pas banget dan garansinya bikin tenang. Noxpit terbaik!',
    avatar: 'D',
    name: 'Dian Kurnia',
    role: 'Bengkel Motor, Jakarta',
    avatarStyle: { background: 'var(--purple)' },
    delay: 'reveal-delay-2',
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-section">
      <div className="section-header reveal">
        <div>
          <div className="section-tag">Ulasan</div>
          <h2 className="section-title">Apa Kata<br />Pelanggan Kami</h2>
        </div>
      </div>
      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <div key={i} className={`testi-card reveal ${r.delay}`}>
            <div className="testi-quote">"</div>
            <p className="testi-text">{r.text}</p>
            <div className="testi-author">
              <div className="testi-avatar" style={r.avatarStyle}>{r.avatar}</div>
              <div>
                <div className="testi-name">{r.name}</div>
                <div className="testi-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
