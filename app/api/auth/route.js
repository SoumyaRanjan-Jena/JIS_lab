import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db'; 
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password, userType } = await req.json();
  await connectToDB();

  const user = await User.findOne({ email });
  if (!user || user.userType !== userType) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = cookies();
  cookieStore.set('userEmail', user.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ success: true });
}
