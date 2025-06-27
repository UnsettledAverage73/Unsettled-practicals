
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code, Play, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ScriptChallenge {
  title: string;
  description: string;
  expectedOutput: string;
  hints: string[];
  solution: string;
}

const ShellScriptingGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [currentScript, setCurrentScript] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [output, setOutput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const challenges: ScriptChallenge[] = [
    {
      title: "Hello World Script",
      description: "Write a shell script that prints 'Hello, World!'",
      expectedOutput: "Hello, World!",
      hints: ["Use echo command", "Don't forget the shebang #!/bin/bash"],
      solution: "#!/bin/bash\necho \"Hello, World!\""
    },
    {
      title: "Variable Assignment",
      description: "Create a variable called 'name' with value 'Linux' and print 'Welcome to Linux'",
      expectedOutput: "Welcome to Linux",
      hints: ["Use name=\"Linux\"", "Use echo \"Welcome to $name\""],
      solution: "#!/bin/bash\nname=\"Linux\"\necho \"Welcome to $name\""
    },
    {
      title: "Loop Script",
      description: "Write a for loop that prints numbers 1 to 3",
      expectedOutput: "1\n2\n3",
      hints: ["Use for i in {1..3}", "Use echo $i inside the loop"],
      solution: "#!/bin/bash\nfor i in {1..3}\ndo\n  echo $i\ndone"
    },
    {
      title: "Conditional Script",
      description: "Write an if statement that checks if a number is greater than 5 (use number=7)",
      expectedOutput: "Number is greater than 5",
      hints: ["Use if [ $number -gt 5 ]", "Use echo inside if block"],
      solution: "#!/bin/bash\nnumber=7\nif [ $number -gt 5 ]\nthen\n  echo \"Number is greater than 5\"\nfi"
    },
    {
      title: "Function Script",
      description: "Create a function called 'greet' that takes a name and prints 'Hello, [name]!' Call it with 'User'",
      expectedOutput: "Hello, User!",
      hints: ["Define function with greet() { }", "Call function with greet User"],
      solution: "#!/bin/bash\ngreet() {\n  echo \"Hello, $1!\"\n}\ngreet User"
    }
  ];

  const executeScript = () => {
    // Simple script execution simulation
    const script = currentScript.toLowerCase().trim();
    const challenge = challenges[currentChallenge];
    
    let simulatedOutput = '';
    let isCorrect = false;

    // Basic simulation logic
    if (script.includes('echo "hello, world!"') || script.includes("echo 'hello, world!'")) {
      simulatedOutput = 'Hello, World!';
      isCorrect = currentChallenge === 0;
    } else if (script.includes('name=') && script.includes('echo') && script.includes('$name')) {
      simulatedOutput = 'Welcome to Linux';
      isCorrect = currentChallenge === 1;
    } else if (script.includes('for') && script.includes('echo $i')) {
      simulatedOutput = '1\n2\n3';
      isCorrect = currentChallenge === 2;
    } else if (script.includes('if') && script.includes('-gt') && script.includes('number')) {
      simulatedOutput = 'Number is greater than 5';
      isCorrect = currentChallenge === 3;
    } else if (script.includes('greet()') && script.includes('function') || (script.includes('greet') && script.includes('hello'))) {
      simulatedOutput = 'Hello, User!';
      isCorrect = currentChallenge === 4;
    } else {
      simulatedOutput = 'Script execution failed or no output';
    }

    setOutput(simulatedOutput);
    setShowResult(true);

    if (isCorrect) {
      setScore(score + 20);
      setTimeout(() => {
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
          setCurrentScript('#!/bin/bash\n');
          setOutput('');
          setShowResult(false);
        } else {
          setGameComplete(true);
          onComplete(score + 20);
        }
      }, 3000);
    }
  };

  const showSolution = () => {
    setCurrentScript(challenges[currentChallenge].solution);
  };

  const resetGame = () => {
    setCurrentScript('#!/bin/bash\n');
    setCurrentChallenge(0);
    setScore(0);
    setOutput('');
    setShowResult(false);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Code className="text-purple-500" />
            Shell Scripting Mastery Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-purple-600">{score}/100</div>
          <p className="text-lg">
            {score >= 80 ? "Excellent! You're a shell scripting expert!" :
             score >= 60 ? "Good work! Keep practicing shell scripting." :
             "Keep learning to master shell scripting!"}
          </p>
          <Button onClick={resetGame} className="bg-purple-600 hover:bg-purple-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Challenge Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="text-purple-500" />
            Shell Scripting Challenge {currentChallenge + 1} of {challenges.length}
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <h3 className="font-bold text-purple-800">{challenges[currentChallenge].title}</h3>
            <p className="text-purple-700">{challenges[currentChallenge].description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Hints:</h4>
            {challenges[currentChallenge].hints.map((hint, index) => (
              <Badge key={index} variant="secondary" className="block w-fit">
                💡 {hint}
              </Badge>
            ))}
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h4 className="font-semibold text-green-800">Expected Output:</h4>
            <pre className="text-green-700 font-mono text-sm whitespace-pre-wrap">
              {challenges[currentChallenge].expectedOutput}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Script Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="text-purple-500" />
              Shell Script Editor
            </div>
            <div className="flex gap-2">
              <Button onClick={showSolution} variant="outline" size="sm">
                Show Solution
              </Button>
              <Button onClick={executeScript} className="bg-purple-600 hover:bg-purple-700">
                <Play className="mr-2 h-4 w-4" />
                Run Script
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={currentScript}
            onChange={(e) => setCurrentScript(e.target.value)}
            placeholder="Write your shell script here..."
            className="font-mono text-sm h-48 bg-gray-900 text-green-400 border-gray-700"
          />
        </CardContent>
      </Card>

      {/* Output */}
      {showResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {output === challenges[currentChallenge].expectedOutput ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              Script Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="text-gray-400">$ bash script.sh</div>
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
            
            {output === challenges[currentChallenge].expectedOutput ? (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-600 h-5 w-5" />
                  <span className="font-semibold text-green-800">Perfect! Your script works correctly! +20 points</span>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="text-red-600 h-5 w-5" />
                  <span className="font-semibold text-red-800">Not quite right. Check the hints and try again!</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="text-center text-gray-600">
        Score: {score}/100 | Challenge {currentChallenge + 1} of {challenges.length}
      </div>
    </div>
  );
};

export default ShellScriptingGame;
