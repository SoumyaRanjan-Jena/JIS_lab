//app/sign-in/page.js
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import authenticateUser from '@/models/authenticateUser';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userType: 'registrar',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        alert(result.error || "Login failed");
        return;
      }
      window.location.href = '/dashboard';
      alert("Login successful!");
      //router.push('/dashboard/view-cases');
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  }
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userType" className="block text-black text-sm font-bold mb-2">User Type</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="registrar">Registrar</option>
              <option value="judge">Judge</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 bg-black text-white font-medium rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
