import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    CIN: Number,
    startDate: Date,
    caseStatus: String,
    defendantName: String,
    defendantAddress: String,
    crimeType: String,
    crimeDate: Date,
    crimeLocation: String,
    arrestingOfficer: String,
    arrestDate: Date,
    assignedJudge: String,
    assignedLawyer: String,
    summary: String,
    prevHearingDate: Date,
    nextHearingDate: Date,
    prevJudgement: String

}, { collection: 'cases' });

const Case = mongoose.models.Case || mongoose.model('Case', caseSchema);
export default Case;