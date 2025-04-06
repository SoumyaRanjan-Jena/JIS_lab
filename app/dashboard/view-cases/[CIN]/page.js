import React from "react";
import viewCase from "@/models/viewCase";


const formatDate = (dateString) => {
    if (!dateString) return "NA";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default async function Page({ params }) {
    const { CIN } = await params;
    const caseDetails = await viewCase(0, CIN);
    const caseData = caseDetails[0];

    return (
        <div className="bg-white max-w-7xl mx-auto px-4 mb-6 mt-6">
            <div className="flex h-16 items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 mr-4">
                Case #{caseData.CIN} - {caseData.crimeType}
                </h1>
                <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    caseData.caseStatus === 'Upcoming' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-200 text-gray-700'}`}>
                    {caseData.caseStatus}
                </span>
                <p className="text-gray-600">
                    Start Date: {formatDate(caseData.startDate)}
                </p>
                </div>
            </div>

            {/* Defendant Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Defendant</h2>
                <p className="text-gray-600 mb-1">{caseData.defendantName}</p>
                <p className="text-gray-500 text-sm">{caseData.defendantAddress}</p>
                </div>

                {/* Crime Details */}
                <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Crime Details</h2>
                <p className="text-gray-600 mb-1">{caseData.crimeType}</p>
                <p className="text-gray-500 text-sm">
                    {formatDate(caseData.crimeDate)} at {caseData.crimeLocation}
                </p>
                </div>
            </div>

            {/* Arrest Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Arrest</h2>
                <p className="text-gray-600 mb-1">{caseData.arrestingOfficer}</p>
                <p className="text-gray-500 text-sm">{formatDate(caseData.arrestDate)}</p>
                </div>

                {/* Assigned Personnel */}
                <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Assigned Personnel</h2>
                <p className="text-gray-600 mb-1">Judge: {caseData.assignedJudge}</p>
                <p className="text-gray-600">Lawyer: {caseData.assignedLawyer}</p>
                </div>
            </div>
            
            {/* Hearing Details */}
            <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Hearing Details</h2>
                <div className="space-y-2">
                    <div className="text-gray-600">
                        <span className="inline-block min-w-[160px] font-medium">Next Date of Hearing:</span>
                        <span className="text-gray-800 ml-2">{formatDate(caseData.nextHearingDate)}</span>
                    </div>
                    <div className="text-gray-600">
                        <span className="inline-block min-w-[160px] font-medium">Previous Date of Hearing:</span>
                        <span className="text-gray-800 ml-2">{formatDate(caseData.prevHearingDate)}</span>
                    </div>
                    <div className="text-gray-600">
                        <span className="inline-block min-w-[160px] font-medium mb-2">Previous Judgement delivered:</span>
                        <p className="text-gray-600 leading-relaxed">{caseData.prevJudgement}</p>
                    </div>
                </div>
            </div>

            {/* Case Summary */}
            <div className="bg-white p-4 rounded-lg shadow-xs">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Case Summary</h2>
                <p className="text-gray-600 leading-relaxed">
                {caseData.summary}
                </p>
            </div>
        </div>
    );
}