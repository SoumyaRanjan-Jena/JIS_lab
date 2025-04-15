import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Billing from '@/models/billingModel';
import User from '@/models/userModel';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';

export async function GET() {
  await dbConnect();

  try {
    const cookieStore = await cookies();
    const email = cookieStore.get('userEmail')?.value;
    const userType = cookieStore.get('userType')?.value;

    if (!email || userType !== 'lawyer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const lawyer = await User.findOne({ email, userType: 'lawyer' });
    if (!lawyer) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
    }

    const records = await Billing.find({ lawyerId: new mongoose.Types.ObjectId(lawyer._id) }).sort({ viewedAt: -1 });
    const total = records.reduce((sum, entry) => sum + entry.charge, 0);

    return NextResponse.json({ total, records });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
