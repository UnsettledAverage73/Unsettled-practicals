
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Zap, RotateCcw, Trophy, Play } from 'lucide-react';
import { RecursionGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface RecursionBotGameProps {
  onComplete?: (score: number) => void;
}

const RecursionBotGame: React.FC<RecursionBotGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<RecursionGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    a: 5,
    b: 3,
    callStack: [],
    currentLevel: 0
  });

  const [inputA, setInputA] = useState('5');
  const [inputB, setInputB] = useState('3');
  const [userPrediction, setUserPrediction] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const startGame = useCallback(() => {
    const a = parseInt(inputA) || 5;
    const b = parseInt(inputB) || 3;
    
    if (a < 0 || b < 0 || a > 20 || b > 20) {
      toast.error('Please enter numbers between 0 and 20!');
      return;
    }

    setGameState(prev => ({
      ...prev,
      a,
      b,
      callStack: [],
      currentLevel: 0,
      moves: 0,
      score: 0,
      isComplete: false
    }));
    
    setUserPrediction('');
    setIsAnimating(false);
    toast.success(`Starting recursive multiplication: ${a} × ${b}`);
  }, [inputA, inputB]);

  const nextStep = () => {
    if (isAnimating || gameState.isComplete) return;
    
    setIsAnimating(true);
    
    const { callStack, currentLevel, a, b } = gameState;
    
    // If we haven't started the recursion yet
    if (callStack.length === 0) {
      const newCallStack = [{ level: 0, a, b }];
      setGameState(prev => ({
        ...prev,
        callStack: newCallStack,
        currentLevel: 0,
        moves: prev.moves + 1
      }));
      
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }

    // Get the current call
    const currentCall = callStack[currentLevel];
    
    if (!currentCall) {
      setIsAnimating(false);
      return;
    }

    // Base case: if b is 0 or 1
    if (currentCall.b === 0) {
      const newCallStack = [...callStack];
      newCallStack[currentLevel] = { ...currentCall, result: 0 };
      
      setGameState(prev => ({
        ...prev,
        callStack: newCallStack,
        moves: prev.moves + 1,
        score: prev.score + 10
      }));
      
      // Start returning phase
      setTimeout(() => {
        returnFromRecursion();
      }, 1000);
      return;
    }
    
    if (currentCall.b === 1) {
      const newCallStack = [...callStack];
      newCallStack[currentLevel] = { ...currentCall, result: currentCall.a };
      
      setGameState(prev => ({
        ...prev,
        callStack: newCallStack,
        moves: prev.moves + 1,
        score: prev.score + 10
      }));
      
      // Start returning phase
      setTimeout(() => {
        returnFromRecursion();
      }, 1000);
      return;
    }

    // Recursive case: a * b = a + a * (b-1)
    if (currentCall.result === undefined) {
      const newCall = { level: currentLevel + 1, a: currentCall.a, b: currentCall.b - 1 };
      const newCallStack = [...callStack, newCall];
      
      setGameState(prev => ({
        ...prev,
        callStack: newCallStack,
        currentLevel: currentLevel + 1,
        moves: prev.moves + 1,
        score: prev.score + 5
      }));
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const returnFromRecursion = () => {
    const { callStack, currentLevel } = gameState;
    
    if (currentLevel === 0) {
      // We're at the base, calculation is complete
      const result = callStack[0].result;
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        score: prev.score + 50
      }));
      
      toast.success(`Recursion complete! ${gameState.a} × ${gameState.b} = ${result}`);
      onComplete?.(gameState.score + 50);
      setIsAnimating(false);
      return;
    }
    
    // Return to previous level
    const currentCall = callStack[currentLevel];
    const parentLevel = currentLevel - 1;
    const parentCall = callStack[parentLevel];
    
    if (currentCall.result !== undefined && parentCall) {
      const newCallStack = [...callStack];
      newCallStack[parentLevel] = {
        ...parentCall,
        result: parentCall.a + currentCall.result
      };
      
      // Remove the current call from stack
      newCallStack.splice(currentLevel, 1);
      
      setGameState(prev => ({
        ...prev,
        callStack: newCallStack,
        currentLevel: parentLevel,
        moves: prev.moves + 1,
        score: prev.score + 10
      }));
      
      setTimeout(() => {
        returnFromRecursion();
      }, 1000);
    }
  };

  const makePrediction = () => {
    const prediction = parseInt(userPrediction);
    const correctAnswer = gameState.a * gameState.b;
    
    if (prediction === correctAnswer) {
      setGameState(prev => ({ ...prev, score: prev.score + 20 }));
      toast.success(`Correct prediction! ${gameState.a} × ${gameState.b} = ${correctAnswer} (+20 points)`);
    } else {
      toast.error(`Wrong prediction. ${gameState.a} × ${gameState.b} = ${correctAnswer}, not ${prediction}`);
    }
  };

  const getBotColor = (level: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-red-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[level % colors.length];
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          Recursive Bot Multiplication
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Steps: {gameState.moves}</span>
          <span>Problem: {gameState.a} × {gameState.b}</span>
          <span>Call Stack: {gameState.callStack.length}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {gameState.callStack.length === 0 && (
          <div className="mb-6">
            <div className="flex justify-center gap-4 items-center mb-4">
              <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">A:</label>
                <Input
                  type="number"
                  value={inputA}
                  onChange={(e) => setInputA(e.target.value)}
                  className="w-16"
                  min="0"
                  max="20"
                />
              </div>
              <span className="text-xl">×</span>
              <div className="flex gap-2 items-center">
                <label className="text-sm font-medium">B:</label>
                <Input
                  type="number"
                  value={inputB}
                  onChange={(e) => setInputB(e.target.value)}
                  className="w-16"
                  min="0"
                  max="20"
                />
              </div>
              <Button onClick={startGame} className="bg-indigo-600 hover:bg-indigo-700">
                <Play className="w-4 h-4 mr-1" />
                Start Recursion
              </Button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <h3 className="font-semibold mb-2">How Recursive Multiplication Works</h3>
              <p className="text-sm text-gray-600">
                a × b = a + a × (b-1) until b becomes 0 or 1
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Example: 5 × 3 = 5 + 5 × 2 = 5 + (5 + 5 × 1) = 5 + (5 + 5) = 15
              </p>
            </div>
          </div>
        )}

        {gameState.callStack.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <Button 
                  onClick={nextStep} 
                  disabled={isAnimating || gameState.isComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  {gameState.isComplete ? 'Complete' : 'Next Step'}
                </Button>
                <Button onClick={startGame} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>
              
              {!gameState.isComplete && (
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={userPrediction}
                    onChange={(e) => setUserPrediction(e.target.value)}
                    placeholder="Predict result"
                    className="w-24"
                  />
                  <Button onClick={makePrediction} size="sm" variant="outline">
                    Predict
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-inner">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Recursive Call Stack
              </h4>
              
              <div className="space-y-3">
                {gameState.callStack.map((call, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg border-2 transition-all duration-500 ${
                      index === gameState.currentLevel 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-gray-200 bg-gray-50'
                    } ${isAnimating && index === gameState.currentLevel ? 'animate-pulse' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getBotColor(index)}`}>
                      <Bot className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">
                        Level {call.level}: multiply({call.a}, {call.b})
                      </div>
                      <div className="text-sm text-gray-600">
                        {call.b === 0 ? 'Base case: return 0' :
                         call.b === 1 ? `Base case: return ${call.a}` :
                         call.result !== undefined ? `Result: ${call.result}` :
                         `Computing: ${call.a} + multiply(${call.a}, ${call.b - 1})`}
                      </div>
                    </div>
                    
                    {call.result !== undefined && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold">
                        = {call.result}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState.isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Recursion Complete!</h3>
            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="font-medium">Final Result</p>
                <p className="text-2xl font-bold">{gameState.a} × {gameState.b} = {gameState.callStack[0]?.result}</p>
              </div>
              <div>
                <p className="font-medium">Recursive Calls</p>
                <p className="text-lg">{gameState.b + 1}</p>
              </div>
              <div>
                <p className="font-medium">Final Score</p>
                <p className="text-lg">{gameState.score}</p>
              </div>
            </div>
            <Button onClick={startGame} variant="outline">
              Try New Problem
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Recursion Formula</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>• multiply(a, 0) = 0</p>
              <p>• multiply(a, 1) = a</p>
              <p>• multiply(a, b) = a + multiply(a, b-1)</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Algorithm Info</h4>
            <p className="text-xs text-gray-600">Time: O(b)</p>
            <p className="text-xs text-gray-600">Space: O(b) - call stack</p>
            <p className="text-xs text-gray-600 mt-1">
              This demonstrates how recursion builds up a call stack and then unwinds.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecursionBotGame;
