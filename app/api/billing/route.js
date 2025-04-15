import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Billing from '@/models/billingModel';
import { getUserFromSession } from '@/lib/auth';

export async function GET(req) {
  await connectDB();

  const user = await getUserFromToken(req);
  if (!user || user.userType.toLowerCase() !== 'lawyer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const records = await Billing.find({ lawyerId: user._id }).sort({ viewedAt: -1 });

  const total = records.reduce((sum, record) => sum + record.charge, 0);

  return NextResponse.json({ total, records });
}
