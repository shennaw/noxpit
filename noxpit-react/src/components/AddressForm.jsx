import { useState } from 'react';
import { useLang } from '../context/LangContext';

const EMPTY = { label: '', recipient: '', phone: '', street: '', city: '', province: '', postalCode: '' };

export default function AddressForm({ initial = null, onSave, onCancel }) {
  const { t } = useLang();
  const [form, setForm] = useState(initial || EMPTY);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const fields = [
    { key: 'label', label: t('addr.label'), type: 'text', placeholder: 'Rumah, Kantor...' },
    { key: 'recipient', label: t('addr.recipient'), type: 'text' },
    { key: 'phone', label: t('addr.phone'), type: 'tel' },
    { key: 'street', label: t('addr.street'), type: 'text' },
    { key: 'city', label: t('addr.city'), type: 'text' },
    { key: 'province', label: t('addr.province'), type: 'text' },
    { key: 'postalCode', label: t('addr.postalCode'), type: 'text' },
  ];

  return (
    <form onSubmit={handleSubmit} className="addr-form">
      {fields.map((f) => (
        <div className="addr-form-field" key={f.key}>
          <label className="addr-form-label">{f.label}</label>
          <input
            type={f.type}
            className="addr-form-input"
            value={form[f.key]}
            onChange={(e) => update(f.key, e.target.value)}
            placeholder={f.placeholder || ''}
            required
          />
        </div>
      ))}
      <div className="addr-form-actions">
        <button type="submit" className="addr-form-save">{t('addr.save')}</button>
        {onCancel && <button type="button" className="addr-form-cancel" onClick={onCancel}>{t('addr.cancel')}</button>}
      </div>
    </form>
  );
}
