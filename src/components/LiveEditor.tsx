import React, { useState, useEffect, useRef } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { XIcon, PlayIcon, RotateCcwIcon, CodeIcon, EyeIcon, ArrowLeftIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LiveEditorProps {
  onClose?: () => void;
}

const LiveEditor: React.FC<LiveEditorProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'python' | 'web'>('web');
  const [pythonCode, setPythonCode] = useState(`# Welcome to Python Live Editor!
# Write your Python code here

print("Hello, World!")

# Example: Calculate factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Test the function
result = factorial(5)
print(f"Factorial of 5 is: {result}")

# Example: List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Numbers: {numbers}")
print(f"Squares: {squares}")`);

  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Web Editor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            margin: 1rem 0;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        button:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Live Web Editor</h1>
        <div class="card">
            <h2>Welcome to the Interactive Web Playground!</h2>
            <p>Edit the HTML, CSS, and JavaScript in the editor to see live changes.</p>
            <button onclick="showMessage()">Click Me!</button>
            <div id="output"></div>
        </div>
    </div>

    <script>
        function showMessage() {
            const output = document.getElementById('output');
            const messages = [
                '🎉 Great job!',
                '✨ You\'re doing amazing!',
                '🚀 Keep coding!',
                '💡 Innovation at its best!'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            output.innerHTML = '<h3>' + randomMessage + '</h3>';
        }

        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Web page loaded successfully!');
        });
    </script>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Custom CSS Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: fadeIn 1s ease-in;
}

.card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin: 10px;
}

button:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

#output {
    margin-top: 20px;
    padding: 15px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    min-height: 50px;
}`);

  const [jsCode, setJsCode] = useState(`// JavaScript for Interactive Features
console.log('JavaScript loaded successfully!');

function showMessage() {
    const output = document.getElementById('output');
    const messages = [
        '🎉 Great job!',
        '✨ You\'re doing amazing!',
        '🚀 Keep coding!',
        '💡 Innovation at its best!',
        '🌟 You\'re a coding star!',
        '🔥 Hot code coming through!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = '<h3 style="color: #4CAF50;">' + randomMessage + '</h3>';
    
    // Add some animation
    output.style.animation = 'none';
    output.offsetHeight; // Trigger reflow
    output.style.animation = 'fadeIn 0.5s ease-in';
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Web page loaded successfully!');
    
    // Add click event to body for fun
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            console.log('Clicked at:', e.clientX, e.clientY);
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            showMessage();
        }
    });
});

// Add some utility functions
function createElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
}

