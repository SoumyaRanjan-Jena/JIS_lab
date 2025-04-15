import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Billing from '@/models/billingModel';

export async function DELETE(req, { params }) {
  await connectDB();
  const { caseId } = params;

  try {
    console.log('Attempting to delete billing record with caseId:', caseId);

    const result = await Billing.deleteOne({ caseId: caseId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'No billing record found for the provided caseId' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Billing record deleted successfully' });
  } catch (err) {
    console.error('Error deleting billing record:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
