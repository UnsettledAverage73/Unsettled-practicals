
import React from 'react';
import OnlineCompiler from '@/components/OnlineCompiler';

interface TryItTabProps {
  code: string;
}

const TryItTab: React.FC<TryItTabProps> = ({ code }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Try It Yourself</h2>
      <p className="text-gray-700 mb-4">
        You can modify and run the code below to see how it works.
      </p>
      <OnlineCompiler code={code} />
    </div>
  );
};

export default TryItTab;
