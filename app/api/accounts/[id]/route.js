import { NextResponse } from 'next/server';
import dbConnect from '@/utils/db';
import User from '@/models/userModel';

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
