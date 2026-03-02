import { CatXIcon } from './XIcon';

const cats = ['Electrical', 'Suspension', 'CVT', 'Brakes', 'Drivetrain', 'Controls', 'Engine'];

export default function Categories() {
  return (
    <section className="section" id="products">
      <div className="section-header reveal">
        <div>
          <div className="section-tag">Kategori</div>
          <h2 className="section-title">Semua Kategori<br />Suku Cadang</h2>
        </div>
        <a href="#" className="view-all">Lihat Semua →</a>
      </div>

      <div className="categories reveal">
        {cats.map((name) => (
          <div className="cat-card" key={name}>
            <div className="cat-bg" />
            <CatXIcon />
            <div className="cat-info">
              <div className="cat-name">{name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