function addRandomElement() {
    const container = document.querySelector('.container');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newElement = createElement('div', '✨ New Element!', 'card');
    newElement.style.backgroundColor = randomColor;
    newElement.style.color = 'white';
    newElement.style.margin = '10px 0';
    
    container.appendChild(newElement);
    
    setTimeout(() => {
        newElement.remove();
    }, 3000);
}`);

  const [pythonOutput, setPythonOutput] = useState('');
  const [isRunningPython, setIsRunningPython] = useState(false);
  const pyodideRef = useRef<any>(null);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [pyodideError, setPyodideError] = useState<string | null>(null);
  const [webConsole, setWebConsole] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check if this is a standalone page (accessed via URL)
  const isStandalone = location.pathname.startsWith('/live-editor');

  // Set initial tab based on URL
  useEffect(() => {
    if (location.pathname.includes('/python')) {
      setActiveTab('python');
    } else {
      setActiveTab('web');
    }
  }, [location.pathname]);

  const handleClose = () => {
    if (onClose) {
      // Modal mode - use the provided onClose function
      onClose();
    } else if (isStandalone) {
      // Standalone mode - navigate back or to home
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  // Load Pyodide on first use
  const loadPyodide = async () => {
    if (pyodideRef.current) return pyodideRef.current;
    setPyodideLoading(true);
    setPyodideError(null);
    try {
      // @ts-ignore
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      pyodideScript.async = true;
      document.body.appendChild(pyodideScript);
      await new Promise((resolve, reject) => {
        pyodideScript.onload = resolve;
        pyodideScript.onerror = reject;
      });
      // @ts-ignore
      const pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/' });
      pyodideRef.current = pyodide;
      setPyodideLoading(false);
      return pyodide;
    } catch (err: any) {
      setPyodideError('Failed to load Pyodide.');
      setPyodideLoading(false);
      throw err;
    }
  };

  // Enhanced Python execution with pip install and better error handling
  const executePython = async () => {
    setIsRunningPython(true);
    setPythonOutput('');
    setPyodideError(null);
    try {
      const pyodide = await loadPyodide();
      let output = '';
      // Redirect stdout/stderr
      pyodide.setStdout({ batched: (s: string) => { output += s; } });
      pyodide.setStderr({ batched: (s: string) => { output += s; } });
      // Handle !pip install (micropip)
      if (pythonCode.includes('!pip install')) {
        const pipLines = pythonCode.split('\n').filter(l => l.trim().startsWith('!pip install'));
        for (const pipLine of pipLines) {
          const pkg = pipLine.replace('!pip install', '').trim();
          output += `Installing ${pkg}...\n`;
          await pyodide.loadPackage('micropip');
          await pyodide.runPythonAsync(`import micropip\nawait micropip.install('${pkg}')`);
          output += `${pkg} installed!\n`;
        }
      }
      // Remove pip lines for actual code execution
      const codeToRun = pythonCode.split('\n').filter(l => !l.trim().startsWith('!pip install')).join('\n');
      await pyodide.runPythonAsync(codeToRun);
      setPythonOutput(output || '');
      toast.success('Python code executed successfully!');
    } catch (error: any) {
      setPythonOutput(error?.message || String(error));
      setPyodideError(error?.traceback || 'Python execution error.');
      toast.error('Error executing Python code');
    } finally {
      setIsRunningPython(false);
    }
  };

  // Enhanced Web (HTML/CSS/JS) execution with console capture
  const runWebCode = () => {
    setWebConsole([]);
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    // Prepare the HTML with injected JS for console capture
    const consoleScript = `
      <script>
        (function() {
          const parent = window.parent;
          function send(type, ...args) {
            parent.postMessage({ type: 'web-console', logType: type, args }, '*');
          }
          ['log', 'error', 'warn', 'info'].forEach(fn => {
            const orig = console[fn];
            console[fn] = function(...args) {
              send(fn, ...args);
              orig.apply(console, args);
            };
          });
          window.onerror = function(msg, url, line, col, err) {
            send('error', msg + ' at ' + line + ':' + col);
          };
        })();
      <\/script>
    `;
    const fullHtml = htmlCode.replace('</body>', `${consoleScript}</body>`);
    doc.open();
    doc.write(fullHtml);
    doc.close();
  };

  // Listen for console messages from iframe
  useEffect(() => {
    function handleMsg(e: MessageEvent) {
      if (e.data && e.data.type === 'web-console') {
        setWebConsole(prev => [...prev, `[${e.data.logType}] ${e.data.args.join(' ')}`]);
      }
    }
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  const resetPythonCode = () => {
    setPythonCode(`# Welcome to Python Live Editor!
# Write your Python code here

print("Hello, World!")

# Example: Calculate factorial
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Test the function
result = factorial(5)
print(f"Factorial of 5 is: {result}")

