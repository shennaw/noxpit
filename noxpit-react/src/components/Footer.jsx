import logo from '/noxpit-logo.png';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();

  const infoLinks = [
    { key: 'footer.aboutUs' },
    { key: 'footer.howToOrder' },
    { key: 'footer.returnPolicy' },
    { key: 'footer.faq' },
    { key: 'footer.careers' },
  ];

  return (
    <>
      <footer id="contact">
        <div className="footer-brand">
          <a href="#" className="logo logo-footer" style={{ marginBottom: 16 }}>
            <img src={logo} alt="NOXPIT" />
          </a>
          <p className="footer-desc">{t('footer.desc')}</p>
          <div className="footer-contact">
            <div>📍 Jl. Pungkur No. 157, Bandung, Jawa Barat</div>
            <div>📞 <a href="tel:+6285162659298">+62 851 6265 9298</a></div>
            <div>✉ <a href="mailto:hello@noxpit.com">hello@noxpit.com</a></div>
            <div>🌐 <a href="#">www.noxpit.com</a></div>
          </div>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.products')}</div>
          <ul className="footer-links">
            {['Electrical', 'Suspension', 'CVT / Transmission', 'Brakes', 'Drivetrain', 'Controls & Cables', 'Engine & Maintenance'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.brands')}</div>
          <ul className="footer-links">
            {['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-col-title">{t('footer.info')}</div>
          <ul className="footer-links">
            {infoLinks.map(item => (
              <li key={item.key}><a href="#">{t(item.key)}</a></li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="footer-bottom">
        <div className="footer-copy">{t('footer.copyright')}</div>
        <div className="footer-social">
          {['IG', 'TK', 'FB', 'WA'].map(s => (
            <a key={s} href="#">{s}</a>
          ))}
        </div>
      </div>
    </>
  );
}
