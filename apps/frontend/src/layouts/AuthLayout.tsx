import { Outlet } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-lg mb-4">
          <Utensils className="text-white w-8 h-8" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          TastyGo
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your favorite meals, delivered fast.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-orange-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

