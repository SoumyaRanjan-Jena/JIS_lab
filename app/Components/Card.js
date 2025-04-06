import React from 'react';
import { useRouter } from 'next/navigation';

const MAX_LENGTH = 70;
function truncateText(text) {
  if (text.length > MAX_LENGTH) {
    return text.slice(0, MAX_LENGTH) + '...';
  }
  return text;
}


export default function Card(props) {
  const router = useRouter();

  function func(isEditAllowed) {
    if(isEditAllowed) {
      return (<div>
        <button 
          className="px-4 py-2 bg-white text-black font-small rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          onClick={() => router.push(`/dashboard/manage-cases/${props.CIN}`)}
        >
          Edit
        </button>
      </div>);
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">{"CIN: " + props.CIN}</h2>
        <p className="text-gray-600">{truncateText(props.summary)}</p>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        <button 
          className="px-4 py-2 bg-black text-white font-small rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          onClick={() => router.push(`/dashboard/view-cases/${props.CIN}`)}
        >
          View
        </button>

        {func(props.isEditAllowed)}
        
      </div>
    </div>
  );
}