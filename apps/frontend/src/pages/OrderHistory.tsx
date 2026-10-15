import { useState, useEffect } from 'react';
import { Package, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useCart, type Order } from '../context/CartContext';

export default function OrderHistory() {
  const { orders, updateOrderStatus } = useCart();
  const [now, setNow] = useState(Date.now());

  // Simulate order status progression for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
      orders.forEach(order => {
        const orderTime = new Date(order.date).getTime();
        const elapsed = Date.now() - orderTime;
        
        // Progress status automatically over time
        if (order.status === 'Preparing' && elapsed > 15000) {
          updateOrderStatus(order.id, 'Out for Delivery');
        } else if (order.status === 'Out for Delivery' && elapsed > 30000) {
          updateOrderStatus(order.id, 'Delivered');
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [orders, updateOrderStatus]);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No active orders</h2>
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History & Tracking</h1>
      
      {orders.map(order => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 font-medium">Order #{order.id}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">Total: ₹{order.total.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Tracking Status</h3>
              <div className="flex items-center">
                <div className={`flex flex-col items-center ${order.status === 'Preparing' || order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-orange-600' : 'text-gray-300'}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current bg-white z-10"><Clock className="w-4 h-4" /></div>
                  <span className="text-xs font-bold mt-2">Preparing</span>
                </div>
                <div className={`flex-1 h-1 mx-2 rounded ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${order.status === 'Out for Delivery' || order.status === 'Delivered' ? 'text-orange-600' : 'text-gray-300'}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current bg-white z-10"><MapPin className="w-4 h-4" /></div>
                  <span className="text-xs font-bold mt-2">Out for Delivery</span>
                </div>
                <div className={`flex-1 h-1 mx-2 rounded ${order.status === 'Delivered' ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${order.status === 'Delivered' ? 'text-green-500' : 'text-gray-300'}`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current bg-white z-10"><CheckCircle className="w-4 h-4" /></div>
                  <span className="text-xs font-bold mt-2">Delivered</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Items</h3>
              <ul className="space-y-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.quantity}x {item.name} <span className="text-gray-400 text-xs ml-2">({item.restaurantName})</span></span>
                    <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

