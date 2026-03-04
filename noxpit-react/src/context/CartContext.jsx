import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { useAuth } from './AuthContext';

const CartCtx = createContext(null);

const SHIPPING_THRESHOLD = 300000;
const SHIPPING_COST = 15000;

function cartKey(userId) {
  return userId ? `cart-${userId}` : 'cart-guest';
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const prevUserRef = useRef(user);
  const [items, setItems] = useState(() => {
    const key = cartKey(user?.id);
    return storage.get(key) || [];
  });

  // Sync cart to localStorage whenever items or user changes
  useEffect(() => {
    storage.set(cartKey(user?.id), items);
  }, [items, user]);

  // Merge guest cart into user cart on login (only when user changes)
  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = user;

    // Only run merge when transitioning from no user to having a user
    if (user && !prevUser) {
      const guestItems = storage.get('cart-guest') || [];
      const userItems = storage.getUser(user.id, 'cart') || storage.get(cartKey(user.id)) || [];

      if (guestItems.length > 0) {
        const merged = [...userItems];
        guestItems.forEach((gi) => {
          const existing = merged.find((i) => i.productId === gi.productId);
          if (existing) {
            existing.qty += gi.qty;
          } else {
            merged.push(gi);
          }
        });
        storage.remove('cart-guest');
        // Use functional update to batch with React
        setItems(merged); // eslint-disable-line react-hooks/set-state-in-effect
      } else if (userItems.length > 0) {
        setItems(userItems);
      }
    }
  }, [user]);

  const addItem = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + qty } : i
        );
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
        qty,
      }];
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <CartCtx.Provider value={{ items, itemCount, subtotal, shipping, total, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartCtx);
