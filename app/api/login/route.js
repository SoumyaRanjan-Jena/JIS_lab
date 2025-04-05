// app/api/login/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import authenticateUser from '@/models/authenticateUser';

export async function POST(req) {
  const body = await req.json();
  const user = await authenticateUser(body);

  if (user === -1) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookieStore = cookies();

  cookieStore.set('email', user.email, {
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

  return NextResponse.json({ success: true, user });
}
