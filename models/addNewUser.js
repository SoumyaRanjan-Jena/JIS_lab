'use server';
import mongoose from "mongoose";
import User from "./userModel";


async function addNewUser(data) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

    const count= await User.countDocuments({ userType: data.userType, email: data.email });
    if(count > 0) {
        return -1;
    }

    const newEntry = new User({
        userType: data.userType,
        name: data.name,
        email: data.email,
        phone: data.phoneNo,
        password: data.password,
    });

    await newEntry.save();
    return 0;
}

export default addNewUser;