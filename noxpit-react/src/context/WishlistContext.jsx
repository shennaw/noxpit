import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { useAuth } from './AuthContext';

const WishlistCtx = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const prevUserRef = useRef(user);
  const [items, setItems] = useState(() => {
    if (user) return storage.getUser(user.id, 'wishlist') || [];
    return [];
  });

  // Load wishlist when user changes
  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = user;
    if (user && user.id !== prevUser?.id) {
      const saved = storage.getUser(user.id, 'wishlist') || [];
      setItems(saved); // eslint-disable-line react-hooks/set-state-in-effect
    } else if (!user && prevUser) {
      setItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      storage.setUser(user.id, 'wishlist', items);
    }
  }, [items, user]);

  const isInWishlist = useCallback(
    (productId) => items.some((i) => i.productId === productId),
    [items]
  );

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.productId === product.id);
      if (exists) {
        return prev.filter((i) => i.productId !== product.id);
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        shortName: product.shortName,
        nameHighlight: product.nameHighlight,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        color: product.color,
        addedAt: new Date().toISOString(),
      }];
    });
  }, []);

  return (
    <WishlistCtx.Provider value={{ items, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistCtx);
