'use server';
import Case from "@/models/caseModel";
import dbConnect from "@/utils/db";


async function getCIN() {
    var rndCIN = Math.floor(Math.random() * 100000);
    while (await Case.exists({ CIN: rndCIN })) {
        rndCIN = Math.floor(Math.random() * 100000);
    }
    return rndCIN;
}

async function addNewCase(data) {
    await dbConnect();

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