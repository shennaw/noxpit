import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { useAddresses } from '../hooks/useAddresses';
import AddressForm from '../components/AddressForm';
import './Addresses.css';

export default function Addresses() {
  const { t } = useLang();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSave = (data) => {
    if (editId) {
      updateAddress(editId, data);
    } else {
      addAddress(data);
    }
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (addr) => {
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
  };

  const editingAddr = editId ? addresses.find((a) => a.id === editId) : null;

  return (
    <div className="addr-root">
      <div className="addr-header">
        <div>
          <div className="addr-eyebrow">{t('addr.title')}</div>
          <h1 className="addr-title">{t('addr.title')}</h1>
        </div>
        {!showForm && (
          <button className="addr-add-btn" onClick={() => setShowForm(true)}>
            + {t('addr.add')}
          </button>
        )}
      </div>

      {showForm && (
        <div className="addr-form-wrap">
          <AddressForm
            initial={editingAddr}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="addr-empty">
          <div className="addr-empty-text">{t('addr.empty')}</div>
          <button className="addr-empty-btn" onClick={() => setShowForm(true)}>+ {t('addr.add')}</button>
        </div>
      ) : (
        <div className="addr-list">
          {addresses.map((addr) => (
            <div className={`addr-card ${addr.isDefault ? 'addr-card-default' : ''}`} key={addr.id}>
              {addr.isDefault && <span className="addr-default-badge">{t('addr.default')}</span>}
              <div className="addr-card-label">{addr.label}</div>
              <div className="addr-card-recipient">{addr.recipient}</div>
              <div className="addr-card-detail">{addr.street}</div>
              <div className="addr-card-detail">{addr.city}, {addr.province} {addr.postalCode}</div>
              <div className="addr-card-detail">{addr.phone}</div>
              <div className="addr-card-actions">
                <button onClick={() => handleEdit(addr)}>{t('addr.edit')}</button>
                <button onClick={() => deleteAddress(addr.id)}>{t('addr.delete')}</button>
                {!addr.isDefault && <button onClick={() => setDefault(addr.id)}>{t('addr.setDefault')}</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
