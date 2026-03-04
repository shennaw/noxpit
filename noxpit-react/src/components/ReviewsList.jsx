import { useLang } from '../context/LangContext';

function StarRating({ rating }) {
  return (
    <span className="rv-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'rv-star-filled' : 'rv-star-empty'}>★</span>
      ))}
    </span>
  );
}

function RatingBar({ rating, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="rv-bar-row">
      <span className="rv-bar-label">{rating}★</span>
      <div className="rv-bar-track">
        <div className="rv-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="rv-bar-count">{count}</span>
    </div>
  );
}

export default function ReviewsList({ reviews, averageRating }) {
  const { t } = useLang();

  const dist = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: reviews.filter((rv) => rv.rating === r).length,
  }));

  return (
    <div className="rv-list">
      {reviews.length > 0 && (
        <div className="rv-summary">
          <div className="rv-avg">
            <div className="rv-avg-num">{averageRating.toFixed(1)}</div>
            <StarRating rating={Math.round(averageRating)} />
            <div className="rv-avg-count">{reviews.length} {t('review.reviews')}</div>
          </div>
          <div className="rv-dist">
            {dist.map((d) => (
              <RatingBar key={d.rating} {...d} total={reviews.length} />
            ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <div className="rv-empty">{t('review.noReviews')}</div>
      )}

      <div className="rv-items">
        {reviews.map((rv) => (
          <div className="rv-item" key={rv.id}>
            <div className="rv-item-header">
              <div className="rv-item-avatar">{rv.userName?.charAt(0)?.toUpperCase()}</div>
              <div>
                <div className="rv-item-name">{rv.userName}</div>
                <div className="rv-item-date">{new Date(rv.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <StarRating rating={rv.rating} />
            </div>
            <div className="rv-item-text">{rv.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
