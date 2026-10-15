import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Info, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockRestaurants, mockMenus } from '../utils/mockData';

export default function RestaurantDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const restaurant = mockRestaurants.find(r => r.id === id) || mockRestaurants[0];
  const menuItems = mockMenus[id || '1'] || mockMenus['1'];

  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAdd = (item: any) => {
    addToCart({ ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Restaurant Header */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
        <div className="h-64 bg-gray-300 relative">
          <img src={restaurant.image} className="w-full h-full object-cover" alt="Restaurant cover" />
        </div>
        <div className="p-8 relative">
          <h1 className="text-3xl font-extrabold text-gray-900">{restaurant.name}</h1>
          <p className="text-gray-500 mt-2 text-lg">{restaurant.cuisine}</p>
          <div className="flex items-center space-x-6 mt-4 text-sm font-medium text-gray-700">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" /> {restaurant.rating} (500+ ratings)
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-1" /> {restaurant.time}
            </div>
            <div className="flex items-center">
              <Info className="w-5 h-5 text-gray-400 mr-1" /> Minimum order {restaurant.price}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center group hover:shadow-md hover:border-orange-200 transition-all">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-orange-600 font-semibold mt-1">₹{item.price}</p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.description}</p>
              </div>
              <div className="relative flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl shadow-sm" />
                <button 
                  onClick={() => handleAdd(item)}
                  className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 font-bold border shadow-md px-4 py-1.5 rounded-full transition-all flex items-center justify-center cursor-pointer min-w-[80px]
                    ${addedItem === item.id 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'bg-white text-orange-600 border-gray-200 hover:bg-orange-50'}`}
                >
                  {addedItem === item.id ? (
                    <><Check className="w-4 h-4 mr-1" /> Added</>
                  ) : (
                    <><Plus className="w-4 h-4 mr-1" /> Add</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

