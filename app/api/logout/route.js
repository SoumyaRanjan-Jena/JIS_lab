// app/api/logout/route.js
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete('userEmail', { path: '/' });
  cookieStore.delete('userType',  { path: '/' });
  return NextResponse.json({ message: 'Logged out' });
}
