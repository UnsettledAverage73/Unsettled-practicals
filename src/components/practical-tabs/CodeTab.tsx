
import React from 'react';
import CodeBlock from '@/components/CodeBlock';

interface CodeTabProps {
  code: string;
  title: string;
  language?: string;
}

const CodeTab: React.FC<CodeTabProps> = ({ code, title, language = 'javascript' }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Code</h2>
      <CodeBlock 
        code={code} 
        language={language} 
        title={`${title} - Code Implementation`} 
      />
    </div>
  );
};

export default CodeTab;
