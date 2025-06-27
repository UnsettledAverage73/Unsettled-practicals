
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Target, RotateCcw, Trophy, Zap } from 'lucide-react';
import { BinarySearchGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface BinarySearchGameProps {
  onComplete?: (score: number) => void;
}

const BinarySearchGame: React.FC<BinarySearchGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<BinarySearchGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
    target: 15,
    left: 0,
    right: 14,
    mid: 7,
    found: false,
    steps: []
  });

  const [userGuess, setUserGuess] = useState<string>('');
  const [gameMode, setGameMode] = useState<'manual' | 'auto'>('manual');
  const [isSearching, setIsSearching] = useState(false);

  const generateNewGame = useCallback(() => {
    const arraySize = 10 + gameState.level * 5;
    const sortedArray = Array.from({ length: arraySize }, (_, i) => (i + 1) * 2 - 1);
    const randomTarget = sortedArray[Math.floor(Math.random() * sortedArray.length)];
    
    setGameState(prev => ({
      ...prev,
      array: sortedArray,
      target: randomTarget,
      left: 0,
      right: sortedArray.length - 1,
      mid: Math.floor((sortedArray.length - 1) / 2),
      found: false,
      moves: 0,
      score: 0,
      isComplete: false,
      steps: [`Searching for ${randomTarget} in array of size ${sortedArray.length}`]
    }));
    
    setUserGuess('');
    setIsSearching(false);
  }, [gameState.level]);

  const makeGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess)) {
      toast.error('Please enter a valid number!');
      return;
    }

    const { array, left, right, target } = gameState;
    const correctMid = Math.floor((left + right) / 2);
    const midValue = array[correctMid];
    
    let points = 0;
    let newStep = '';
    
    if (guess === correctMid) {
      points = 20;
      newStep = `✓ Correct! Mid index: ${correctMid}, Value: ${midValue}`;
      toast.success(`Correct guess! +${points} points`);
    } else {
      points = -5;
      newStep = `✗ Wrong guess. Mid index should be: ${correctMid}, Value: ${midValue}`;
      toast.error('Wrong guess! Try again.');
    }

    const newSteps = [...gameState.steps, newStep];
    let newLeft = left;
    let newRight = right;
    let found = false;
    let isComplete = false;

    if (midValue === target) {
      found = true;
      isComplete = true;
      newSteps.push(`🎯 Target ${target} found at index ${correctMid}!`);
      const bonusPoints = Math.max(0, 100 - gameState.moves * 10);
      points += bonusPoints;
      toast.success(`Target found! Bonus: +${bonusPoints} points`);
      onComplete?.(gameState.score + points);
    } else if (midValue < target) {
      newLeft = correctMid + 1;
      newSteps.push(`Target ${target} > ${midValue}, search right half`);
    } else {
      newRight = correctMid - 1;
      newSteps.push(`Target ${target} < ${midValue}, search left half`);
    }

    const newMid = newLeft <= newRight ? Math.floor((newLeft + newRight) / 2) : -1;

    setGameState(prev => ({
      ...prev,
      left: newLeft,
      right: newRight,
      mid: newMid,
      found,
      isComplete,
      moves: prev.moves + 1,
      score: prev.score + points,
      steps: newSteps
    }));

    setUserGuess('');

    if (newLeft > newRight && !found) {
      toast.error('Target not found in array!');
      setGameState(prev => ({ ...prev, isComplete: true }));
    }
  };

  const autoStep = () => {
    const { array, left, right, target } = gameState;
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];
    
    let newLeft = left;
    let newRight = right;
    let found = false;
    let isComplete = false;
    
    const newSteps = [...gameState.steps, `Checking index ${mid}: ${midValue}`];
    
    if (midValue === target) {
      found = true;
      isComplete = true;
      newSteps.push(`🎯 Target ${target} found at index ${mid}!`);
      toast.success('Target found!');
      onComplete?.(gameState.score + 50);
    } else if (midValue < target) {
      newLeft = mid + 1;
      newSteps.push(`${midValue} < ${target}, search right half [${newLeft}, ${right}]`);
    } else {
      newRight = mid - 1;
      newSteps.push(`${midValue} > ${target}, search left half [${left}, ${newRight}]`);
    }

    const newMid = newLeft <= newRight ? Math.floor((newLeft + newRight) / 2) : -1;

    setGameState(prev => ({
      ...prev,
      left: newLeft,
      right: newRight,
      mid: newMid,
      found,
      isComplete,
      moves: prev.moves + 1,
      score: prev.score + 10,
      steps: newSteps
    }));

    if (newLeft > newRight && !found) {
      newSteps.push('Target not found in array!');
      setGameState(prev => ({ ...prev, isComplete: true, steps: newSteps }));
    }
  };

  const getElementStyle = (index: number) => {
    const { left, right, mid, found } = gameState;
    
    if (found && index === mid) {
      return 'bg-green-500 text-white animate-pulse';
    } else if (index === mid) {
      return 'bg-yellow-400 text-black border-2 border-yellow-600';
    } else if (index >= left && index <= right) {
      return 'bg-blue-100 text-blue-800 border-blue-300';
    } else {
      return 'bg-gray-200 text-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Search className="w-6 h-6" />
          Binary Search Detective
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Steps: {gameState.moves}</span>
          <span>Target: {gameState.target}</span>
          <span>Range: [{gameState.left}, {gameState.right}]</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button onClick={generateNewGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                New Game
              </Button>
              <Button
                onClick={() => setGameMode(gameMode === 'manual' ? 'auto' : 'manual')}
                variant="outline"
              >
                Mode: {gameMode === 'manual' ? 'Manual' : 'Auto'}
              </Button>
            </div>
            <div className="text-sm">
              <span className="bg-yellow-100 px-2 py-1 rounded mr-2">Current Mid</span>
              <span className="bg-blue-100 px-2 py-1 rounded mr-2">Search Range</span>
              <span className="bg-green-100 px-2 py-1 rounded">Found</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-inner mb-4">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {gameState.array.map((value, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${getElementStyle(index)}`}
                >
                  <div className="text-center">
                    <div>{value}</div>
                    <div className="text-xs opacity-60">{index}</div>
                  </div>
                </div>
              ))}
            </div>

            {!gameState.isComplete && (
              <div className="text-center mb-4">
                {gameMode === 'manual' ? (
                  <div className="flex justify-center gap-2 items-center">
                    <Input
                      type="number"
                      value={userGuess}
                      onChange={(e) => setUserGuess(e.target.value)}
                      placeholder="Guess the mid index"
                      className="w-32"
                      onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
                    />
                    <Button onClick={makeGuess} className="bg-green-600 hover:bg-green-700">
                      <Target className="w-4 h-4 mr-1" />
                      Guess Mid
                    </Button>
                  </div>
                ) : (
                  <Button onClick={autoStep} className="bg-blue-600 hover:bg-blue-700">
                    <Zap className="w-4 h-4 mr-1" />
                    Next Step
                  </Button>
                )}
              </div>
            )}

            <div className="bg-gray-50 rounded p-3 max-h-32 overflow-y-auto">
              <h4 className="font-medium mb-2">Search Steps:</h4>
              {gameState.steps.map((step, index) => (
                <div key={index} className="text-sm py-1 border-b border-gray-200 last:border-0">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {gameState.found ? 'Target Found!' : 'Search Complete!'}
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="font-medium">Steps Used</p>
                  <p className="text-lg">{gameState.moves}</p>
                </div>
                <div>
                  <p className="font-medium">Efficiency</p>
                  <p className="text-lg">
                    {gameState.moves <= Math.ceil(Math.log2(gameState.array.length)) ? 'Optimal' : 'Good'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Final Score</p>
                  <p className="text-lg">{gameState.score}</p>
                </div>
              </div>
              <Button onClick={generateNewGame} variant="outline">
                Play Again
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Algorithm Info</h4>
            <p className="text-xs text-gray-600">Time: O(log n)</p>
            <p className="text-xs text-gray-600">Space: O(1)</p>
            <p className="text-xs text-gray-600 mt-1">
              Max steps for array of size {gameState.array.length}: {Math.ceil(Math.log2(gameState.array.length))}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Game Mode</h4>
            <p className="text-xs text-gray-600">
              {gameMode === 'manual' 
                ? 'Manual: Predict the mid index at each step'
                : 'Auto: Watch the algorithm work step by step'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BinarySearchGame;
