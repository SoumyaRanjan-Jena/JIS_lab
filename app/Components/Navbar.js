'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to fetch profile:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return null;

  const displayName = user?.name?.split(' ')[0] || 'Guest';
  const profileLink = user ? '/profile' : '/sign-in';
  const logoLink = user ? '/dashboard' : '/';

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href={logoLink} className="flex items-center space-x-2">
              <Image src="/law-icon.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold text-gray-800">JIS</span>
            </Link>
          </div>

          {/* Right section: nav links + profile */}
          <div className="flex items-center space-x-6">
            {/* Nav Links */}
            {user && (
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/dashboard/view-cases"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  View Cases
                </Link>

                {user.userType === 'registrar' && (
                  <>
                    <Link
                      href="/dashboard/manage-cases"
                      className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Manage Cases
                    </Link>
                    <Link
                      href="/dashboard/manage-accounts"
                      className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Manage Accounts
                    </Link>
                  </>
                )}

                {user.userType === 'lawyer' && (
                  <Link
                    href="/dashboard/billing"
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Billing
                  </Link>
                )}
              </div>
            )}

            {/* Profile Link */}
            <Link
              href={profileLink}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              {user?.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-gray-500" />
              )}
              <span className="text-gray-700 font-medium text-sm">
                {displayName}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
