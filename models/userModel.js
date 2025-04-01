import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: String,
    name: String,
    email: String,
    phone: Number,
    password: String,
}, { collection: 'users' });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;