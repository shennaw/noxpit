import { Link } from 'react-router-dom';
import { CatXIcon } from './XIcon';

const cats = [
  { name: 'Electrical', cover: '/electrical-component.png' },
  { name: 'Suspension', cover: '/suspension-component.png' },
  { name: 'CVT', cover: '/cvt-component.png' },
  { name: 'Brakes', cover: '/brake-component.png' },
  { name: 'Drivetrain', cover: '/drivetrain-component.png' },
  { name: 'Controls', cover: '/controls-component.png' },
  { name: 'Engine', cover: '/engine-component.png' },
];

export default function Categories() {
  return (
    <section className="section" id="products">
      <div className="section-header reveal">
        <div>
          <div className="section-tag">Kategori</div>
          <h2 className="section-title">Semua Kategori<br />Suku Cadang</h2>
        </div>
        <Link to="/products" className="view-all">Lihat Semua →</Link>
      </div>

      <div className="categories reveal">
        {cats.map((cat) => (
          <div className="cat-card" key={cat.name} data-has-cover={cat.cover ? 'true' : undefined}>
            <div className="cat-bg">
              {cat.cover && <img src={cat.cover} alt={cat.name} className="cat-cover-img" />}
            </div>
            {!cat.cover && <CatXIcon />}
            <div className="cat-info">
              <div className="cat-name">{cat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
