import React from 'react';
import { useRouter } from 'next/navigation';

export default function Account(props) {
  const router = useRouter();

  const handleDelete = () => {
    // Add your delete logic here
    console.log('Deleting account:', props.email);
    // Typically you would call an API here
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">{props.name}</h2>
        <div className="text-gray-600 space-y-2">
          <p>User Type: {props.userType}</p>
          <p>Email: {props.email}</p>
          <p>Phone No: {props.phone}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button 
          className="px-4 py-2 bg-red-600 text-white font-small rounded-full border border-red-600 transition-all duration-300 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}