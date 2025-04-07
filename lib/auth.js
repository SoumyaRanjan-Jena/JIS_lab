// lib/auth.js or lib/auth.ts
import { cookies } from 'next/headers';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';

export async function getUserFromSession() {
  const cookieStore = cookies();
  const email = cookieStore.get('email')?.value;

  if (!email) return null;

  await dbConnect();
  const user = await User.findOne({ email }).lean();

  if (!user) return null;

  return {
    _id: user._id.toString(),
    name: user.name,
    phone: user.phone,
    userType: user.userType,
    profilePic: user.profilePic || '',
  };
}
