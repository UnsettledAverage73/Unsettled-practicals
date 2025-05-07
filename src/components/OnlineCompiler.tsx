
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

interface OnlineCompilerProps {
  code: string;
}

const OnlineCompiler: React.FC<OnlineCompilerProps> = ({ code }) => {
  const [editorCode, setEditorCode] = useState(code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    try {
      const iframeContainer = document.getElementById('iframe-container');
      if (iframeContainer) {
        iframeContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid #ddd';
        iframe.style.borderRadius = '4px';
        
        iframeContainer.appendChild(iframe);
        
        const iframeDoc = iframe.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(editorCode);
          iframeDoc.close();
          
          setOutput("Code executed successfully!");
          toast.success("Code executed successfully!");
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error("Error executing code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="mb-2 font-medium">Code Editor</div>
          <Textarea 
            value={editorCode} 
            onChange={(e) => setEditorCode(e.target.value)}
            className="min-h-[300px] font-mono text-sm p-4"
          />
          <div className="mt-4 flex justify-between gap-2">
            <Button 
              onClick={() => setEditorCode(code)}
              variant="outline"
            >
              Reset Code
            </Button>
            <Button 
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-2 font-medium">Output</div>
          <div id="iframe-container" className="min-h-[300px] bg-gray-50 rounded border p-4">
            {/* iframe will be inserted here */}
          </div>
          <div className="mt-2 text-sm text-gray-500">{output}</div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
