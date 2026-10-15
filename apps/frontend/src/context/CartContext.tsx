import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered';
  date: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === newItem.id);
      if (exists) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, orders, addOrder, updateOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
