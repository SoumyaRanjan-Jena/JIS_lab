'use client';
import { useState, useEffect } from 'react';
import viewCase from '@/models/viewCase';

const FilterComponent = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    viewCase(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    viewCase(1, selectedOption);
  }, [selectedOption]);

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm mb-6"> {/* Added margin-bottom */}
      <div className="flex flex-row justify-between gap-4">
        {/* Search Bar - Left aligned */}
        <div className="flex-1"> {/* Added max-width for search bar */}
          <input
            type="text"
            placeholder="Enter CIN to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
          />
        </div>

        {/* Dropdown - Right aligned */}
        <div className="flex justify-end"> {/* Right alignment container */}
          <div className="w-48"> {/* Fixed width for dropdown */}
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500">
              <option value="">Select Case Status</option>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default FilterComponent;