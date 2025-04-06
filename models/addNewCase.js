'use server';
import mongoose from "mongoose";
import Case from "./caseModel";


async function getCIN() {
    var rndCIN = Math.floor(Math.random() * 100000);
    while (await Case.exists({ CIN: rndCIN })) {
        rndCIN = Math.floor(Math.random() * 100000);
    }
    return rndCIN;
}

async function addNewCase(data) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect("mongodb://localhost:27017/TestDB", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
    }

    const newCIN= await getCIN();
    const newCase = new Case({
        CIN: newCIN,
        startDate: data.startDate,
        caseStatus: data.caseStatus,
        defendantName: data.defendantName,
        defendantAddress: data.defendantAddress,
        crimeType: data.crimeType,
        crimeDate: data.crimeDate,
        crimeLocation: data.crimeLocation,
        arrestingOfficer: data.arrestingOfficer,
        arrestDate: data.arrestDate,
        assignedJudge: data.assignedJudge,
        assignedLawyer: data.assignedLawyer,
        summary: data.summary
    });
    
    await newCase.save();
}

export default addNewCase;