
import React from 'react';

interface OutputTabProps {
  output: string;
}

const OutputTab: React.FC<OutputTabProps> = ({ output }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Expected Output</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap text-sm">{output}</pre>
      </div>
    </div>
  );
};

export default OutputTab;
