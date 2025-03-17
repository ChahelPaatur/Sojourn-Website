'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define subscriber interface
interface Subscriber {
  email: string;
  timestamp: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Login handling
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Check credentials
    if (username === 'AdminHCV' && password === 'Harshishell') {
      setIsLoggedIn(true);
      // Store login state in session storage to persist across page refreshes
      sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      fetchSubscribers();
    } else {
      setIsLoading(false);
    }
  }, []);

  async function fetchSubscribers() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/subscribe');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscriber data');
      }
      
      const data = await response.json();
      
      // Check if we have the full subscriber objects
      if (data.subscribers && Array.isArray(data.subscribers)) {
        setSubscribers(data.subscribers);
      } else if (data.emails && Array.isArray(data.emails)) {
        // Handle legacy format (emails only)
        setSubscribers(data.emails.map((email: string) => ({
          email,
          timestamp: new Date().toISOString(),
          source: 'unknown',
          status: 'active' as const
        })));
      } else {
        setSubscribers([]);
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError('Failed to load subscriber data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 pt-32">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text mb-2">
              SoJourn Admin
            </h1>
            <p className="text-gray-400">Sign in to manage subscribers</p>
          </div>
          
          <div className="bg-gray-900/70 backdrop-blur-xl rounded-lg p-8 shadow-xl border border-gray-800">
            {loginError && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                <p>{loginError}</p>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff7e54] focus:border-transparent transition-all text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#ff7e54] focus:border-transparent transition-all text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text">
            Email Subscribers
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="bg-gray-900 px-3 py-1 rounded-md text-sm">
              <span className="text-gray-400">Total:</span> <span className="font-medium text-white">{subscribers.length}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">Subscriber List</h2>
            <button 
              onClick={() => fetchSubscribers()} 
              className="px-3 py-1 bg-[#ff7e54] text-white rounded-md text-sm hover:bg-[#e06c48] transition-colors"
            >
              Refresh
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ff7e54]"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-400 text-center">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              {subscribers.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <p>No subscribers yet</p>
                  <p className="text-sm mt-1">Subscribers will appear here when they sign up</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-gray-800/60">
                      <th className="px-4 py-2 text-xs font-medium text-gray-300">#</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-300">Email Address</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-300">Date</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="px-4 py-2 text-xs text-gray-400">{index + 1}</td>
                        <td className="px-4 py-2 text-sm font-medium text-white">{subscriber.email}</td>
                        <td className="px-4 py-2 text-xs text-gray-400">
                          {formatDate(subscriber.timestamp)}
                        </td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            subscriber.status === 'active' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-red-900/30 text-red-400'
                          }`}>
                            {subscriber.status === 'active' ? 'Active' : 'Unsubscribed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          <div className="p-3 border-t border-gray-800 text-xs text-gray-500">
            <p>Note: For production use, implement a database solution instead of in-memory storage.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 