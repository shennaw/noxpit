import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { PRODUCTS, formatPrice, getCategoryColor } from '../data/products';
import { PRODUCT_DETAILS } from '../data/productDetails';
import { useReviews } from '../hooks/useReviews';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import AddToCartButton from '../components/AddToCartButton';
import WishlistButton from '../components/WishlistButton';
import './ProductDetail.css';

/* ─── Annotation positions ─── */
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
function GearVisual({ color = '#0091d0' }) {
  const cx = 260, cy = 260;
  const TICKS = Array.from({ length: 36 });

  return (
    <div className="pd-gear-wrap">
      <div className="pd-tick-ring">
        {TICKS.map((_, i) => (
          <div key={i} className="pd-tick" style={{ transform: `rotate(${i * 10}deg)` }} />
        ))}
      </div>
      <div className="pd-ring-outer" />
      <svg className="pd-gear-main" width="240" height="240" viewBox="0 0 340 340" fill="none">
        <circle cx="170" cy="170" r="155" stroke={`${color}10`} strokeWidth="1" />
        <circle cx="170" cy="170" r="130" stroke={`${color}26`} strokeWidth="1" />
        <circle cx="170" cy="170" r="90"  stroke={`${color}20`} strokeWidth="1" />
        <circle cx="170" cy="170" r="50"  stroke={`${color}48`} strokeWidth="1.5" />
        <circle cx="170" cy="170" r="25"  fill={`${color}20`} stroke={`${color}80`} strokeWidth="1.5" />
        <line x1="170" y1="158" x2="170" y2="182" stroke={`${color}99`} strokeWidth="1.5" />
        <line x1="158" y1="170" x2="182" y2="170" stroke={`${color}99`} strokeWidth="1.5" />
        <g stroke={color} strokeWidth="2.5" opacity="0.8">
          {[0, 25.7, 51.4, 77.1, 102.8, 128.5, 154.2, 180, 205.7, 231.4, 257.1, 282.8, 308.5, 334.2].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <line key={i} x1={170 + 115 * Math.cos(rad)} y1={170 + 115 * Math.sin(rad)} x2={170 + 130 * Math.cos(rad)} y2={170 + 130 * Math.sin(rad)} />;
          })}
        </g>
        <g stroke={`${color}59`} strokeWidth="1.2">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return <line key={i} x1={170 + 28 * Math.cos(rad)} y1={170 + 28 * Math.sin(rad)} x2={170 + 88 * Math.cos(rad)} y2={170 + 88 * Math.sin(rad)} />;
          })}
        </g>
        <line x1="155" y1="155" x2="185" y2="185" stroke={color} strokeWidth="2.5" opacity="0.7" />
        <line x1="185" y1="155" x2="155" y2="185" stroke={color} strokeWidth="2.5" opacity="0.7" />
      </svg>
      <svg className="pd-annotation-svg" viewBox="0 0 520 520">
        {ANNOTATIONS.map((ann, i) => {
          const inner = polarXY(cx, cy, ann.angle, ann.r);
          return (
            <g key={i}>
              <line className="ann-line" x1={inner.x} y1={inner.y} x2={ann.lx + 10} y2={ann.ly + 10} style={{ animationDelay: `${0.3 + i * 0.2}s` }} />
              <circle className="ann-dot" cx={ann.lx + 10} cy={ann.ly + 10} r="2.5" style={{ animationDelay: `${0.5 + i * 0.2}s` }} />
            </g>
          );
        })}
      </svg>
      {ANNOTATIONS.map((ann, i) => (
        <div key={i} className="pd-ann-label" style={{ position: 'absolute', left: ann.lx, top: ann.ly, animationDelay: `${0.6 + i * 0.2}s` }}>
          <div className="pd-ann-title">{ann.title}</div>
          <div className="pd-ann-value">{ann.value}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Animated counter ─── */
function AnimCounter({ target, duration = 1200 }) {
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
        if (isNaN(numTarget)) { setVal(target); return; }
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
  return <span ref={ref}>{val}</span>;
}

/* ─── Main Component ─── */
export default function ProductDetail() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const { lang, t } = useLang();

  const product = PRODUCTS.find((p) => p.id === id);
  const details = PRODUCT_DETAILS[id];
  const { getProductReviews, addReview, averageRating, hasUserReviewed } = useReviews(id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) {
    return (
      <div className="pd-root">
        <div style={{ padding: '200px 60px', textAlign: 'center', color: 'rgba(var(--fg-rgb),0.4)' }}>Product not found</div>
      </div>
    );
  }

  const catColor = getCategoryColor(product.category);
  const related = PRODUCTS.filter((p) => p.id !== id).slice(0, 3);
  const reviews = getProductReviews();
  const avgRating = averageRating();

  return (
    <div className="pd-root">
      {/* HERO */}
      <div className="pd-hero">
        <div className="pd-info">
          <div className="pd-category">
            {product.badge && <span className="pd-cat-badge">{product.badge}</span>}
            <span className="pd-cat-label">{product.category}</span>
          </div>
          <div className="pd-name">
            <div className="pd-name-line1" style={{ color: catColor }}>{product.shortName}</div>
            <div className="pd-name-line2">{product.nameHighlight}</div>
          </div>
          <div className="pd-name-sub">{product.subtitle}</div>
          <div className="pd-rating">
            <span className="pd-stars">★★★★★</span>
            <span className="pd-rating-num">{product.rating}</span>
            <span className="pd-rating-count">({product.reviewCount.toLocaleString()} {t('review.reviews')})</span>
          </div>
          <div className="pd-price-block">
            <div className="pd-price-original">{formatPrice(product.originalPrice)}</div>
            <div className="pd-price">
              <span className="pd-price-currency">Rp</span>
              {product.price.toLocaleString('id-ID')}
            </div>
            <div className="pd-price-label">{t('pd.priceIncludesTax')}</div>
          </div>
          <div className="pd-divider" />
          <div className="pd-qty-row">
            <span className="pd-qty-label">{t('cart.qty')}</span>
            <div className="pd-qty-ctrl">
              <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pd-qty-val">{qty}</span>
              <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <span className="pd-stock">{t('pd.stock')}: {product.stock} {t('pd.unit')}</span>
          </div>
          <div className="pd-cta-row">
            <AddToCartButton product={product} qty={qty} full className="pd-cta-primary" />
            <WishlistButton product={product} size={20} />
          </div>
          <a href="https://wa.me/6285162659298" className="pd-cta-ghost">{t('pd.contactWa')}</a>
          <div className="pd-trust">
            <div className="pd-trust-item">{t('pd.trust1')}</div>
            <div className="pd-trust-item">{t('pd.trust2')}</div>
            <div className="pd-trust-item">{t('pd.trust3')}</div>
            <div className="pd-trust-item">{t('pd.trust4')}</div>
          </div>
        </div>

        <div className="pd-visual">
          <div className="pd-hud-corner-line tl" />
          <div className="pd-hud-corner-line tr" />
          <div className="pd-hud-corner-line bl" />
          <div className="pd-hud-corner-line br" />
          <div className="pd-hud-corner pd-hud-tl">NXP · {product.category}<br /><span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>Engineering Grade</span></div>
          <div className="pd-hud-corner pd-hud-tr">OEM Spec<br /><span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>ISO 9001 Certified</span></div>
          <div className="pd-hud-corner pd-hud-bl">Stock: {product.stock} units<br /><span style={{ color: '#48c05c', fontSize: 9 }}>● Available</span></div>
          <div className="pd-hud-corner pd-hud-br">SKU {product.sku}<br /><span style={{ color: 'rgba(0,145,208,0.25)', fontWeight: 400, fontSize: 9 }}>{product.category}</span></div>
          <GearVisual color={catColor} />
        </div>
      </div>

      {/* STAT STRIP */}
      {details?.keyStats && (
        <div className="pd-stat-strip">
          {details.keyStats.map((s, i) => (
            <div className="pd-stat-item" key={i}>
              <div className="pd-stat-num"><AnimCounter target={s.num} duration={900 + i * 150} /></div>
              <div className="pd-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* SPECS */}
      {details?.specs && (
        <div className="pd-specs-section">
          <div className="pd-section-eyebrow">{t('pd.specs')}</div>
          <h2 className="pd-section-title">{t('pd.dataAndDimensions').split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
          <div className="pd-specs-grid">
            {details.specs.map((s, i) => (
              <div className="pd-spec-row" key={i}>
                <div className="pd-spec-label">{s.label}</div>
                <div className="pd-spec-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      {details?.features && (
        <div className="pd-features-section">
          <div className="pd-section-eyebrow">{t('pd.features')}</div>
          <h2 className="pd-section-title">{t('pd.whyNoxpit').split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
          <div className="pd-features-grid">
            {details.features.map((f, i) => (
              <div className="pd-feature-card" key={i}>
                <span className="pd-feature-icon">{f.icon}</span>
                <div className="pd-feature-title">{lang === 'en' ? f.titleEn : f.title}</div>
                <div className="pd-feature-desc">{lang === 'en' ? f.descEn : f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPATIBILITY */}
      {details?.compatibility && (
        <div className="pd-compat-section">
          <div className="pd-section-eyebrow">{t('pd.compatibility')}</div>
          <h2 className="pd-section-title">{t('pd.compatibleMotors').split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h2>
          <table className="pd-compat-table">
            <thead><tr><th>{t('pd.modelMotor')}</th><th>{t('pd.productionYear')}</th></tr></thead>
            <tbody>
              {details.compatibility.map((row, i) => (
                <tr key={i}>
                  <td><span className="pd-compat-model">{row.model}</span><span className="pd-compat-cc">{row.cc}</span></td>
                  <td><div className="pd-compat-years">{row.years.map(y => <span className="pd-year-chip" key={y}>{y}</span>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* REVIEWS */}
      <div className="pd-reviews-section">
        <div className="pd-section-eyebrow">{t('review.title')}</div>
        <h2 className="pd-section-title">{t('review.title')}</h2>
        <ReviewForm onSubmit={addReview} hasReviewed={hasUserReviewed()} />
        <ReviewsList reviews={reviews} averageRating={avgRating} />
      </div>

      {/* RELATED */}
      <div className="pd-related-section">
        <div className="pd-section-eyebrow">{t('pd.related')}</div>
        <h2 className="pd-section-title">{t('pd.seeAlso')}</h2>
        <div className="pd-related-grid">
          {related.map((r) => {
            const rc = getCategoryColor(r.category);
            return (
              <Link to={`/product/${r.id}`} className="pd-related-card" key={r.id}>
                <div className="pd-rel-corner" style={{ borderColor: `transparent ${rc} transparent transparent` }} />
                <div className="pd-rel-label">{r.category}</div>
                <div className="pd-rel-name">{r.shortName}<br />{r.nameHighlight}</div>
                <div className="pd-rel-visual">
                  <svg viewBox="0 0 100 100" width="80" height="80" fill="none">
                    <circle cx="50" cy="50" r="40" stroke={rc} strokeWidth="1.5" opacity="0.4" />
                    <circle cx="50" cy="50" r="24" stroke={rc} strokeWidth="1.5" opacity="0.6" />
                    <line x1="41" y1="41" x2="59" y2="59" stroke={rc} strokeWidth="2" />
                    <line x1="59" y1="41" x2="41" y2="59" stroke={rc} strokeWidth="2" />
                  </svg>
                </div>
                <div className="pd-rel-price" style={{ color: rc }}>{formatPrice(r.price)}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
