'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEmails() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/subscribe');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscribed emails');
        }
        
        const data = await response.json();
        setEmails(data.emails || []);
      } catch (err) {
        console.error('Error fetching emails:', err);
        setError('Failed to load subscribed emails. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmails();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1627] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#ffb44d] via-[#ff7e54] to-[#cf4b6c] text-transparent bg-clip-text">
          Email Subscribers Admin
        </h1>
        
        <div className="bg-[#0e1a2b] border border-[#ff7e54]/30 rounded-xl p-6 shadow-lg">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7e54]"></div>
            </div>
          ) : error ? (
            <div className="text-red-400 text-center p-4">{error}</div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Subscribed Emails</h2>
                <span className="bg-[#ff7e54] text-black px-3 py-1 rounded-full text-sm font-medium">
                  {emails.length} subscribers
                </span>
              </div>
              
              {emails.length === 0 ? (
                <p className="text-center text-white/60 py-8">No subscribers yet.</p>
              ) : (
                <div className="bg-[#081221]/80 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#ff7e54]/20">
                        <th className="px-6 py-3 text-left text-sm font-medium text-[#ff7e54]">#</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-[#ff7e54]">Email Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emails.map((email, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-[#ff7e54]/10 hover:bg-[#ff7e54]/5 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-6 text-center text-sm text-white/50">
                <p>Note: This is a development environment. Emails are stored in memory and will be reset when the server restarts.</p>
                <p className="mt-2">For production, implement proper database storage and authentication.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 