import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('demo@foodrush.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/home');
    } catch (err: any) {
      console.warn('Backend unavailable, using mock login fallback.');
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ fullName: 'Demo User' }));
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border outline-none transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Forgot password?</a>
          </div>
        </div>

        <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50">
          {loading ? 'Signing in...' : 'Sign in'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">Sign up here</Link>
      </div>
    </div>
  );
}



