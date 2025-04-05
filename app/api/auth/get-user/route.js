//app/api/auth/get-user/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const email = cookieStore.get('userEmail')?.value;

  if (!email) {
    return NextResponse.json(null, { status: 200 });
  }

  // You can also fetch from DB here
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/user-by-email`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' },
  });

  const user = await res.json();
  return NextResponse.json(user);
}
