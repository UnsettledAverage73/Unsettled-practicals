import React, { useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';
import { XIcon, PlayIcon, RotateCcwIcon } from 'lucide-react';

interface LiveCodeEditorProps {
  initialCode: string;
  language?: string;
  title?: string;
  onClose: () => void;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  initialCode,
  language = 'javascript',
  title = 'Live Code Editor',
  onClose
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Convert C code to JavaScript for execution
  const convertCToJS = (cCode: string) => {
    let jsCode = cCode
      .replace(/#include\s*<[^>]+>/g, '') // Remove includes
      .replace(/int\s+main\s*\(\s*\)\s*{/, 'function main() {') // Convert main function
      .replace(/printf\s*\(\s*"([^"]*)"([^)]*)\)\s*;/g, (match, format, args) => {
        if (args.trim()) {
          // Simple conversion - just log the format string for now
          return `console.log("${format}");`;
        }
        return `console.log("${format}");`;
      })
      .replace(/scanf\s*\([^)]*\)\s*;/g, '// Input simulation')
      .replace(/int\s+(\w+)\s*=\s*([^;]+);/g, 'let $1 = $2;')
      .replace(/int\s+(\w+);/g, 'let $1;')
      .replace(/return\s+0\s*;/g, 'return;');

    return `${jsCode}\nmain();`;
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      if (language === 'c') {
        // Execute C code by converting to JS
        const jsCode = convertCToJS(code);
        const originalConsoleLog = console.log;
        let outputText = '';
        
        console.log = (...args) => {
          outputText += args.join(' ') + '\n';
        };

        // Create a safe execution environment
        const safeEval = new Function(jsCode);
        safeEval();
        
        console.log = originalConsoleLog;
        setOutput(outputText || 'Code executed successfully!');
        toast.success('C code executed successfully!');
      } else if (language === 'html') {
        // For HTML, show in iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '300px';
        iframe.style.border = '1px solid #ddd';
        iframe.style.borderRadius = '4px';
        
        const container = document.getElementById('html-output');
        if (container) {
          container.innerHTML = '';
          container.appendChild(iframe);
          
          const iframeDoc = iframe.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
          }
        }
        setOutput('HTML rendered successfully!');
        toast.success('HTML rendered successfully!');
      } else {
        // For JavaScript, use eval in safe environment
        const originalConsoleLog = console.log;
        let outputText = '';
        
        console.log = (...args) => {
          outputText += args.join(' ') + '\n';
        };

        try {
          // Validate JavaScript syntax first
          new Function(code); // This will throw if syntax is invalid
          
          const safeEval = new Function(code);
          safeEval();
          
          console.log = originalConsoleLog;
          setOutput(outputText || 'Code executed successfully!');
          toast.success('JavaScript code executed successfully!');
        } catch (syntaxError) {
          console.log = originalConsoleLog;
          setOutput(`Syntax Error: ${syntaxError instanceof Error ? syntaxError.message : String(syntaxError)}`);
          toast.error('JavaScript syntax error');
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error('Error executing code');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    toast.info('Code reset to original');
  };

  // For JavaScript/HTML/CSS, use Sandpack
  if (['javascript', 'js', 'html', 'css'].includes(language)) {
    return (
      <Card className="w-full mb-6 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{title}</span>
            <div className="flex gap-2">
              <Button onClick={resetCode} variant="outline" size="sm">
                <RotateCcwIcon size={16} />
                <span className="ml-2">Reset</span>
              </Button>
              <Button onClick={onClose} variant="outline" size="sm">
                <XIcon size={16} />
                <span className="ml-2">Close</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Sandpack
            template={language === 'javascript' ? 'vanilla' : 'static'}
            files={{
              'index.js': language === 'javascript' ? code : '',
              'index.html': language === 'html' ? code : '<!DOCTYPE html>\n<html>\n<head>\n  <title>Live Editor</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
              'styles.css': language === 'css' ? code : 'body { font-family: Arial, sans-serif; }',
            }}
            options={{
              showConsole: true,
              showConsoleButton: true,
              editorHeight: 400,
              showLineNumbers: true,
              showInlineErrors: true,
            }}
            theme="light"
          />
        </CardContent>
      </Card>
    );
  }

  // For C and other languages, use custom editor
  return (
    <Card className="w-full mb-6 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <div className="flex gap-2">
            <Button 
              onClick={handleRunCode} 
              disabled={isRunning}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <PlayIcon size={16} />
              <span className="ml-2">{isRunning ? 'Running...' : 'Run Code'}</span>
            </Button>
            <Button onClick={resetCode} variant="outline" size="sm">
              <RotateCcwIcon size={16} />
              <span className="ml-2">Reset</span>
            </Button>
            <Button onClick={onClose} variant="outline" size="sm">
              <XIcon size={16} />
              <span className="ml-2">Close</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Code Editor</h3>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-3 font-mono text-sm resize-none"
              placeholder={`Write your ${language.toUpperCase()} code here...`}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Output</h3>
            <pre className="w-full h-64 p-3 bg-gray-900 text-green-400 rounded-md text-sm overflow-auto">
              {output || 'Click "Run Code" to see output...'}
            </pre>
            {language === 'html' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">HTML Preview</h3>
                <div id="html-output" className="w-full h-48 border rounded-md bg-white">
                  {/* HTML preview will be inserted here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveCodeEditor; 