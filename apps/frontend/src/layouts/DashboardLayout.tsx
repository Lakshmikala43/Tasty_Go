import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Utensils, Search, ShoppingBag, User, LogOut, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/home?search=${searchQuery}`);
    }
  };

  const cartItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/home')}>
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-md">
                <Utensils className="text-white w-5 h-5" />
              </div>
              <span className="ml-3 text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">TastyGo</span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6 flex-1 justify-end">
              <div className="relative text-gray-400 focus-within:text-orange-600 w-full max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search restaurants or cuisines (Press Enter)..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 w-full transition-all" 
                />
              </div>
              
              <button onClick={() => navigate('/orders')} className="text-gray-500 hover:text-orange-600 transition-colors flex items-center cursor-pointer ml-2" title="Orders">
                <FileText className="w-5 h-5" />
                <span className="ml-1 text-sm font-medium hidden sm:block">Orders</span>
              </button>

              <button onClick={() => navigate('/cart')} className="text-gray-500 hover:text-orange-600 transition-colors relative cursor-pointer ml-2">
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-2 text-gray-700 hidden sm:flex border-l pl-4 ml-4">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">{user.fullName || 'Demo User'}</span>
              </div>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

