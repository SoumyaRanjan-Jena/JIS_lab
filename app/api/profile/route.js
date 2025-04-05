// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';

export async function PATCH(req) {
  try {
    const body = await req.json();

    // Get email and userType from cookies
    const cookieStore = cookies();
    const email = cookieStore.get('email')?.value;
    const userType = cookieStore.get('userType')?.value;

    if (!email || !userType) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email, userType },
      {
        $set: {
          name: body.name,
          phone: body.phone,
          profilePic: body.profilePic
        }
      },
      { new: true } // Return updated document
    ).lean();

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profilePic: updatedUser.profilePic || '',
      userType: updatedUser.userType
    });
  } catch (error) {
    console.error('PATCH /api/profile error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
