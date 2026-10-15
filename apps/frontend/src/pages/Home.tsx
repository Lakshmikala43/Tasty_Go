import { useNavigate, useSearchParams } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronRight, Utensils, Frown } from 'lucide-react';
import { mockRestaurants } from '../utils/mockData';

const categories = [
  { name: "Pizza", emoji: "🍕" },
  { name: "Burger", emoji: "🍔" },
  { name: "Sushi", emoji: "🍣" },
  { name: "Healthy", emoji: "🥗" },
  { name: "Dessert", emoji: "🍰" },
  { name: "Asian", emoji: "🍜" },
  { name: "Mexican", emoji: "🌮" },
  { name: "Coffee", emoji: "☕" },
  { name: "Indian", emoji: "🍛" },
  { name: "Breakfast", emoji: "🥞" },
  { name: "BBQ", emoji: "🍖" },
  { name: "Sandwich", emoji: "🥪" },
];

export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search')?.toLowerCase() || '';

  const filteredRestaurants = mockRestaurants.filter(r => 
    r.name.toLowerCase().includes(query) || 
    r.cuisine.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-12">
      {/* Banner */}
      {!query && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between overflow-hidden relative">
          <div className="z-10 relative space-y-4 max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Craving something delicious?</h1>
            <p className="text-lg text-orange-100">Get 50% off your first order with code <span className="font-bold bg-white text-orange-600 px-2 py-1 rounded">RUSH50</span></p>
            <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 flex items-center cursor-pointer" onClick={() => navigate('/restaurant/1')}>
              Order Now <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="hidden sm:block absolute right-0 bottom-0 opacity-50 transform translate-x-1/4 translate-y-1/4">
             <Utensils className="w-96 h-96 text-white" />
          </div>
        </div>
      )}

      {/* Categories */}
      {!query && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:border-orange-200 transition-all cursor-pointer" 
                onClick={() => navigate(`/home?search=${c.name.toLowerCase()}`)}
              >
                <span className="text-4xl mb-2">{c.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restaurants */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {query ? `Search results for "${query}"` : 'Popular near you'}
          </h2>
          {!query && <button className="text-orange-600 font-medium hover:text-orange-700 cursor-pointer">See all</button>}
        </div>
        
        {filteredRestaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
             <Frown className="w-16 h-16 mb-4 text-gray-300" />
             <h3 className="text-xl font-bold text-gray-700 mb-2">No items found</h3>
             <p>Try searching for a different food item or category.</p>
             <button onClick={() => navigate('/home')} className="mt-4 text-orange-600 font-medium">Clear search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((r) => (
              <div key={r.id} onClick={() => navigate(`/restaurant/${r.id}`)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer">
                <div className="h-48 overflow-hidden relative">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                    {r.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">{r.name}</h3>
                    <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded">{r.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{r.cuisine}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-orange-500" />
                      {r.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                      Free delivery
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
