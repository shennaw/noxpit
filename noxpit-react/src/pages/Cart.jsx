import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, getCategoryColor } from '../data/products';
import './Cart.css';

export default function Cart() {
  const { t } = useLang();
  const { items, subtotal, shipping, total, removeItem, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="cart-root">

      <div className="cart-header">
        <div className="cart-eyebrow">{t('cart.title')}</div>
        <h1 className="cart-title">{t('cart.title')}</h1>
      </div>

      {items.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <div className="cart-empty-text">{t('cart.empty')}</div>
          <div className="cart-empty-sub">{t('cart.emptyDesc')}</div>
          <Link to="/products" className="cart-empty-btn">{t('cart.continueShopping')} →</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => {
              const catColor = getCategoryColor(item.category);
              return (
                <div className="cart-item" key={item.productId}>
                  <div className="cart-item-accent" style={{ background: catColor }} />
                  <div className="cart-item-info">
                    <div className="cart-item-cat" style={{ color: catColor }}>{item.category}</div>
                    <Link to={`/product/${item.productId}`} className="cart-item-name">{item.name}</Link>
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-ctrl">
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.productId, item.qty - 1)}>−</button>
                      <span className="cart-qty-val">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateQuantity(item.productId, item.qty + 1)}>+</button>
                    </div>
                    <div className="cart-item-subtotal">{formatPrice(item.price * item.qty)}</div>
                    <button className="cart-remove-btn" onClick={() => removeItem(item.productId)}>{t('cart.remove')}</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-title">{t('cart.title')}</div>
            <div className="cart-summary-row">
              <span>{t('cart.subtotal')}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>{t('cart.shipping')}</span>
              <span>{shipping === 0 ? t('cart.shippingFree') : formatPrice(shipping)}</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-row cart-summary-total">
              <span>{t('cart.total')}</span>
              <span>{formatPrice(total)}</span>
            </div>
            {isAuthenticated ? (
              <Link to="/checkout" className="cart-checkout-btn">{t('cart.checkout')} →</Link>
            ) : (
              <Link to="/login" state={{ from: '/checkout' }} className="cart-checkout-btn">{t('nav.login')} →</Link>
            )}
            <Link to="/products" className="cart-continue-link">{t('cart.continueShopping')}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
