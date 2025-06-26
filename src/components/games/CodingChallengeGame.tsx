
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { GameProps } from '@/types/games';
import { toast } from '@/components/ui/sonner';

interface Challenge {
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { input: string; expected: string }[];
}

const CodingChallengeGame: React.FC<GameProps> = ({ practicalId, practicalTitle, onComplete }) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const getChallengeForPractical = (id: number): Challenge => {
    const challenges = {
      1: {
        title: 'HTML Structure Challenge',
        description: 'Create a basic HTML page with proper structure',
        starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <!-- Add title here -->\n</head>\n<body>\n  <!-- Add content here -->\n</body>\n</html>',
        solution: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n  <p>Hello World!</p>\n</body>\n</html>',
        testCases: [
          { input: 'Check title tag', expected: 'Contains <title>' },
          { input: 'Check h1 tag', expected: 'Contains <h1>' }
        ]
      },
      2: {
        title: 'CSS Styling Challenge',
        description: 'Style a button with CSS',
        starterCode: '<style>\n.btn {\n  /* Add your styles here */\n}\n</style>\n<button class="btn">Click Me</button>',
        solution: '<style>\n.btn {\n  background-color: blue;\n  color: white;\n  padding: 10px;\n  border: none;\n  border-radius: 5px;\n}\n</style>\n<button class="btn">Click Me</button>',
        testCases: [
          { input: 'Check background', expected: 'Has background-color' },
          { input: 'Check padding', expected: 'Has padding' }
        ]
      },
      default: {
        title: 'JavaScript Function Challenge',
        description: 'Create a function that adds two numbers',
        starterCode: 'function addNumbers(a, b) {\n  // Your code here\n}',
        solution: 'function addNumbers(a, b) {\n  return a + b;\n}',
        testCases: [
          { input: 'addNumbers(2, 3)', expected: '5' },
          { input: 'addNumbers(10, 5)', expected: '15' }
        ]
      }
    };
    return challenges[id as keyof typeof challenges] || challenges.default;
  };

  const initializeGame = () => {
    const gameChallenge = getChallengeForPractical(practicalId);
    setChallenge(gameChallenge);
    setUserCode(gameChallenge.starterCode);
    setGameStarted(true);
    setScore(0);
    setTestResults([]);
  };

  const runTests = () => {
    if (!challenge) return;
    
    const results: string[] = [];
    let passedTests = 0;
    
    // Simple validation for HTML/CSS/JS
    for (const testCase of challenge.testCases) {
      const passed = userCode.toLowerCase().includes(testCase.expected.toLowerCase()) ||
                    userCode.includes('return a + b'); // Special case for JS function
      
      if (passed) {
        results.push(`✅ ${testCase.input}: PASSED`);
        passedTests++;
      } else {
        results.push(`❌ ${testCase.input}: FAILED`);
      }
    }
    
    setTestResults(results);
    const newScore = (passedTests / challenge.testCases.length) * 100;
    setScore(newScore);
    
    if (passedTests === challenge.testCases.length) {
      toast.success(`All tests passed! Score: ${newScore}`);
      onComplete?.(newScore);
    } else {
      toast.error(`${passedTests}/${challenge.testCases.length} tests passed`);
    }
  };

  const showSolution = () => {
    if (challenge) {
      setUserCode(challenge.solution);
      toast.info('Solution loaded. Try to understand the code!');
    }
  };

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Coding Challenge - {practicalTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Test your coding skills with interactive challenges!</p>
          <Button onClick={initializeGame} className="bg-primary">
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!challenge) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{challenge.title}</span>
          <div className="text-sm">Score: {score.toFixed(0)}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Challenge:</h3>
          <p className="text-gray-600">{challenge.description}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Your Code:</h3>
          <Textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="font-mono text-sm min-h-[200px]"
          />
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button onClick={runTests} className="bg-green-600 hover:bg-green-700">
            Run Tests
          </Button>
          <Button onClick={showSolution} variant="outline">
            Show Solution
          </Button>
        </div>
        
        {testResults.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} className="font-mono text-sm">
                {result}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodingChallengeGame;
