import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import { useLang } from '../context/LangContext';

export default function AddToCartButton({ product, qty = 1, className = '', full = false }) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { t } = useLang();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, qty);
    showToast(t('cart.addedToCart'), 'success');
  };

  return (
    <button className={`atc-btn ${full ? 'atc-btn-full' : ''} ${className}`} onClick={handleClick}>
      {full ? (
        <>{t('pd.addToCart')} →</>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      )}
    </button>
  );
}
