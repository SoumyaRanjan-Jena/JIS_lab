'use server';
import mongoose from "mongoose";
import Case from "./caseModel";


async function updateCase(CIN, newDetails) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

    const updatedCase = await Case.findOneAndUpdate(
        { CIN: CIN },
        { $set: newDetails },
        { new: true }
    );
}

export default updateCase;