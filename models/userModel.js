import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  userType:   { type: String, required: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  phone:      { type: Number },
  password:   { type: String, required: true },
  profilePic: { type: String }
}, { collection: 'users' });

// Hash password before saving (only if modified)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Optional: add a method for comparing password (can be used in login)
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
