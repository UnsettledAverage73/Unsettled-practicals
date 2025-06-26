
import React from 'react';
import InteractiveCodingPlayground from '@/components/InteractiveCodingPlayground';

interface InteractiveTabProps {
  code: string;
  title: string;
  testCases?: { input: string; expectedOutput: string }[];
}

const InteractiveTab: React.FC<InteractiveTabProps> = ({ code, title, testCases }) => {
  return (
    <div className="animate-fade-in">
      <InteractiveCodingPlayground
        initialCode={code}
        title={title}
        language="c"
        testCases={testCases}
      />
    </div>
  );
};

export default InteractiveTab;
