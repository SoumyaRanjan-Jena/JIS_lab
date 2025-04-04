'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import authenticateUser from '@/models/authenticateUser';


export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    userType: 'judge',
    email: '',
    password: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const ret = await authenticateUser(formData);
    if(ret === -1) {
      alert("Invalid credentials! Please try again.");
      setFormData({
        userType: 'judge',
        email: '',
        password: ''
      });
    }
    else {
      router.push('/dashboard/view-cases');
    }
  };

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
            <label className="block text-black text-sm font-bold mb-2" htmlFor="userType">
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="judge">Judge</option>
              <option value="lawyer">Lawyer</option>
              <option value="registrar">Registrar</option>
            </select>
          </div>


          <div className="mb-4">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
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
            <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
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
};
