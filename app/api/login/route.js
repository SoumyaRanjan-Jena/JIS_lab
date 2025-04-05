// app/api/login/route.js
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import authenticateUser from '@/models/authenticateUser';

export async function POST(req) {
  const { email, password, userType } = await req.json();
  const user = await authenticateUser({ email, password, userType });
  if (user === -1) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = cookies();
  // set email + userType in httpOnly cookies
  cookieStore.set('userEmail', user.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  cookieStore.set('userType', user.userType, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ success: true });
}
