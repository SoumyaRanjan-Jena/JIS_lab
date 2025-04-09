'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddNewCaseForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    startDate: '',
    caseStatus: 'Upcoming',
    defendantName: '',
    defendantAddress: '',
    crimeType: 'Theft',
    crimeDate: '',
    crimeLocation: '',
    arrestingOfficer: '',
    arrestDate: '',
    assignedJudge: '',
    assignedLawyer: '',
    summary: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/add-new-case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();

    alert('Case added successfully!');
    router.push('/dashboard/manage-cases');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Form Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">New Case Entry</h1>
          <p className="text-gray-600 mt-2">Please fill in the case details below</p>
        </div>

        {/* Case Status and Start Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Case Status</label>
            <select
              name="caseStatus"
              value={formData.caseStatus}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Defendant Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Defendant Name</label>
            <input
              type="text"
              name="defendantName"
              value={formData.defendantName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Defendant Address</label>
            <input
              type="text"
              name="defendantAddress"
              value={formData.defendantAddress}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Crime Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Crime Type</label>
            <select
              name="crimeType"
              value={formData.crimeType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Theft">Theft</option>
              <option value="Assault">Assault</option>
              <option value="Fraud">Fraud</option>
              <option value="Burglary">Burglary</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Crime Date</label>
            <input
              type="date"
              name="crimeDate"
              value={formData.crimeDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Crime Location</label>
          <input
            type="text"
            name="crimeLocation"
            value={formData.crimeLocation}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Arrest Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Arresting Officer</label>
            <input
              type="text"
              name="arrestingOfficer"
              value={formData.arrestingOfficer}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Arrest Date</label>
            <input
              type="date"
              name="arrestDate"
              value={formData.arrestDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Assigned Personnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Judge Name</label>
            <input
              type="text"
              name="assignedJudge"
              value={formData.assignedJudge}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Lawyer Name</label>
            <input
              type="text"
              name="assignedLawyer"
              value={formData.assignedLawyer}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Case Summary */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Case Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full px-6 py-2 bg-black text-white font-medium rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black"
          >
            Submit Case
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCaseForm;