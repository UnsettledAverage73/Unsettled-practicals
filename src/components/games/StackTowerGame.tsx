
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Layers, RotateCcw } from 'lucide-react';
import { StackGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface StackTowerGameProps {
  onComplete?: (score: number) => void;
}

const StackTowerGame: React.FC<StackTowerGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<StackGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    stack: [],
    sequence: [],
    userGuess: [],
    showStack: true,
    phase: 'memorize'
  });

  const [countdown, setCountdown] = useState(5);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500'
  ];

  const generateSequence = () => {
    const length = 3 + gameState.level;
    const sequence = Array.from({ length }, () => Math.floor(Math.random() * 50) + 1);
    return sequence;
  };

  const startNewRound = () => {
    const sequence = generateSequence();
    const stack = [...sequence];
    
    setGameState(prev => ({
      ...prev,
      sequence,
      stack,
      userGuess: [],
      showStack: true,
      phase: 'memorize',
      isComplete: false
    }));
    setCountdown(5);
    setSelectedValue(null);
  };

  const pushToStack = (value: number) => {
    if (gameState.phase !== 'memorize') return;
    
    setGameState(prev => ({
      ...prev,
      stack: [...prev.stack, value],
      moves: prev.moves + 1
    }));
    toast.success(`Pushed ${value} to stack`);
  };

  const popFromStack = () => {
    if (gameState.stack.length === 0) {
      toast.error('Stack is empty!');
      return;
    }

    const poppedValue = gameState.stack[gameState.stack.length - 1];
    
    if (gameState.phase === 'memorize') {
      setGameState(prev => ({
        ...prev,
        stack: prev.stack.slice(0, -1),
        moves: prev.moves + 1
      }));
      toast.success(`Popped ${poppedValue} from stack`);
    } else if (gameState.phase === 'guess') {
      const expectedValue = gameState.sequence[gameState.sequence.length - 1 - gameState.userGuess.length];
      
      if (poppedValue === expectedValue) {
        const newGuess = [...gameState.userGuess, poppedValue];
        setGameState(prev => ({
          ...prev,
          userGuess: newGuess,
          moves: prev.moves + 1,
          score: prev.score + 10
        }));
        toast.success(`Correct! +10 points`);

        if (newGuess.length === gameState.sequence.length) {
          const bonus = Math.max(0, 50 - gameState.moves);
          const finalScore = gameState.score + 10 + bonus;
          setGameState(prev => ({
            ...prev,
            isComplete: true,
            score: finalScore
          }));
          toast.success(`Round complete! Bonus: ${bonus} points`);
          onComplete?.(finalScore);
        }
      } else {
        toast.error(`Wrong! Expected ${expectedValue}, got ${poppedValue}`);
        setGameState(prev => ({
          ...prev,
          moves: prev.moves + 1,
          score: Math.max(0, prev.score - 5)
        }));
      }
    }
  };

  const startHiddenPhase = () => {
    setGameState(prev => ({
      ...prev,
      showStack: false,
      phase: 'hidden'
    }));
    setCountdown(3);
  };

  const startGuessPhase = () => {
    setGameState(prev => ({
      ...prev,
      phase: 'guess'
    }));
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (gameState.phase === 'memorize' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState.phase === 'memorize' && countdown === 0) {
      startHiddenPhase();
    }
  }, [countdown, gameState.phase]);

  useEffect(() => {
    if (gameState.phase === 'hidden' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState.phase === 'hidden' && countdown === 0) {
      startGuessPhase();
    }
  }, [countdown, gameState.phase]);

  const getPhaseMessage = () => {
    switch (gameState.phase) {
      case 'memorize':
        return `Memorize the stack! Time left: ${countdown}s`;
      case 'hidden':
        return `Get ready to guess! Starting in: ${countdown}s`;
      case 'guess':
        return 'Pop elements in the correct order (LIFO)!';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Layers className="w-6 h-6" />
          Stack Tower Memory Challenge
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Moves: {gameState.moves}</span>
          <span>Level: {gameState.level}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-2">{getPhaseMessage()}</h3>
            {gameState.phase === 'memorize' && (
              <p className="text-sm text-gray-600">
                Remember the order of elements in the stack. You'll need to pop them in LIFO order!
              </p>
            )}
          </div>
        </div>

        {/* Stack Visualization */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col-reverse items-center bg-gray-100 p-4 rounded-lg min-h-[300px] justify-end">
            <div className="w-20 h-4 bg-gray-400 rounded-b-md mb-2">
              <div className="text-xs text-center text-white font-bold">Stack</div>
            </div>
            
            {gameState.showStack || gameState.phase === 'memorize' ? (
              gameState.stack.map((value, index) => (
                <div
                  key={index}
                  className={`w-16 h-12 m-1 rounded flex items-center justify-center text-white font-bold shadow-md transform transition-all duration-300 hover:scale-105 ${
                    colors[value % colors.length]
                  }`}
                  style={{
                    zIndex: gameState.stack.length - index
                  }}
                >
                  {value}
                </div>
              ))
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-gray-500" />
              </div>
            )}
            
            {gameState.stack.length === 0 && (
              <div className="text-gray-500 text-sm">Empty Stack</div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          {gameState.phase === 'memorize' && (
            <>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={selectedValue || ''}
                  onChange={(e) => setSelectedValue(parseInt(e.target.value) || null)}
                  placeholder="Value"
                  className="w-20 px-2 py-1 border rounded"
                />
                <Button 
                  onClick={() => selectedValue && pushToStack(selectedValue)}
                  disabled={!selectedValue}
                >
                  Push
                </Button>
              </div>
            </>
          )}
          
          <Button 
            onClick={popFromStack}
            disabled={gameState.stack.length === 0 || gameState.phase === 'hidden'}
            variant={gameState.phase === 'guess' ? 'default' : 'outline'}
          >
            Pop
          </Button>
          
          <Button onClick={startNewRound} variant="outline">
            <RotateCcw className="w-4 h-4 mr-1" />
            New Round
          </Button>
        </div>

        {/* Game Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Original Sequence</h4>
            {gameState.phase === 'memorize' || gameState.isComplete ? (
              <div className="flex gap-1 flex-wrap">
                {gameState.sequence.map((value, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">Hidden until round ends</div>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Your Guesses</h4>
            <div className="flex gap-1 flex-wrap">
              {gameState.userGuess.map((value, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  {value}
                </span>
              ))}
              {gameState.userGuess.length === 0 && (
                <span className="text-gray-500 text-sm">No guesses yet</span>
              )}
            </div>
          </div>
        </div>

        {gameState.isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mt-6">
            <h3 className="text-lg font-semibold text-green-800">Round Complete! 🎉</h3>
            <p className="text-green-700">
              Perfect memory! All elements popped correctly.
            </p>
            <p className="text-green-600 text-sm mt-1">
              Final Score: {gameState.score} points
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StackTowerGame;
