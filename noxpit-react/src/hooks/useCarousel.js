import { useState, useRef, useCallback, useEffect } from 'react';

const SLIDE_COUNT = 3;
const AUTO_INTERVAL = 5000;
export const ACCENT_COLORS = ['#0091d0', '#f287b7', '#7869af'];

export function useCarousel() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const autoTimerRef = useRef(null);
  const progressRafRef = useRef(null);
  const progressStartRef = useRef(null);

  const animateProgress = useCallback((timestamp) => {
    if (!progressStartRef.current) progressStartRef.current = timestamp;
    const elapsed = timestamp - progressStartRef.current;
    const pct = Math.min((elapsed / AUTO_INTERVAL) * 100, 100);
    if (progressRef.current) progressRef.current.style.width = pct + '%';
    if (pct < 100) {
      progressRafRef.current = requestAnimationFrame(animateProgress);
    }
  }, []);

  const resetAuto = useCallback((nextIndex) => {
    clearTimeout(autoTimerRef.current);
    cancelAnimationFrame(progressRafRef.current);
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
    }
    progressStartRef.current = null;
    if (progressRef.current) progressRef.current.getBoundingClientRect();
    if (progressRef.current) progressRef.current.style.transition = '';
    progressRafRef.current = requestAnimationFrame(animateProgress);
    autoTimerRef.current = setTimeout(() => {
      setCurrent(c => (c + 1) % SLIDE_COUNT);
    }, AUTO_INTERVAL);
  }, [animateProgress]);

  const goTo = useCallback((index) => {
    const next = ((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    setCurrent(next);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * (100 / SLIDE_COUNT)}%)`;
    }
    if (progressRef.current) {
      progressRef.current.style.background = ACCENT_COLORS[current];
    }
    resetAuto(current);
  }, [current, resetAuto]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    };
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchend', onTouchEnd);
    return () => {
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [current, goTo]);

  useEffect(() => {
    return () => {
      clearTimeout(autoTimerRef.current);
      cancelAnimationFrame(progressRafRef.current);
    };
  }, []);

  return { current, goTo, trackRef, progressRef, SLIDE_COUNT };
}
