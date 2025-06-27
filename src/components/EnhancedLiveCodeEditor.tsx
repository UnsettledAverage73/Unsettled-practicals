import React, { useState, useEffect, useRef } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import { 
  XIcon, 
  PlayIcon, 
  RotateCcwIcon, 
  CodeIcon, 
  EyeIcon, 
  ArrowLeftIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  PaletteIcon,
  SettingsIcon,
  MaximizeIcon,
  MinimizeIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface EnhancedLiveCodeEditorProps {
  onClose?: () => void;
}

const EnhancedLiveCodeEditor: React.FC<EnhancedLiveCodeEditorProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'python' | 'web'>('web');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const [pythonCode, setPythonCode] = useState(`# 🐍 Python Live Editor
# Write modern Python code with style!

def greet(name="Developer"):
    """A friendly greeting function"""
    return f"Hello, {name}! 🚀"

def calculate_fibonacci(n):
    """Calculate Fibonacci sequence"""
    if n <= 1:
        return n
    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

# Main execution
if __name__ == "__main__":
    print(greet("Python Coder"))
    print("\\nFibonacci sequence:")
    for i in range(8):
        print(f"F({i}) = {calculate_fibonacci(i)}")
    
    # List comprehension example
    squares = [x**2 for x in range(1, 6)]
    print(f"\\nSquares: {squares}")
    
    # Dictionary comprehension
    colors = {'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF'}
    print(f"\\nColors: {colors}")
    
    print("\\n✨ Happy coding! ✨")`);

  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web App</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .container {
            max-width: 900px;
            width: 90%;
            text-align: center;
            padding: 2rem;
        }
        
        .hero-title {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #ffffff, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-subtitle {
            font-size: 1.25rem;
            opacity: 0.9;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            padding: 2rem;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .feature-card:hover {
            transform: translateY(-8px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        
        .card-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            display: block;
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .card-description {
            opacity: 0.8;
            line-height: 1.5;
        }
        
        .cta-button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 1rem 0.5rem;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
        }
        
        .stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: #a78bfa;
        }
        
        .stat-label {
            opacity: 0.8;
            margin-top: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .stats {
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="hero-title">🚀 Modern Web Experience</h1>
        <p class="hero-subtitle">
            Build beautiful, responsive applications with cutting-edge design
        </p>
        
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number" id="users">1000+</div>
                <div class="stat-label">Happy Users</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="projects">500+</div>
                <div class="stat-label">Projects Built</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="lines">50K+</div>
                <div class="stat-label">Lines of Code</div>
            </div>
        </div>
        
        <div class="card-grid">
            <div class="feature-card" onclick="animateCard(this)">
                <span class="card-icon">⚡</span>
                <h3 class="card-title">Lightning Fast</h3>
                <p class="card-description">
                    Optimized performance with modern web technologies
                </p>
            </div>
            
            <div class="feature-card" onclick="animateCard(this)">
                <span class="card-icon">🎨</span>
                <h3 class="card-title">Beautiful Design</h3>
                <p class="card-description">
                    Stunning visuals with attention to every detail
                </p>
            </div>
            
            <div class="feature-card" onclick="animateCard(this)">
                <span class="card-icon">📱</span>
                <h3 class="card-title">Fully Responsive</h3>
                <p class="card-description">
                    Perfect experience across all devices and screen sizes
                </p>
            </div>
        </div>
        
        <div style="margin-top: 2rem;">
            <button class="cta-button" onclick="celebrate()">
                ✨ Try It Now
            </button>
            <button class="cta-button" onclick="showDemo()">
                🎥 Watch Demo
            </button>
        </div>
    </div>

    <script>
        // Enhanced interactivity
        function animateCard(card) {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }, 100);
            setTimeout(() => {
                card.style.transform = 'translateY(-8px)';
            }, 300);
        }
        
        function celebrate() {
            // Create confetti effect
            const colors = ['#667eea', '#764ba2', '#a78bfa', '#ffffff'];
            for (let i = 0; i < 30; i++) {
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }
            console.log('🎉 Celebration activated!');
        }
        
        function createConfetti(color) {
            const confetti = document.createElement('div');
            confetti.style.cssText = \`
                position: fixed;
                width: 10px;
                height: 10px;
                background: \${color};
                top: -10px;
                left: \${Math.random() * 100}vw;
                z-index: 1000;
                border-radius: 50%;
                pointer-events: none;
                animation: fall 3s linear forwards;
            \`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
        
        function showDemo() {
            alert('🎬 Demo would start here! This is where you could showcase your features.');
        }
        
        // Animated counters
        function animateCounter(id, target) {
            const element = document.getElementById(id);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current) + '+';
                
                if (current >= target) {
                    element.textContent = target + '+';
                    clearInterval(timer);
                }
            }, 20);
        }
        
        // Initialize counters on load
        window.addEventListener('load', () => {
            setTimeout(() => {
                animateCounter('users', 1000);
                animateCounter('projects', 500);
                animateCounter('lines', 50000);
            }, 500);
        });
        
        // Add CSS animation for confetti
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes fall {
                0% { transform: translateY(-100vh) rotate(0deg); }
                100% { transform: translateY(100vh) rotate(360deg); }
            }
        \`;
        document.head.appendChild(style);
        
        console.log('🚀 Modern Web App loaded successfully!');
    </script>
</body>
</html>`);

  const [pythonOutput, setPythonOutput] = useState('');
  const [isRunningPython, setIsRunningPython] = useState(false);
  const [webConsole, setWebConsole] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isStandalone = location.pathname.startsWith('/live-editor');

  useEffect(() => {
    if (location.pathname.includes('/python')) {
      setActiveTab('python');
    } else {
      setActiveTab('web');
    }
  }, [location.pathname]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (isStandalone) {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const executePython = async () => {
    setIsRunningPython(true);
    setPythonOutput('Executing Python code...\n');
    
    // Simulate Python execution
    setTimeout(() => {
      const output = `Hello, Python Coder! 🚀

Fibonacci sequence:
F(0) = 0
F(1) = 1
F(2) = 1
F(3) = 2
F(4) = 3
F(5) = 5
F(6) = 8
F(7) = 13

Squares: [1, 4, 9, 16, 25]

Colors: {'red': '#FF0000', 'green': '#00FF00', 'blue': '#0000FF'}

✨ Happy coding! ✨`;
      
      setPythonOutput(output);
      setIsRunningPython(false);
      toast.success('Python code executed successfully!');
    }, 1500);
  };

  const runWebCode = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    
    doc.open();
    doc.write(htmlCode);
    doc.close();
    
    toast.success('Web code updated successfully!');
  };

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80';
      case 'tablet': return 'w-96';
      default: return 'w-full';
    }
  };

  return (
    <div className={`${isStandalone ? "min-h-screen bg-gray-50" : "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <Card className={`${isStandalone || isFullscreen ? "w-full max-w-7xl mx-auto my-4 h-[calc(100vh-2rem)] overflow-hidden" : "w-full max-w-7xl h-[90vh] overflow-hidden"} shadow-2xl border-0`}>
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <CodeIcon size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">Live Code Editor</h1>
                <p className="text-sm opacity-90">Build amazing applications with modern tools</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-indigo-600"
              >
                <PaletteIcon size={16} />
              </Button>
              <Button
                onClick={() => setIsFullscreen(!isFullscreen)}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-indigo-600"
              >
                {isFullscreen ? <MinimizeIcon size={16} /> : <MaximizeIcon size={16} />}
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-indigo-600"
              >
                {isStandalone ? <ArrowLeftIcon size={16} /> : <XIcon size={16} />}
                <span className="ml-2">{isStandalone ? 'Back' : 'Close'}</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 h-full bg-gray-50">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'python' | 'web')} className="h-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-white">
              <TabsTrigger value="web" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
                <EyeIcon size={16} />
                <span className="font-medium">Web Development</span>
              </TabsTrigger>
              <TabsTrigger value="python" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
                <CodeIcon size={16} />
                <span className="font-medium">Python Playground</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="web" className="h-full mt-0 p-6">
              <div className="flex flex-col h-full gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">HTML/CSS/JS Editor</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
                      <Button
                        onClick={() => setPreviewMode('desktop')}
                        variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                        size="sm"
                      >
                        <MonitorIcon size={16} />
                      </Button>
                      <Button
                        onClick={() => setPreviewMode('tablet')}
                        variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                        size="sm"
                      >
                        <TabletIcon size={16} />
                      </Button>
                      <Button
                        onClick={() => setPreviewMode('mobile')}
                        variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                        size="sm"
                      >
                        <SmartphoneIcon size={16} />
                      </Button>
                    </div>
                    <Button onClick={runWebCode} className="bg-green-600 hover:bg-green-700">
                      <PlayIcon size={16} className="mr-2" />
                      Run Code
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
                      Code Editor
                    </div>
                    <Sandpack
                      template="vanilla"
                      files={{
                        'index.html': htmlCode,
                      }}
                      options={{
                        showConsole: false,
                        showConsoleButton: false,
                        editorHeight: '500px',
                        showLineNumbers: true,
                        showInlineErrors: true,
                        showNavigator: false,
                        showTabs: false,
                      }}
                      theme={theme}
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium flex items-center justify-between">
                      <span>Live Preview</span>
                      <span className="text-xs opacity-75 capitalize">{previewMode} View</span>
                    </div>
                    <div className="p-4 bg-gray-100 h-[500px] flex items-center justify-center">
                      <div className={`${getPreviewWidth()} h-full bg-white rounded-lg shadow-inner overflow-hidden`}>
                        <iframe
                          ref={iframeRef}
                          className="w-full h-full border-0"
                          title="Web Preview"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="h-full mt-0 p-6">
              <div className="flex flex-col h-full gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Python Code Editor</h2>
                  <Button
                    onClick={executePython}
                    disabled={isRunningPython}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <PlayIcon size={16} className="mr-2" />
                    {isRunningPython ? 'Running...' : 'Run Python'}
                  </Button>
                </div>
                
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
                      Python Code
                    </div>
                    <Textarea
                      value={pythonCode}
                      onChange={(e) => setPythonCode(e.target.value)}
                      className="w-full h-[500px] p-4 font-mono text-sm resize-none border-0 focus:ring-0"
                      placeholder="Write your Python code here..."
                    />
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
                      Output Console
                    </div>
                    <pre className="w-full h-[500px] p-4 bg-gray-900 text-green-400 overflow-auto font-mono text-sm">
                      {pythonOutput || 'Click "Run Python" to see output...'}
                    </pre>
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

export default EnhancedLiveCodeEditor;
