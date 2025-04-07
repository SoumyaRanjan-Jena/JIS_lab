'use server';
import Case from "@/models/caseModel";
import dbConnect from "@/utils/db";


async function updateCase(CIN, newDetails) {
    await dbConnect();

    const updatedCase = await Case.findOneAndUpdate(
        { CIN: CIN },
        { $set: newDetails },
        { new: true }
    );
}

export default updateCase;