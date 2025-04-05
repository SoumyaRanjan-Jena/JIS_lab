'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/law-icon.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold text-gray-800">JIS</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard/view-cases" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              View Cases
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Manage Cases
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              Manage Accounts
            </Link>

            {/* Profile Link */}
            <Link
              href="/profile"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              {user?.profilePic
                ? (
                    <Image
                      src={user.profilePic}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                    />
                  )
                : (
                    <User className="h-8 w-8 text-gray-500" />
                  )
              }
              <span className="text-gray-700 font-medium text-sm">
                {user?.name?.split(' ')[0] || 'Profile'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
