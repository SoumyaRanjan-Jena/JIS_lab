'use server';
import mongoose from "mongoose";
import Case from "./caseModel";


async function viewCase(type, data) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

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

export default viewCase;