'use server';
import Case from "@/models/caseModel";
import dbConnect from "@/utils/db";

async function getCases(type, data) {
    await dbConnect();
    
    type = Number(type);

    var result = await Case.find();
    if (type === 0 && data !== "") {
        result = await Case.find({ CIN: Number(data) });
    } 
    else if (type === 1 && data !== "") {
        result = await Case.find({ caseStatus: data });
    }
    const plainData = JSON.parse(JSON.stringify(result));
    return plainData;
}

export default getCases;