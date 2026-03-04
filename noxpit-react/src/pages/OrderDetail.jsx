import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useOrders, STATUS_FLOW } from '../hooks/useOrders';
import { formatPrice } from '../data/products';
import './OrderDetail.css';

const STATUS_COLORS = {
  pending: '#f5c800',
  paid: '#0091d0',
  processing: '#7869af',
  shipped: '#f287b7',
  delivered: '#48c05c',
};

export default function OrderDetail() {
  const { orderId } = useParams();
  const { t } = useLang();
  const { getOrder, advanceStatus } = useOrders();
  const order = getOrder(orderId);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!order) {
    return (
      <div className="od-root">
        <div className="od-empty">Order not found</div>
      </div>
    );
  }

  const currentIdx = STATUS_FLOW.indexOf(order.status);
  const canAdvance = currentIdx < STATUS_FLOW.length - 1;

  return (
    <div className="od-root">
      <div className="od-header">
        <div className="od-eyebrow">{t('ord.detail')}</div>
        <h1 className="od-title">{order.id}</h1>
        <div className="od-date">
          {new Date(order.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Status Timeline */}
      <div className="od-timeline">
        {STATUS_FLOW.map((status, i) => {
          const reached = i <= currentIdx;
          const color = reached ? (STATUS_COLORS[status] || '#0091d0') : 'rgba(var(--fg-rgb), 0.1)';
          const entry = order.statusHistory.find((h) => h.status === status);
          return (
            <div key={status} className={`od-tl-step ${reached ? 'od-tl-reached' : ''}`}>
              <div className="od-tl-dot" style={{ borderColor: color, background: reached ? color : 'transparent' }} />
              {i < STATUS_FLOW.length - 1 && <div className="od-tl-line" style={{ background: i < currentIdx ? STATUS_COLORS[STATUS_FLOW[i + 1]] || '#0091d0' : 'rgba(var(--fg-rgb), 0.06)' }} />}
              <div className="od-tl-label">{t(`status.${status}`)}</div>
              {entry && <div className="od-tl-time">{new Date(entry.at).toLocaleString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>}
            </div>
          );
        })}
      </div>

      {canAdvance && (
        <div className="od-simulate">
          <button className="od-simulate-btn" onClick={() => advanceStatus(order.id)}>
            {t('ord.simulateNext')} →
          </button>
        </div>
      )}

      {/* Items */}
      <div className="od-section">
        <div className="od-section-title">{t('ord.items')}</div>
        <div className="od-items">
          {order.items.map((item) => (
            <div className="od-item" key={item.productId}>
              <div>
                <div className="od-item-name">{item.name}</div>
                <div className="od-item-qty">{item.qty}x {formatPrice(item.price)}</div>
              </div>
              <div className="od-item-total">{formatPrice(item.price * item.qty)}</div>
            </div>
          ))}
        </div>
        <div className="od-totals">
          <div className="od-total-row"><span>{t('cart.subtotal')}</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="od-total-row"><span>{t('cart.shipping')}</span><span>{order.shipping === 0 ? t('cart.shippingFree') : formatPrice(order.shipping)}</span></div>
          <div className="od-total-row od-total-final"><span>{t('cart.total')}</span><span>{formatPrice(order.total)}</span></div>
        </div>
      </div>

      {/* Address */}
      {order.address && (
        <div className="od-section">
          <div className="od-section-title">{t('addr.title')}</div>
          <div className="od-addr">
            <div className="od-addr-name">{order.address.recipient}</div>
            <div className="od-addr-detail">{order.address.street}</div>
            <div className="od-addr-detail">{order.address.city}, {order.address.province} {order.address.postalCode}</div>
            <div className="od-addr-detail">{order.address.phone}</div>
          </div>
        </div>
      )}

      {/* Payment */}
      <div className="od-section">
        <div className="od-section-title">{t('co.paymentMethod')}</div>
        <div className="od-payment">{t(`co.${order.payment === 'bank' ? 'bankTransfer' : order.payment === 'cod' ? 'cod' : 'ewallet'}`)}</div>
      </div>
    </div>
  );
}
