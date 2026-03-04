import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';

export default function ReviewForm({ onSubmit, hasReviewed }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLang();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hover, setHover] = useState(0);

  if (!isAuthenticated) {
    return (
      <div className="rv-form-login">
        <Link to="/login" className="rv-form-login-link">{t('review.loginToReview')}</Link>
      </div>
    );
  }

  if (hasReviewed) {
    return (
      <div className="rv-form-reviewed">{t('review.alreadyReviewed')}</div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ rating, text: text.trim() });
    setText('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="rv-form">
      <div className="rv-form-title">{t('review.writeReview')}</div>
      <div className="rv-form-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            className={`rv-form-star ${i <= (hover || rating) ? 'active' : ''}`}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="rv-form-textarea"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t('review.yourReview')}
        required
      />
      <button type="submit" className="rv-form-submit">{t('review.submit')} →</button>
    </form>
  );
}
