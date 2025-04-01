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
    assignedJudgeID: String,
    assignedLawyerID: String,
    summary: String,

}, { collection: 'cases' });

const Case = mongoose.models.Case || mongoose.model('Case', caseSchema);
export default Case;