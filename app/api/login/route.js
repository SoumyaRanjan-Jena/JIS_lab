//app/api/login/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { email, password, userType } = body;

  const user = await User.findOne({ email, userType: userType.toLowerCase() });
  if (!user) {
    return NextResponse.json({ error: 'Invalid user' }, { status: 401 });
  }
  const hashPass = /^\$2y\$/.test(user.password) ? '$2a$' + user.password.slice(4) : user.password;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set('userEmail', user.email, { httpOnly: true });
  cookieStore.set('userType', user.userType, { httpOnly: true });
  cookieStore.set('user', JSON.stringify({
    id: user._id,
    name: user.name,
    userType: user.userType,
  }), { httpOnly: true });

  return NextResponse.json({ success: true });
}