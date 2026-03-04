import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useOrders } from '../hooks/useOrders';
import { formatPrice } from '../data/products';
import './Orders.css';

const STATUS_COLORS = {
  pending: '#f5c800',
  paid: '#0091d0',
  processing: '#7869af',
  shipped: '#f287b7',
  delivered: '#48c05c',
};

export default function Orders() {
  const { t } = useLang();
  const { orders } = useOrders();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="ord-root">
      <div className="ord-header">
        <div className="ord-eyebrow">{t('ord.title')}</div>
        <h1 className="ord-title">{t('ord.title')}</h1>
      </div>

      {orders.length === 0 ? (
        <div className="ord-empty">
          <div className="ord-empty-text">{t('ord.empty')}</div>
          <div className="ord-empty-sub">{t('ord.emptyDesc')}</div>
          <Link to="/products" className="ord-empty-btn">{t('cart.continueShopping')} →</Link>
        </div>
      ) : (
        <div className="ord-list">
          {orders.map((order) => {
            const itemCount = order.items.reduce((s, i) => s + i.qty, 0);
            const color = STATUS_COLORS[order.status] || '#0091d0';
            return (
              <Link to={`/orders/${order.id}`} className="ord-card" key={order.id}>
                <div className="ord-card-accent" style={{ background: color }} />
                <div className="ord-card-main">
                  <div className="ord-card-id">{order.id}</div>
                  <div className="ord-card-date">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="ord-card-items">{itemCount} {t('ord.items')}</div>
                </div>
                <div className="ord-card-right">
                  <span className="ord-card-status" style={{ color, borderColor: `${color}40` }}>
                    {t(`status.${order.status}`)}
                  </span>
                  <div className="ord-card-total">{formatPrice(order.total)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
