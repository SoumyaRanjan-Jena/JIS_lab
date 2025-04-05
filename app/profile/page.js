'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileClient from './ProfileClient';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/sign-in');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null; // or a loading indicator

  return <ProfileClient initialUser={user} />;
}
