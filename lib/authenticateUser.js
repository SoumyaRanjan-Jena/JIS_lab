'use server';
import dbConnect from '@/utils/db'; 
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

async function authenticateUser(data) {
  try {
    await dbConnect();

    const user = await User.findOne({ email: data.email, userType: data.userType });
    if (!user) return -1;

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) return -1;

    return {
      email: user.email,
      userType: user.userType,
      name: user.name
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return -1;
  }
}

export default authenticateUser;
