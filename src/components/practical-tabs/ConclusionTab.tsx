
import React from 'react';

interface ConclusionTabProps {
  conclusion: string;
}

const ConclusionTab: React.FC<ConclusionTabProps> = ({ conclusion }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
      <p className="text-gray-700">{conclusion}</p>
    </div>
  );
};

export default ConclusionTab;
