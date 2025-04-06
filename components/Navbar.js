'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
                <img src="/law-icon.png" alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-gray-800">JIS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard/view-cases"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              View Cases
            </Link>
            <Link
              href="/dashboard/manage-cases"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Manage Cases
            </Link>
            <Link
              href="/dashboard/edit-cases"
              className="text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              Manage Accounts
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;