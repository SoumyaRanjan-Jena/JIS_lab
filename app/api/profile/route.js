import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import User from '@/models/userModel';

export async function GET(req) {
  const cookieStore = cookies();
  const email = cookieStore.get('userEmail')?.value;

  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectToDB();
  const user = await User.findOne({ email }).select('-password');
  return NextResponse.json(user);
}

export async function PATCH(req) {
  const cookieStore = cookies();
  const email = cookieStore.get('userEmail')?.value;

  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, phone, profilePic } = await req.json();
  await connectToDB();
  const updated = await User.findOneAndUpdate(
    { email },
    { name, phone, profilePic },
    { new: true, runValidators: true }
  ).select('-password');

  return NextResponse.json(updated);
}
