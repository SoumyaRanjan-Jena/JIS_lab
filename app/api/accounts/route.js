import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export async function GET() {
  await dbConnect();
  const users = await User.find({ userType: { $in: ['judge', 'lawyer'] } });
  return NextResponse.json(users);
}

export async function POST(req) {
  try {
    const { name, email, phone, password, userType } = await req.json();

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    //const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      userType: userType.toLowerCase()
    });

    return NextResponse.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      userType: newUser.userType
    });
  } catch (err) {
    console.error('POST /api/accounts error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

