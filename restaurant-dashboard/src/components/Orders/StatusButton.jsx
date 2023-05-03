import React from 'react'

const StatusButton = ({ setStatus, statusText, Text, color }) => {
  return (
    <div className="w-2/4">
      <button
        onClick={() => 
          setStatus(statusText)
          
        }
        className={`w-11/12 my-3 cursor-pointer items-center gap-x-2 text-gray-700 font-bold text-base p-2 rounded-xl  hover:bg-${color}-200 active:bg-${color}-400 duration-150 bg-${color}-200 border-l-4 border-b-4 border-${color}-500`}
      >
        {Text}
      </button>
    </div>
  );
}

export default StatusButton