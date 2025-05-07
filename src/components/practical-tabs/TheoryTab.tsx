
import React from 'react';

interface TheoryTabProps {
  theory: string;
}

const TheoryTab: React.FC<TheoryTabProps> = ({ theory }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Theory</h2>
      <div className="text-gray-700 theory-content">
        {theory.split('\n\n').map((paragraph, i) => (
          <p key={i} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default TheoryTab;
