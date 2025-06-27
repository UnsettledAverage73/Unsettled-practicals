import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardIcon, CheckIcon, PlayIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import LiveCodeEditor from './LiveCodeEditor';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  executable?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'c', 
  title,
  className,
  executable = true
}) => {
  const [copied, setCopied] = useState(false);
  const [showLiveEditor, setShowLiveEditor] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleRunCode = () => {
    setShowLiveEditor(true);
  };

  return (
    <>
      <div className={cn(
        "code-block bg-muted rounded-lg my-4 group relative border border-gray-200 transition-all duration-200 hover:shadow-md", 
        className
      )}>
        {title && (
          <div className="bg-primary text-white px-4 py-2 font-medium rounded-t-lg">
            {title}
          </div>
        )}
        <div className="relative">
          <pre className="p-4 overflow-x-auto">
            <code className={language ? `language-${language}` : ''}>
              {code}
            </code>
          </pre>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {executable && (
              <Button 
                onClick={handleRunCode} 
                size="sm" 
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                <PlayIcon size={16} />
                <span className="ml-2">Run Code</span>
              </Button>
            )}
            <Button 
              onClick={copyToClipboard} 
              size="sm" 
              variant="secondary"
            >
              {copied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
              <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
          </div>
        </div>
      </div>

      {showLiveEditor && (
        <LiveCodeEditor
          initialCode={code}
          language={language}
          title={title || 'Live Code Editor'}
          onClose={() => setShowLiveEditor(false)}
        />
      )}
    </>
  );
};

export default CodeBlock;
