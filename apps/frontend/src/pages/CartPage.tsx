import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, Wallet, Banknote, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CARD');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const walletBalance = 500; // Mock local wallet in INR
  const deliveryFee = 40;
  const tax = total * 0.05; // 5% GST

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'RUSH50') {
      setDiscount(total * 0.5);
      alert('50% Coupon Applied!');
    } else {
      alert('Invalid Coupon Code');
      setDiscount(0);
    }
  };

  const grandTotal = Math.max(0, total + deliveryFee + tax - discount - (useWallet ? walletBalance : 0));

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      // Create new order in Context
      addOrder({
        id: `ORD-${Math.floor(Math.random() * 100000)}`,
        items: [...items],
        total: grandTotal,
        status: 'Preparing',
        date: new Date().toISOString()
      });
      
      alert(`Order placed successfully via ${paymentMethod}!\nTotal: ₹${grandTotal.toFixed(2)}`);
      clearCart();
      navigate('/orders');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBagIcon className="w-16 h-16 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <button onClick={() => navigate('/home')} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors">
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {items.map(item => (
              <li key={item.id} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">From: {item.restaurantName}</p>
                  <p className="text-orange-600 font-semibold mt-1">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 cursor-pointer"><Minus className="w-4 h-4" /></button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 cursor-pointer"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Coupons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Apply Coupon</h2>
          <div className="flex space-x-4">
            <input 
              type="text" 
              placeholder="Enter coupon code (Try RUSH50)" 
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 uppercase"
            />
            <button onClick={handleApplyCoupon} className="bg-gray-900 text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">Apply</button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'CARD' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-200'}`}>
              <input type="radio" name="payment" value="CARD" className="hidden" checked={paymentMethod === 'CARD'} onChange={() => setPaymentMethod('CARD')} />
              <CreditCard className="w-8 h-8 mb-2" />
              <span className="font-medium">Credit Card</span>
            </label>
            <label className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-200'}`}>
              <input type="radio" name="payment" value="UPI" className="hidden" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
              <Wallet className="w-8 h-8 mb-2" />
              <span className="font-medium">UPI / App</span>
            </label>
            <label className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-orange-200'}`}>
              <input type="radio" name="payment" value="COD" className="hidden" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
              <Banknote className="w-8 h-8 mb-2" />
              <span className="font-medium">Cash on Delivery</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-3 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Coupon Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer" onClick={() => setUseWallet(!useWallet)}>
            <div className="flex items-center">
              <Wallet className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="font-medium text-gray-900">TastyGo Wallet</p>
                <p className="text-xs text-gray-500">Balance: ₹{walletBalance.toFixed(2)}</p>
              </div>
            </div>
            <input type="checkbox" checked={useWallet} readOnly className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500" />
          </div>

          <div className="flex justify-between items-end mb-6">
            <span className="text-gray-900 font-bold">Grand Total</span>
            <span className="text-2xl font-extrabold text-orange-600">₹{grandTotal.toFixed(2)}</span>
          </div>

          <button 
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            {isPlacingOrder ? 'Processing...' : 'Place Order'}
            {!isPlacingOrder && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Minimal missing icon for empty state
function ShoppingBagIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
      <path d="M3 6h18"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

