'use server';
import mongoose from "mongoose";
import User from "./userModel";


async function authenticateUser(data) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

    const count= await User.countDocuments({ userType: data.userType , email: data.email , 
        password: data.password });

    if(count === 0) {
        return -1;
    }
    return 0;
}

export default authenticateUser;