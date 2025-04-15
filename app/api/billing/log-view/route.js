import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import Billing from '@/models/billingModel';
import User from '@/models/userModel';
import { cookies } from 'next/headers';

export async function POST(req) {
  await dbConnect();

  try {
    const all = await Billing.find({});
    console.log('All billing entries:', all);


    const { caseId } = await req.json();
    const cookieStore = await cookies();
    const email = cookieStore.get('userEmail')?.value;
    const userType = cookieStore.get('userType')?.value;

    if (!email || userType !== 'lawyer') {
      return NextResponse.json({ success: true, message: 'Not a lawyer, no billing change done' });
    }

    const lawyer = await User.findOne({ email, userType: 'lawyer' });
    if (!lawyer) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
    }

    const mongoose = require('mongoose');
    const records = await Billing.find({ lawyerId: new mongoose.Types.ObjectId(lawyer._id) });
    console.log(records);

    const billing = new Billing({
      lawyerId: lawyer._id,     
      caseId,
      charge: 10,               // Customize as needed
      viewedAt: new Date(),
    });

    await billing.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('⨯', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
