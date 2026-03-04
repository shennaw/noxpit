import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { PRODUCTS, CATEGORIES, getCategoryColor, formatPrice } from '../data/products';
import AddToCartButton from '../components/AddToCartButton';
import WishlistButton from '../components/WishlistButton';
import './ProductsList.css';

function ProductCard({ product, index, t }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const catColor = getCategoryColor(product.category);

  return (
    <Link
      to={`/product/${product.id}`}
      className="pl-card"
      style={{ '--card-accent': catColor, animationDelay: `${index * 0.05}s` }}
    >
      <div className="pl-card-corner" style={{ borderColor: `transparent ${catColor} transparent transparent` }} />

      <div className="pl-card-top">
        <span className="pl-card-cat" style={{ color: catColor }}>{product.category}</span>
        {product.badge && (
          <span className="pl-card-badge" style={{ background: catColor }}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="pl-card-visual">
        <svg viewBox="0 0 120 120" width="80" height="80" fill="none">
          <circle cx="60" cy="60" r="48" stroke={catColor} strokeWidth="1.5" opacity="0.3" />
          <circle cx="60" cy="60" r="30" stroke={catColor} strokeWidth="1.5" opacity="0.5" />
          <circle cx="60" cy="60" r="12" fill={`${catColor}20`} stroke={catColor} strokeWidth="1.5" />
          <line x1="48" y1="48" x2="72" y2="72" stroke={catColor} strokeWidth="2" opacity="0.7" />
          <line x1="72" y1="48" x2="48" y2="72" stroke={catColor} strokeWidth="2" opacity="0.7" />
        </svg>
      </div>

      <div className="pl-card-name">{product.shortName}</div>
      <div className="pl-card-highlight">{product.nameHighlight}</div>

      <div className="pl-card-rating">
        <span className="pl-card-stars">{'★'.repeat(Math.floor(product.rating))}</span>
        <span className="pl-card-rating-num">{product.rating}</span>
        <span className="pl-card-reviews">({product.reviewCount.toLocaleString()})</span>
      </div>

      <div className="pl-card-price-row">
        <span className="pl-card-price" style={{ color: catColor }}>
          {formatPrice(product.price)}
        </span>
        {discount > 0 && <span className="pl-card-discount">-{discount}%</span>}
      </div>

      <div className="pl-card-original">{formatPrice(product.originalPrice)}</div>

      <div className="pl-card-footer">
        <span className={`pl-card-stock ${product.stock < 10 ? 'low' : ''}`}>
          {t('pl.stock')}: {product.stock}
        </span>
        <div className="pl-card-actions">
          <WishlistButton product={product} size={14} />
          <AddToCartButton product={product} />
          <span className="pl-card-detail">{t('pl.detail')} →</span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductsList() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const gridRef = useRef(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pl-root">
      {/* HEADER */}
      <div className="pl-header">
        <div className="pl-header-content">
          <div className="pl-eyebrow">{t('pl.catalog')}</div>
          <h1 className="pl-title">{t('pl.allProducts').split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</h1>
          <p className="pl-subtitle">{t('pl.subtitle')}</p>
        </div>
        <div className="pl-header-stat">
          <div className="pl-header-stat-num">{PRODUCTS.length}</div>
          <div className="pl-header-stat-label">{t('pl.totalProducts')}</div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="pl-filters">
        <div className="pl-filter-cats">
          <button
            className={`pl-cat-btn ${activeCategory === 'Semua' ? 'active' : ''}`}
            onClick={() => setActiveCategory('Semua')}
          >
            {t('pl.all')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className={`pl-cat-btn ${activeCategory === cat.name ? 'active' : ''}`}
              style={activeCategory === cat.name ? { '--active-color': cat.color } : {}}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="pl-filter-right">
          <div className="pl-search-wrap">
            <input
              type="text"
              className="pl-search"
              placeholder={t('pl.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="pl-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">{t('pl.popular')}</option>
            <option value="price-asc">{t('pl.priceAsc')}</option>
            <option value="price-desc">{t('pl.priceDesc')}</option>
            <option value="rating">{t('pl.topRated')}</option>
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="pl-grid" ref={gridRef}>
        {sorted.length > 0 ? (
          sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} t={t} />
          ))
        ) : (
          <div className="pl-empty">
            <div className="pl-empty-icon">✕</div>
            <div className="pl-empty-text">{t('pl.noProducts')}</div>
            <button className="pl-empty-reset" onClick={() => { setActiveCategory('Semua'); setSearchQuery(''); }}>
              {t('pl.resetFilter')}
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      <div className="pl-bottom-cta">
        <div>
          <div className="pl-bottom-eyebrow">{t('pl.needHelp')}</div>
          <div className="pl-bottom-title">{t('pl.contactUs')}</div>
        </div>
        <a href="https://wa.me/6285162659298" className="pl-wa-btn">
          WhatsApp →
        </a>
      </div>
    </div>
  );
}
