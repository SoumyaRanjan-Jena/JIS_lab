'use server';
import User from "@/models/userModel";
import dbConnect from "@/utils/db";


async function addNewUser(data) {
    await dbConnect();

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