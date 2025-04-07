// app/api/profile/route.js
import { NextResponse } from 'next/server';
import { cookies }      from 'next/headers';
import dbConnect        from '@/utils/db';
import User             from '@/models/userModel';

export async function GET() {
  try {
    const cookieStore = cookies();
    const email    = cookieStore.get('userEmail')?.value;
    const userType = cookieStore.get('userType')?.value;
    if (!email || !userType) return NextResponse.json(null, { status: 200 });

    await dbConnect();
    const user = await User.findOne({ email, userType })
      .select('-password')
      .lean();

    if (!user) return NextResponse.json(null, { status: 200 });

    return NextResponse.json({
      _id:       user._id.toString(),
      name:      user.name.toString(),
      email:     user.email.toString(),
      phone:     user.phone.toString(),
      profilePic: user.profilePic?.toString('base64') || '',
      userType:  user.userType
    });
  } catch (err) {
    console.error('GET /api/profile error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const cookieStore = cookies();
    const email    = cookieStore.get('userEmail')?.value;
    const userType = cookieStore.get('userType')?.value;
    if (!email || !userType) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const updated = await User.findOneAndUpdate(
      { email, userType },
      { $set: { name: body.name, phone: body.phone, profilePic: body.profilePic } },
      { new: true }
    ).lean();

    if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({
      _id:       updated._id.toString(),
      name:      updated.name,
      email:     updated.email,
      phone:     updated.phone,
      profilePic: updated.profilePic ? `data:image/png;base64,${updated.profilePic.toString('base64')}` : '',
      userType:  updated.userType
    });
  } catch (err) {
    console.error('PATCH /api/profile error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
