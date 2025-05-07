
import React from 'react';

interface PracticalHeaderProps {
  id: number;
  title: string;
  aim: string;
}

const PracticalHeader: React.FC<PracticalHeaderProps> = ({ id, title, aim }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h1 className="text-3xl font-bold text-[#9b87f5] mb-4">
        Practical {id}: {title}
      </h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Aim</h2>
        <p className="text-gray-700">{aim}</p>
      </div>
    </div>
  );
};

export default PracticalHeader;
