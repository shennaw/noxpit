import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useCart } from '../context/CartContext';
import { useAddresses } from '../hooks/useAddresses';
import { useOrders } from '../hooks/useOrders';
import AddressForm from '../components/AddressForm';
import { formatPrice } from '../data/products';
import './Checkout.css';

const STEPS = ['co.step1', 'co.step2', 'co.step3', 'co.step4'];
const PAYMENT_METHODS = [
  { id: 'bank', key: 'co.bankTransfer' },
  { id: 'cod', key: 'co.cod' },
  { id: 'ewallet', key: 'co.ewallet' },
];

export default function Checkout() {
  const { t } = useLang();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addresses, addAddress, getDefault } = useAddresses();
  const { createOrder } = useOrders();

  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [order, setOrder] = useState(null);
  const prevAddressesRef = useRef(addresses);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const prevAddresses = prevAddressesRef.current;
    prevAddressesRef.current = addresses;
    if (!selectedAddress && addresses.length > 0 && addresses !== prevAddresses) {
      const def = getDefault();
      if (def) setSelectedAddress(def.id); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [addresses, selectedAddress, getDefault]);

  if (items.length === 0 && !order) {
    return (
      <div className="co-root">
        <div className="co-empty">
          <div className="co-empty-text">{t('co.cartEmpty')}</div>
          <Link to="/products" className="co-empty-btn">{t('cart.continueShopping')} →</Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const addr = addresses.find((a) => a.id === selectedAddress);
    const newOrder = createOrder({
      items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, qty: i.qty })),
      address: addr,
      payment: paymentMethod,
      subtotal, shipping, total,
    });
    setOrder(newOrder);
    clearCart();
    setStep(3);
  };

  const handleAddressSave = (data) => {
    const addr = addAddress(data);
    setSelectedAddress(addr.id);
    setShowAddressForm(false);
  };

  return (
    <div className="co-root">
      <div className="co-header">
        <div className="co-eyebrow">{t('co.title')}</div>
        <h1 className="co-title">{t('co.title')}</h1>
      </div>

      {/* Progress */}
      <div className="co-progress">
        {STEPS.map((s, i) => (
          <div key={s} className={`co-step ${i === step ? 'co-step-active' : ''} ${i < step ? 'co-step-done' : ''}`}>
            <span className="co-step-num">{i + 1}</span>
            <span className="co-step-label">{t(s)}</span>
          </div>
        ))}
      </div>

      <div className="co-body">
        {/* Step 1: Cart Review */}
        {step === 0 && (
          <div className="co-section">
            <div className="co-section-title">{t('co.step1')}</div>
            <div className="co-items">
              {items.map((item) => (
                <div className="co-item" key={item.productId}>
                  <div className="co-item-info">
                    <div className="co-item-name">{item.name}</div>
                    <div className="co-item-qty">{item.qty}x {formatPrice(item.price)}</div>
                  </div>
                  <div className="co-item-total">{formatPrice(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
            <div className="co-totals">
              <div className="co-total-row"><span>{t('cart.subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
              <div className="co-total-row"><span>{t('cart.shipping')}</span><span>{shipping === 0 ? t('cart.shippingFree') : formatPrice(shipping)}</span></div>
              <div className="co-total-row co-total-final"><span>{t('cart.total')}</span><span>{formatPrice(total)}</span></div>
            </div>
            <button className="co-next-btn" onClick={() => setStep(1)}>{t('co.next')} →</button>
          </div>
        )}

        {/* Step 2: Shipping */}
        {step === 1 && (
          <div className="co-section">
            <div className="co-section-title">{t('co.selectAddress')}</div>
            {addresses.length > 0 && (
              <div className="co-addr-list">
                {addresses.map((addr) => (
                  <label key={addr.id} className={`co-addr-card ${selectedAddress === addr.id ? 'co-addr-selected' : ''}`}>
                    <input type="radio" name="address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} />
                    <div>
                      <div className="co-addr-label">{addr.label} {addr.isDefault && `(${t('addr.default')})`}</div>
                      <div className="co-addr-detail">{addr.recipient} — {addr.phone}</div>
                      <div className="co-addr-detail">{addr.street}, {addr.city}, {addr.province} {addr.postalCode}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            {showAddressForm ? (
              <div className="co-addr-form-wrap">
                <AddressForm onSave={handleAddressSave} onCancel={() => setShowAddressForm(false)} />
              </div>
            ) : (
              <button className="co-add-addr-btn" onClick={() => setShowAddressForm(true)}>+ {t('co.addNewAddress')}</button>
            )}
            <div className="co-nav-btns">
              <button className="co-prev-btn" onClick={() => setStep(0)}>← {t('co.prev')}</button>
              <button className="co-next-btn" onClick={() => setStep(2)} disabled={!selectedAddress}>{t('co.next')} →</button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 2 && (
          <div className="co-section">
            <div className="co-section-title">{t('co.paymentMethod')}</div>
            <div className="co-payment-list">
              {PAYMENT_METHODS.map((pm) => (
                <label key={pm.id} className={`co-payment-card ${paymentMethod === pm.id ? 'co-payment-selected' : ''}`}>
                  <input type="radio" name="payment" checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} />
                  <span>{t(pm.key)}</span>
                </label>
              ))}
            </div>
            <div className="co-totals">
              <div className="co-total-row co-total-final"><span>{t('cart.total')}</span><span>{formatPrice(total)}</span></div>
            </div>
            <div className="co-nav-btns">
              <button className="co-prev-btn" onClick={() => setStep(1)}>← {t('co.prev')}</button>
              <button className="co-next-btn" onClick={handlePlaceOrder}>{t('co.placeOrder')} →</button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 3 && order && (
          <div className="co-section co-confirmation">
            <div className="co-confirm-icon">✓</div>
            <div className="co-confirm-title">{t('co.orderSuccess')}</div>
            <div className="co-confirm-order-id">{t('co.orderNumber')}: {order.id}</div>
            <div className="co-confirm-actions">
              <Link to={`/orders/${order.id}`} className="co-confirm-btn">{t('co.viewOrders')}</Link>
              <Link to="/" className="co-confirm-link">{t('co.backToHome')}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
