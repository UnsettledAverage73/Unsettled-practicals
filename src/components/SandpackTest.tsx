import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SandpackTest: React.FC = () => {
  const workingCode = `// Working JavaScript example
const numbers = [1, 2, 3, 4, 5];

console.log("Original array:", numbers);

// Map function
const doubled = numbers.map(x => x * 2);
console.log("Doubled:", doubled);

// Filter function
const evenNumbers = numbers.filter(x => x % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Reduce function
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum);`;

  const htmlCode = `<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
        }
        button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background: #4CAF50;
            color: white;
        }
        button:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Interactive Test Page</h1>
        <p>This is a working HTML example with JavaScript.</p>
        <button onclick="showMessage()">Click Me!</button>
        <div id="output"></div>
    </div>
    
    <script>
        function showMessage() {
            const output = document.getElementById('output');
            output.innerHTML = '<p style="color: #4CAF50; margin-top: 10px;">✅ Button clicked! JavaScript is working perfectly!</p>';
        }
        
        // Auto-run some code
        console.log("Page loaded successfully!");
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM fully loaded!");
        });
    </script>
</body>
</html>`;

  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Sandpack Live Editor Test</h1>
        <p className="text-lg text-gray-600">
          Testing the fixed Sandpack functionality with proper error handling
        </p>
      </div>

      {/* JavaScript Test */}
      <Card>
        <CardHeader>
          <CardTitle>JavaScript Live Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Sandpack
            template="vanilla"
            files={{
              'index.js': workingCode,
            }}
            options={{
              showConsole: true,
              showConsoleButton: true,
              editorHeight: 300,
              showLineNumbers: true,
              showInlineErrors: true,
              autorun: true,
            }}
            theme="light"
          />
        </CardContent>
      </Card>

      {/* HTML Test */}
      <Card>
        <CardHeader>
          <CardTitle>HTML Live Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Sandpack
            template="static"
            files={{
              'index.html': htmlCode,
            }}
            options={{
              showConsole: true,
              showConsoleButton: true,
              editorHeight: 400,
              showLineNumbers: true,
              showInlineErrors: true,
              autorun: true,
            }}
            theme="light"
          />
        </CardContent>
      </Card>

      {/* Error Handling Test */}
      <Card>
        <CardHeader>
          <CardTitle>Error Handling Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Try entering invalid JavaScript code to see error handling in action:
          </p>
          <Sandpack
            template="vanilla"
            files={{
              'index.js': '// Try adding syntax errors here\nconsole.log("Hello World!");',
            }}
            options={{
              showConsole: true,
              showConsoleButton: true,
              editorHeight: 200,
              showLineNumbers: true,
              showInlineErrors: true,
              autorun: false,
            }}
            theme="light"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SandpackTest; 