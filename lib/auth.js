// lib/auth.js
import { cookies } from 'next/headers';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';

export async function getUserFromSession() {
  const cookieStore = await cookies(); 
  const email = cookieStore.get('userEmail')?.value;
  console.log('Email from cookie:', email); // Debugging line
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
