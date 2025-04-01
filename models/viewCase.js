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

    // console.log("Type:", type);
    // console.log("Data received in viewCase:", data);

    if (type === 0) {
        // Search by CIN
        var result = await Case.find();
        if(data !== "") {
            result = await Case.find({ CIN: Number(data) });
        }
        console.log("Result from viewCase:", result);
    } 
    else {
        // Filter by case status
        const result = await Case.find({ caseStatus: data });
        console.log("Result from viewCase:", result);
    }
}

export default viewCase;