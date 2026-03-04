import { useState, useCallback, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';

export function useReviews(productId) {
  const { user } = useAuth();
  const prevProductRef = useRef(productId);
  const [allReviews, setAllReviews] = useState(() => storage.get('reviews') || {});

  useEffect(() => {
    const prevProduct = prevProductRef.current;
    prevProductRef.current = productId;
    if (productId !== prevProduct) {
      const saved = storage.get('reviews') || {};
      setAllReviews(saved); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [productId]);

  const save = useCallback((updated) => {
    setAllReviews(updated);
    storage.set('reviews', updated);
  }, []);

  const getProductReviews = useCallback(() => {
    return allReviews[productId] || [];
  }, [allReviews, productId]);

  const addReview = useCallback(({ rating, text }) => {
    if (!user) return;
    const reviews = { ...allReviews };
    if (!reviews[productId]) reviews[productId] = [];
    reviews[productId].push({
      id: Date.now().toString(36),
      userId: user.id,
      userName: user.name,
      rating,
      text,
      createdAt: new Date().toISOString(),
    });
    save(reviews);
  }, [allReviews, productId, user, save]);

  const averageRating = useCallback(() => {
    const reviews = getProductReviews();
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [getProductReviews]);

  const hasUserReviewed = useCallback(() => {
    if (!user) return false;
    return getProductReviews().some((r) => r.userId === user.id);
  }, [user, getProductReviews]);

  return { getProductReviews, addReview, averageRating, hasUserReviewed };
}
