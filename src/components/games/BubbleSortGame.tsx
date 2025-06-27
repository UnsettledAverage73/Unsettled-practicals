
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Trophy, Zap } from 'lucide-react';
import { SortingGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface BubbleSortGameProps {
  onComplete?: (score: number) => void;
}

const BubbleSortGame: React.FC<BubbleSortGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<SortingGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    array: [64, 34, 25, 12, 22, 11, 90],
    currentStep: 0,
    isAnimating: false,
    comparisons: 0,
    swaps: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [animatingIndices, setAnimatingIndices] = useState<number[]>([]);
  const [userPrediction, setUserPrediction] = useState<number | null>(null);
  const [showPrediction, setShowPrediction] = useState(false);

  const generateRandomArray = useCallback(() => {
    const size = 5 + gameState.level;
    const array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    return array;
  }, [gameState.level]);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      array: generateRandomArray(),
      currentStep: 0,
      isAnimating: false,
      comparisons: 0,
      swaps: 0,
      isComplete: false
    }));
    setIsPlaying(false);
    setAnimatingIndices([]);
    setUserPrediction(null);
    setShowPrediction(false);
  };

  const nextStep = async () => {
    if (gameState.isAnimating || gameState.isComplete) return;

    const { array, currentStep } = gameState;
    const n = array.length;
    let newArray = [...array];
    let swapped = false;
    let newComparisons = gameState.comparisons;
    let newSwaps = gameState.swaps;

    // Find the next comparison
    let i = 0;
    let j = 0;
    let stepCount = 0;

    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (stepCount === currentStep) {
          newComparisons++;
          setAnimatingIndices([j, j + 1]);
          
          if (newArray[j] > newArray[j + 1]) {
            // Swap elements
            [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
            newSwaps++;
            swapped = true;
            
            // Check user prediction
            if (userPrediction === j) {
              setGameState(prev => ({ ...prev, score: prev.score + 10 }));
              toast.success('Correct prediction! +10 points');
            } else if (userPrediction !== null) {
              toast.error('Wrong prediction. Try again!');
            }
          }

          setGameState(prev => ({
            ...prev,
            array: newArray,
            currentStep: currentStep + 1,
            isAnimating: true,
            comparisons: newComparisons,
            swaps: newSwaps,
            moves: prev.moves + 1
          }));

          setTimeout(() => {
            setAnimatingIndices([]);
            setGameState(prev => ({ ...prev, isAnimating: false }));
            setUserPrediction(null);
            setShowPrediction(false);
          }, 1000);

          return;
        }
        stepCount++;
      }
    }

    // If we reach here, sorting is complete
    if (!swapped || stepCount === currentStep) {
      const finalScore = gameState.score + Math.max(0, 100 - gameState.moves);
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        score: finalScore
      }));
      toast.success(`Sorting complete! Final score: ${finalScore}`);
      onComplete?.(finalScore);
    }
  };

  const predictNextSwap = (index: number) => {
    if (gameState.isAnimating) return;
    setUserPrediction(index);
    setShowPrediction(true);
  };

  const getBarHeight = (value: number) => {
    const maxValue = Math.max(...gameState.array);
    return (value / maxValue) * 200;
  };

  const getBarColor = (index: number) => {
    if (animatingIndices.includes(index)) {
      return 'bg-red-500 animate-pulse';
    }
    if (userPrediction === index && showPrediction) {
      return 'bg-yellow-500';
    }
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Bubble Sort Racing Game
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Moves: {gameState.moves}</span>
          <span>Comparisons: {gameState.comparisons}</span>
          <span>Swaps: {gameState.swaps}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Array Visualization</h3>
            <div className="flex gap-2">
              <Button onClick={nextStep} disabled={gameState.isAnimating || gameState.isComplete}>
                <Play className="w-4 h-4 mr-1" />
                Next Step
              </Button>
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          <div className="flex items-end justify-center gap-2 mb-6 p-4 bg-white rounded-lg shadow-inner">
            {gameState.array.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => predictNextSwap(index)}
              >
                <div
                  className={`w-12 transition-all duration-500 rounded-t ${getBarColor(index)} group-hover:scale-105`}
                  style={{ height: `${getBarHeight(value)}px` }}
                />
                <div className="mt-2 text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                  {value}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {index}
                </div>
              </div>
            ))}
          </div>

          {!gameState.isComplete && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Predict the next swap:</strong> Click on the bar you think will be swapped next to earn bonus points!
              </p>
            </div>
          )}

          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-green-800">Congratulations!</h3>
              <p className="text-green-700">
                Array sorted in {gameState.moves} moves with {gameState.swaps} swaps!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Final Score: {gameState.score} points
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Algorithm Info</h4>
            <p>Time Complexity: O(n²)</p>
            <p>Space Complexity: O(1)</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Game Stats</h4>
            <p>Efficiency: {gameState.moves > 0 ? Math.round((gameState.swaps / gameState.moves) * 100) : 0}%</p>
            <p>Prediction Rate: {gameState.score > 0 ? 'Good' : 'Try predicting!'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BubbleSortGame;
