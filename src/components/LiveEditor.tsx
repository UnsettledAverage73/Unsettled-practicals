import React, { useState, useEffect } from 'react';
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

  // Python execution using Pyodide (simulated for now)
  const executePython = async () => {
    setIsRunningPython(true);
    setPythonOutput('Running Python code...\n');

    try {
      // Simulate Python execution with JavaScript
      const output = await simulatePythonExecution(pythonCode);
      setPythonOutput(output);
      toast.success('Python code executed successfully!');
    } catch (error) {
      setPythonOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      toast.error('Error executing Python code');
    } finally {
      setIsRunningPython(false);
    }
  };

  const simulatePythonExecution = async (code: string): Promise<string> => {
    // This is a simplified Python simulation
    // In a real implementation, you'd use Pyodide or a Python WASM runtime
    
    let output = '';
    const lines = code.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('print(')) {
        // Extract print content
        const content = trimmedLine.match(/print\(['"`]([^'"`]*)['"`]\)/);
        if (content) {
          output += content[1] + '\n';
        }
      } else if (trimmedLine.includes('=') && !trimmedLine.startsWith('#')) {
        // Variable assignment
        output += `Variable assigned: ${trimmedLine}\n`;
      } else if (trimmedLine.startsWith('def ')) {
        // Function definition
        const funcName = trimmedLine.match(/def (\w+)/);
        if (funcName) {
          output += `Function defined: ${funcName[1]}\n`;
        }
      } else if (trimmedLine.startsWith('#')) {
        // Comment - skip
        continue;
      } else if (trimmedLine && !trimmedLine.startsWith('if ') && !trimmedLine.startsWith('for ') && !trimmedLine.startsWith('while ')) {
        // Other executable lines
        output += `Executed: ${trimmedLine}\n`;
      }
    }
    
    // Simulate some common Python operations
    if (code.includes('factorial')) {
      output += 'Factorial calculation completed\n';
    }
    if (code.includes('for x in')) {
      output += 'List comprehension executed\n';
    }
    
    return output || 'Code executed successfully!';
  };

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
                <Sandpack
                  template="vanilla"
                  files={{
                    'index.html': htmlCode,
                    'styles.css': cssCode,
                    'script.js': jsCode,
                  }}
                  options={{
                    showConsole: true,
                    showConsoleButton: true,
                    editorHeight: isStandalone ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)',
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
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Edit HTML, CSS, and JavaScript in the tabs above to see live changes
                    </div>
                    <Button onClick={resetWebCode} variant="outline" size="sm">
                      <RotateCcwIcon size={16} />
                      <span className="ml-2">Reset Code</span>
                    </Button>
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
                    <pre>{pythonOutput || 'Click "Run Python" to see output...'}</pre>
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