# Example: List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Numbers: {numbers}")
print(f"Squares: {squares}")`);
    setPythonOutput('');
    toast.info('Python code reset to original');
  };

  const resetWebCode = () => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Web Editor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 2rem;
            margin: 1rem 0;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        button:hover {
            background: #45a049;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Live Web Editor</h1>
        <div class="card">
            <h2>Welcome to the Interactive Web Playground!</h2>
            <p>Edit the HTML, CSS, and JavaScript in the editor to see live changes.</p>
            <button onclick="showMessage()">Click Me!</button>
            <div id="output"></div>
        </div>
    </div>

    <script>
        function showMessage() {
            const output = document.getElementById('output');
            const messages = [
                '🎉 Great job!',
                '✨ You\'re doing amazing!',
                '🚀 Keep coding!',
                '💡 Innovation at its best!'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            output.innerHTML = '<h3>' + randomMessage + '</h3>';
        }

        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Web page loaded successfully!');
        });
    </script>
</body>
</html>`);
    setCssCode(`/* Custom CSS Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: fadeIn 1s ease-in;
}

.card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    margin: 1rem 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    margin: 10px;
}

button:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

#output {
    margin-top: 20px;
    padding: 15px;
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
    min-height: 50px;
}`);
    setJsCode(`// JavaScript for Interactive Features
console.log('JavaScript loaded successfully!');

function showMessage() {
    const output = document.getElementById('output');
    const messages = [
        '🎉 Great job!',
        '✨ You\'re doing amazing!',
        '🚀 Keep coding!',
        '💡 Innovation at its best!',
        '🌟 You\'re a coding star!',
        '🔥 Hot code coming through!'
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = '<h3 style="color: #4CAF50;">' + randomMessage + '</h3>';
    
    // Add some animation
    output.style.animation = 'none';
    output.offsetHeight; // Trigger reflow
    output.style.animation = 'fadeIn 0.5s ease-in';
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Web page loaded successfully!');
    
    // Add click event to body for fun
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            console.log('Clicked at:', e.clientX, e.clientY);
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            showMessage();
        }
    });
});

// Add some utility functions
function createElement(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
}

function addRandomElement() {
    const container = document.querySelector('.container');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newElement = createElement('div', '✨ New Element!', 'card');
    newElement.style.backgroundColor = randomColor;
    newElement.style.color = 'white';
    newElement.style.margin = '10px 0';
    
    container.appendChild(newElement);
    
    setTimeout(() => {
        newElement.remove();
    }, 3000);
}`);
    toast.info('Web code reset to original');
  };

  return (
    <div className={isStandalone ? "min-h-screen bg-gray-50" : "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"}>
      <Card className={isStandalone ? "w-full max-w-7xl mx-auto my-4 h-[calc(100vh-2rem)] overflow-hidden" : "w-full max-w-7xl h-[90vh] overflow-hidden"}>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CodeIcon size={24} />
              <span>Live Code Editor</span>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleClose} variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                {isStandalone ? <ArrowLeftIcon size={16} /> : <XIcon size={16} />}
                <span className="ml-2">{isStandalone ? 'Back' : 'Close'}</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 h-full">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'python' | 'web')} className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="web" className="flex items-center gap-2">
                <EyeIcon size={16} />
                HTML/CSS/JS
              </TabsTrigger>
              <TabsTrigger value="python" className="flex items-center gap-2">
                <CodeIcon size={16} />
                Python
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="web" className="h-full mt-0">
              <div className="h-full">
                <div className="flex flex-col lg:flex-row gap-4 h-full">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 font-medium">HTML/CSS/JS Editor</div>
                    <Sandpack
                      template="vanilla"
                      files={{
                        'index.html': htmlCode,
                        'styles.css': cssCode,
                        'script.js': jsCode,
                      }}
                      options={{
                        showConsole: false,
                        showConsoleButton: false,
                        editorHeight: isStandalone ? 'calc(60vh)' : 'calc(40vh)',
                        showLineNumbers: true,
                        showInlineErrors: true,
                        showNavigator: true,
                        showTabs: true,
                      }}
                      theme="light"
                      customSetup={{
                        dependencies: {},
                      }}
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button onClick={runWebCode} variant="default" size="sm">Run Web Code</Button>
                      <Button onClick={resetWebCode} variant="outline" size="sm">
                        <RotateCcwIcon size={16} />
                        <span className="ml-2">Reset Code</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="mb-2 font-medium">Web Preview</div>
                    <div className="w-full flex-1 rounded mb-2 bg-white border overflow-hidden" style={{minHeight: '200px'}}>
                      <iframe ref={iframeRef} className="w-full h-64 sm:h-80 md:h-96 border-0" title="Web Preview" />
                    </div>
                    <div className="mb-2 font-medium">Console Output</div>
                    <div className="bg-black text-green-400 p-2 rounded font-mono text-xs h-24 sm:h-32 md:h-40 overflow-auto">
                      {webConsole.length === 0 ? <span className="text-gray-500">Console output will appear here.</span> : webConsole.map((l, i) => <div key={i}>{l}</div>)}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="h-full mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Python Code Editor</h3>
                    <div className="flex gap-2">
                      <Button 
                        onClick={executePython} 
                        disabled={isRunningPython}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <PlayIcon size={16} />
                        <span className="ml-2">{isRunningPython ? 'Running...' : 'Run Python'}</span>
                      </Button>
                      <Button onClick={resetPythonCode} variant="outline" size="sm">
                        <RotateCcwIcon size={16} />
                        <span className="ml-2">Reset</span>
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={pythonCode}
                    onChange={(e) => setPythonCode(e.target.value)}
                    className={`w-full p-4 font-mono text-sm resize-none ${isStandalone ? 'h-[calc(100vh-350px)]' : 'h-[calc(100vh-300px)]'}`}
                    placeholder="Write your Python code here..."
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Python Output</h3>
                  <div className={`bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto font-mono text-sm ${isStandalone ? 'h-[calc(100vh-350px)]' : 'h-[calc(100vh-300px)]'}`}>
                    <pre>{pyodideLoading ? 'Loading Python runtime...' : pyodideError ? pyodideError : (pythonOutput || 'Click "Run Python" to see output...')}</pre>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Note:</strong> This is a simulated Python environment. For full Python execution, consider using:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Pyodide (Python in the browser)</li>
                      <li>Python WASM runtime</li>
                      <li>Backend Python execution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveEditor; 