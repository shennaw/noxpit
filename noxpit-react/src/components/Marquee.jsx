const items = ['Gear Set', 'Shock Belakang', 'Kabel Gas', 'Plat Kopling', 'Stator Assy', 'Cylinder Block', 'Roller', 'Master Rem Kit'];

export default function Marquee() {
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {[...items, ...items].map((item, i) => (
          <span className="marquee-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}
