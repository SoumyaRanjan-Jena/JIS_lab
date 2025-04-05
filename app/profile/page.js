// app/profile/page.jsx
import ProfileClient from './ProfileClient';
import { getUserFromSession } from '@/lib/auth'; // You'll implement this
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await getUserFromSession(); // your backend session helper
  console.log(user);
  if (!user) {
    redirect('/sign-in'); 
  }

  return <ProfileClient initialUser={user} />;
}
