import React from 'react';


export default function Card(props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">{props.title}</h2>
        <p className="text-gray-600">{props.body}</p>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button className="px-4 py-2 bg-black text-white font-small rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
          View
        </button>
        <button className="px-4 py-2 bg-white text-black font-small rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
          Edit
        </button>
        <button className="px-4 py-2 bg-white text-black font-small rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
          Delete
        </button>
      </div>
    </div>
  );
}