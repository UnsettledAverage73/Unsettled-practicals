
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { cSkillPracticals } from '@/data/cSkillPracticals';
import Footer from '@/components/Footer';
import GameComponent from '@/components/games/GameComponent';

// Import the tab content components
import DescriptionTab from '@/components/practical-tabs/DescriptionTab';
import TheoryTab from '@/components/practical-tabs/TheoryTab';
import CodeTab from '@/components/practical-tabs/CodeTab';
import InteractiveTab from '@/components/practical-tabs/InteractiveTab';
import ConclusionTab from '@/components/practical-tabs/ConclusionTab';
import PracticalHeader from '@/components/PracticalHeader';

const CSkillPracticalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const practicalId = parseInt(id || "0");
  
  const practical = cSkillPracticals.find(p => p.id === practicalId);
  
  if (!practical) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl text-red-500">Practical not found!</h1>
        <p className="mt-4">
          <Link to="/c-skill" className="text-blue-500 underline">
            Return to C Skill Practicals
          </Link>
        </p>
      </div>
    );
  }
  
  const handleGameComplete = (score: number) => {
    toast({
      title: "Game Completed!",
      description: `Great job! You scored ${score} points.`,
    });
  };

  // Generate sample code based on practical type
  const getSampleCode = (practicalId: number) => {
    switch (practicalId) {
      case 1:
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Development Fundamentals</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .highlight { background-color: yellow; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Web Development!</h1>
        <p>This demonstrates the fundamentals of <span class="highlight">HTML</span> and <span class="highlight">CSS</span>.</p>
        <button onclick="showMessage()">Click me!</button>
        <div id="message"></div>
    </div>
    
    <script>
        function showMessage() {
            document.getElementById('message').innerHTML = '<p style="color: green; margin-top: 10px;">JavaScript is working! 🎉</p>';
        }
    </script>
</body>
</html>`;
      case 7:
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Today's Date Display</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .date-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        .date-display {
            font-size: 18px;
            margin: 10px 0;
            padding: 10px;
            background-color: #f0f8ff;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="date-container">
        <h1>Today's Date in Different Formats</h1>
        <button onclick="displayDates()">Show Current Date</button>
        <div id="dateOutput"></div>
    </div>
    
    <script>
        function displayDates() {
            const now = new Date();
            const output = document.getElementById('dateOutput');
            
            output.innerHTML = \`
                <div class="date-display"><strong>Standard Format:</strong> \${now.toString()}</div>
                <div class="date-display"><strong>Date Only:</strong> \${now.toDateString()}</div>
                <div class="date-display"><strong>Time Only:</strong> \${now.toTimeString()}</div>
                <div class="date-display"><strong>Locale Format:</strong> \${now.toLocaleString()}</div>
                <div class="date-display"><strong>Custom Format:</strong> \${now.getDate()}/\${now.getMonth() + 1}/\${now.getFullYear()}</div>
            \`;
        }
        
        // Display dates automatically when page loads
        displayDates();
    </script>
</body>
</html>`;
      case 8:
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .calculator {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .display {
            width: 100%;
            height: 60px;
            font-size: 24px;
            text-align: right;
            margin-bottom: 10px;
            padding: 0 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 50px;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
        }
        button:hover { background-color: #e9e9e9; }
        .operator { background-color: #007bff; color: white; }
        .equals { background-color: #28a745; color: white; }
        .clear { background-color: #dc3545; color: white; }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" id="display" readonly>
        <div class="buttons">
            <button class="clear" onclick="clearDisplay()">C</button>
            <button onclick="deleteLast()">⌫</button>
            <button class="operator" onclick="appendToDisplay('/')">/</button>
            <button class="operator" onclick="appendToDisplay('*')">*</button>
            
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button class="operator" onclick="appendToDisplay('-')">-</button>
            
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button class="operator" onclick="appendToDisplay('+')">+</button>
            
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button class="equals" onclick="calculate()" rowspan="2">=</button>
            
            <button onclick="appendToDisplay('0')" colspan="2" style="grid-column: span 2;">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
    
    <script>
        function appendToDisplay(value) {
            document.getElementById('display').value += value;
        }
        
        function clearDisplay() {
            document.getElementById('display').value = '';
        }
        
        function deleteLast() {
            const display = document.getElementById('display');
            display.value = display.value.slice(0, -1);
        }
        
        function calculate() {
            const display = document.getElementById('display');
            try {
                display.value = eval(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        }
    </script>
</body>
</html>`;
      default:
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Code Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Interactive Code Example</h1>
        <p>Edit this code and see the changes live!</p>
        <button onclick="alert('Hello from JavaScript!')">Click Me</button>
    </div>
</body>
</html>`;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <Link to="/c-skill" className="text-[#9b87f5] hover:underline mb-4 inline-block">
          &larr; Back to C Skill Practicals
        </Link>
        
        <PracticalHeader id={practical.id} title={practical.title} aim={practical.aim} />
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            {practical.theory && <TabsTrigger value="theory">Theory</TabsTrigger>}
            {practical.code && <TabsTrigger value="code">Code</TabsTrigger>}
            {practical.code && <TabsTrigger value="interactive">🚀 Try It Live</TabsTrigger>}
            <TabsTrigger value="game">🎮 Game</TabsTrigger>
            <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <DescriptionTab 
              description={practical.description}
              facilities={practical.facilities}
              scope={practical.scope}
            />
          </TabsContent>
          
          {practical.theory && (
            <TabsContent value="theory">
              <TheoryTab theory={practical.theory} />
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="code">
              <CodeTab 
                code={practical.code} 
                language={practical.id <= 6 ? "html" : "javascript"}
                title={practical.title}
              />
            </TabsContent>
          )}
          
          {practical.code && (
            <TabsContent value="interactive">
              <InteractiveTab 
                code={getSampleCode(practical.id)}
                title={practical.title}
              />
            </TabsContent>
          )}
          
          <TabsContent value="game">
            <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Interactive Learning Game</h2>
              <GameComponent
                gameType="coding"
                practicalId={practical.id}
                practicalTitle={practical.title}
                onComplete={handleGameComplete}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="conclusion">
            <ConclusionTab conclusion={practical.conclusion} />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CSkillPracticalDetails;
