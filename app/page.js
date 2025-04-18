'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const desc_text =
    "Empowering judicial efficiency, the secure platform enables users to access and update case information in real time. Experience a modern, user-friendly system that supports effective decision-making.";

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/profile', { credentials: 'same-origin' });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-100">
      <div className="max-w-mx w-full px-6 py-8">
        <img src="law-icon.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-center text-800 mb-4">
          Judiciary Information System
        </h1>

        <p className="text-center text-600 mb-8 max-w-sm mx-auto">{desc_text}</p>

        {/* Only show buttons when NOT logged in */}
        {!user && (
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={() => router.push('/sign-in')}
              className="px-6 py-2 bg-black text-white font-medium rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Sign In
            </button>

            <button
              onClick={() => router.push('/sign-up')}
              className="px-6 py-2 bg-white text-black font-medium rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
