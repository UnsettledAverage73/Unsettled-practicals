
import React from 'react';
import EnhancedInteractiveCodingPlayground from '@/components/EnhancedInteractiveCodingPlayground';

interface InteractiveTabProps {
  code: string;
  title: string;
  testCases?: { input: string; expectedOutput: string }[];
}

const InteractiveTab: React.FC<InteractiveTabProps> = ({ code, title, testCases }) => {
  return (
    <div className="animate-slide-in-up">
      <EnhancedInteractiveCodingPlayground
        initialCode={code}
        title={title}
        language="c"
        testCases={testCases}
      />
    </div>
  );
};

export default InteractiveTab;
