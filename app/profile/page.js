// app/profile/page.js
import { cookies }           from 'next/headers';
import { redirect }          from 'next/navigation';
import dbConnect             from '@/utils/db';
import User                  from '@/models/userModel';
import ProfileClient         from './ProfileClient';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const email    = cookieStore.get('userEmail')?.value;
  const userType = cookieStore.get('userType')?.value;
  if (!email || !userType) redirect('/sign-in');

  await dbConnect();
  const user = await User.findOne({ email, userType }).select('-password').lean();
  const data = JSON.parse(JSON.stringify(user))
  if (!data) redirect('/sign-in');

  return <ProfileClient initialUser={data} />;
}
