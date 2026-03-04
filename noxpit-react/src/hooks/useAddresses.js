import { useState, useCallback, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function useAddresses() {
  const { user } = useAuth();
  const prevUserRef = useRef(user);
  const [addresses, setAddresses] = useState(() => {
    if (user) return storage.getUser(user.id, 'addresses') || [];
    return [];
  });

  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = user;
    if (user && user.id !== prevUser?.id) {
      const saved = storage.getUser(user.id, 'addresses') || [];
      setAddresses(saved); // eslint-disable-line react-hooks/set-state-in-effect
    } else if (!user && prevUser) {
      setAddresses([]);
    }
  }, [user]);

  const save = useCallback((list) => {
    setAddresses(list);
    if (user) storage.setUser(user.id, 'addresses', list);
  }, [user]);

  const addAddress = useCallback((addr) => {
    const newAddr = { ...addr, id: generateId() };
    const list = [...addresses];
    if (list.length === 0) newAddr.isDefault = true;
    list.push(newAddr);
    save(list);
    return newAddr;
  }, [addresses, save]);

  const updateAddress = useCallback((id, updates) => {
    save(addresses.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }, [addresses, save]);

  const deleteAddress = useCallback((id) => {
    const list = addresses.filter((a) => a.id !== id);
    if (list.length > 0 && !list.some((a) => a.isDefault)) {
      list[0].isDefault = true;
    }
    save(list);
  }, [addresses, save]);

  const setDefault = useCallback((id) => {
    save(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  }, [addresses, save]);

  const getDefault = useCallback(() => {
    return addresses.find((a) => a.isDefault) || addresses[0] || null;
  }, [addresses]);

  return { addresses, addAddress, updateAddress, deleteAddress, setDefault, getDefault };
}
