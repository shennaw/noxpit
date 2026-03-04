import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import { useLang } from '../context/LangContext';

export default function WishlistButton({ product, size = 18 }) {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { t } = useLang();

  const active = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast(t('wishlist.loginRequired'), 'info');
      return;
    }
    toggleWishlist(product);
    showToast(active ? t('wishlist.removed') : t('wishlist.added'), 'success');
  };

  return (
    <button
      className={`wl-btn ${active ? 'wl-btn-active' : ''}`}
      onClick={handleClick}
      title={active ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
