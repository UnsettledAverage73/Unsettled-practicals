
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardIcon, CheckIcon } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'c', 
  title,
  className 
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success('Code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn(
      "code-block bg-muted rounded-lg my-4 group relative border border-gray-200 transition-all duration-200 hover:shadow-md", 
      className
    )}>
      {title && (
        <div className="bg-primary text-white px-4 py-2 font-medium rounded-t-lg">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm">{code}</code>
      </pre>
      <Button 
        onClick={copyToClipboard} 
        size="sm" 
        variant="secondary" 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {copied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
        <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
      </Button>
    </div>
  );
};

export default CodeBlock;
