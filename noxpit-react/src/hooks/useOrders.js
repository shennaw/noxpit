import { useState, useCallback, useEffect, useRef } from 'react';
import { storage } from '../services/storage';
import { useAuth } from '../context/AuthContext';

const STATUS_FLOW = ['pending', 'paid', 'processing', 'shipped', 'delivered'];

function generateOrderId() {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NXP-${ts}-${rand}`;
}

function useOrders() {
  const { user } = useAuth();
  const prevUserRef = useRef(user);
  const [orders, setOrders] = useState(() => {
    if (user) return storage.getUser(user.id, 'orders') || [];
    return [];
  });

  useEffect(() => {
    const prevUser = prevUserRef.current;
    prevUserRef.current = user;
    if (user && user.id !== prevUser?.id) {
      const saved = storage.getUser(user.id, 'orders') || [];
      setOrders(saved); // eslint-disable-line react-hooks/set-state-in-effect
    } else if (!user && prevUser) {
      setOrders([]);
    }
  }, [user]);

  const save = useCallback((list) => {
    setOrders(list);
    if (user) storage.setUser(user.id, 'orders', list);
  }, [user]);

  const createOrder = useCallback(({ items, address, payment, subtotal, shipping, total }) => {
    const order = {
      id: generateOrderId(),
      items,
      address,
      payment,
      subtotal,
      shipping,
      total,
      status: 'pending',
      statusHistory: [{ status: 'pending', at: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };
    const updated = [order, ...orders];
    save(updated);
    return order;
  }, [orders, save]);

  const getOrder = useCallback((orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  }, [orders]);

  const advanceStatus = useCallback((orderId) => {
    const updated = orders.map((o) => {
      if (o.id !== orderId) return o;
      const currentIdx = STATUS_FLOW.indexOf(o.status);
      if (currentIdx >= STATUS_FLOW.length - 1) return o;
      const nextStatus = STATUS_FLOW[currentIdx + 1];
      return {
        ...o,
        status: nextStatus,
        statusHistory: [...o.statusHistory, { status: nextStatus, at: new Date().toISOString() }],
      };
    });
    save(updated);
  }, [orders, save]);

  return { orders, createOrder, getOrder, advanceStatus };
}

export { useOrders, STATUS_FLOW };
