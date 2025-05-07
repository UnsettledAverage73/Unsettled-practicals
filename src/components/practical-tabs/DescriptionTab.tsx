
import React from 'react';

interface DescriptionTabProps {
  description: string;
  facilities: string;
  scope?: string;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ description, facilities, scope }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Facilities Required</h3>
        <p className="text-gray-600">{facilities}</p>
      </div>
      
      {scope && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h3 className="font-semibold mb-2">Scope</h3>
          <p className="text-gray-600">{scope}</p>
        </div>
      )}
    </div>
  );
};

export default DescriptionTab;
