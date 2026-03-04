import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { PRODUCTS, formatPrice, getCategoryColor } from '../data/products';
import './Wishlist.css';

export default function Wishlist() {
  const { t } = useLang();
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleMoveToCart = (item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      addItem(product, 1);
      toggleWishlist(product);
      showToast(t('cart.addedToCart'), 'success');
    }
  };

  const handleRemove = (item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId) || { id: item.productId };
    toggleWishlist(product);
  };

  return (
    <div className="wl-root">

      <div className="wl-header">
        <div className="wl-eyebrow">{t('wishlist.title')}</div>
        <h1 className="wl-title">{t('wishlist.title')}</h1>
      </div>

      {items.length === 0 ? (
        <div className="wl-empty">
          <div className="wl-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="wl-empty-text">{t('wishlist.empty')}</div>
          <div className="wl-empty-sub">{t('wishlist.emptyDesc')}</div>
          <Link to="/products" className="wl-empty-btn">{t('cart.continueShopping')} →</Link>
        </div>
      ) : (
        <div className="wl-grid">
          {items.map((item) => {
            const catColor = getCategoryColor(item.category);
            return (
              <div className="wl-card" key={item.productId}>
                <div className="wl-card-corner" style={{ borderColor: `transparent ${catColor} transparent transparent` }} />
                <div className="wl-card-cat" style={{ color: catColor }}>{item.category}</div>
                <Link to={`/product/${item.productId}`} className="wl-card-name">{item.name}</Link>
                <div className="wl-card-price" style={{ color: catColor }}>{formatPrice(item.price)}</div>
                <div className="wl-card-actions">
                  <button className="wl-move-btn" onClick={() => handleMoveToCart(item)}>{t('wishlist.moveToCart')}</button>
                  <button className="wl-remove-btn" onClick={() => handleRemove(item)}>{t('wishlist.remove')}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
