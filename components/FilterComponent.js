'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const FilterComponent = (props) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    props.handleQuery(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    props.handleQuery(1, selectedOption);
  }, [selectedOption]);

  function func(isEditAllowed) {
    if(isEditAllowed) {
      return (
        <div className="flex items-center justify-end ml-4">
          <div className="w-48">
            <button
              className="w-full p-2 border border-gray-300 rounded-md transition-all duration-300 hover:bg-black hover:text-white"
              onClick={() => { router.push('/dashboard/manage-cases/add-new-case'); }}
            >
              Add New Case
            </button>
          </div>
        </div>
      );
    }
  }


  return (
    <div className="bg-white max-w-7xl mx-auto px-4 mb-6">
      <div className="flex justify-between h-16 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter CIN to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex items-center justify-end ml-4">
          <div className="w-48">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Case Status</option>
              <option value="Pending">Pending</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {func(props.isEditAllowed)}

      </div>
    </div>

  );
  
};

export default FilterComponent;