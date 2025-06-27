
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Minus, Search, Edit, Target, Undo } from 'lucide-react';
import { ArrayGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface ArrayPuzzleGameProps {
  onComplete?: (score: number) => void;
}

const ArrayPuzzleGame: React.FC<ArrayPuzzleGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<ArrayGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    array: [10, 20, 30, null, null],
    targetArray: [5, 10, 15, 20, 25],
    operations: [],
    currentIndex: 0
  });

  const [selectedOperation, setSelectedOperation] = useState<'insert' | 'delete' | 'update' | 'search'>('insert');
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [searchResult, setSearchResult] = useState<number | null>(null);

  const generatePuzzle = () => {
    const size = 5;
    const initialArray = Array(size).fill(null);
    const targetArray = Array.from({ length: size }, (_, i) => (i + 1) * 5);
    
    // Add some initial values
    initialArray[0] = 10;
    initialArray[1] = 20;
    initialArray[2] = 30;

    setGameState(prev => ({
      ...prev,
      array: initialArray,
      targetArray,
      operations: [],
      currentIndex: 0,
      isComplete: false,
      moves: 0,
      score: 0
    }));
    setSearchResult(null);
  };

  const performOperation = () => {
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    const newArray = [...gameState.array];
    const newOperations = [...gameState.operations];
    let operationSuccess = false;
    let operationDescription = '';

    switch (selectedOperation) {
      case 'insert':
        if (!isNaN(value) && !isNaN(index) && index >= 0 && index < newArray.length) {
          if (newArray[index] === null) {
            newArray[index] = value;
            operationDescription = `Inserted ${value} at index ${index}`;
            operationSuccess = true;
          } else {
            toast.error('Position already occupied!');
          }
        } else {
          toast.error('Invalid value or index!');
        }
        break;

      case 'delete':
        if (!isNaN(index) && index >= 0 && index < newArray.length) {
          if (newArray[index] !== null) {
            const deletedValue = newArray[index];
            newArray[index] = null;
            operationDescription = `Deleted ${deletedValue} from index ${index}`;
            operationSuccess = true;
          } else {
            toast.error('Position is already empty!');
          }
        } else {
          toast.error('Invalid index!');
        }
        break;

      case 'update':
        if (!isNaN(value) && !isNaN(index) && index >= 0 && index < newArray.length) {
          if (newArray[index] !== null) {
            const oldValue = newArray[index];
            newArray[index] = value;
            operationDescription = `Updated index ${index} from ${oldValue} to ${value}`;
            operationSuccess = true;
          } else {
            toast.error('Cannot update empty position!');
          }
        } else {
          toast.error('Invalid value or index!');
        }
        break;

      case 'search':
        if (!isNaN(value)) {
          const foundIndex = newArray.indexOf(value);
          setSearchResult(foundIndex);
          operationDescription = `Searched for ${value}, found at index: ${foundIndex >= 0 ? foundIndex : 'not found'}`;
          operationSuccess = true;
        } else {
          toast.error('Invalid search value!');
        }
        break;
    }

    if (operationSuccess) {
      newOperations.push(operationDescription);
      const newMoves = gameState.moves + 1;
      
      setGameState(prev => ({
        ...prev,
        array: newArray,
        operations: newOperations,
        moves: newMoves
      }));

      // Check if puzzle is solved
      const isComplete = JSON.stringify(newArray) === JSON.stringify(gameState.targetArray);
      if (isComplete) {
        const finalScore = Math.max(0, 100 - newMoves * 5);
        setGameState(prev => ({
          ...prev,
          isComplete: true,
          score: finalScore
        }));
        toast.success(`Puzzle solved! Score: ${finalScore}`);
        onComplete?.(finalScore);
      }

      setInputValue('');
      setInputIndex('');
    }
  };

  const undoLastOperation = () => {
    if (gameState.operations.length === 0) return;
    
    // This is a simplified undo - in a real implementation, you'd store states
    toast.info('Undo feature - restart puzzle to try different approach');
  };

  useEffect(() => {
    generatePuzzle();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6" />
          Array Puzzle Challenge
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Moves: {gameState.moves}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Transform your array to match the target!</h3>
          
          {/* Current Array */}
          <div className="mb-4">
            <h4 className="font-medium mb-2">Current Array:</h4>
            <div className="flex gap-2 justify-center">
              {gameState.array.map((value, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center font-bold
                    ${value !== null ? 'bg-blue-100 border-blue-300' : 'bg-gray-100 border-gray-300 border-dashed'}
                    ${searchResult === index ? 'ring-4 ring-yellow-400' : ''}
                  `}
                >
                  {value !== null ? value : '—'}
                  <div className="text-xs text-gray-500 absolute mt-12">{index}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Array */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Target Array:</h4>
            <div className="flex gap-2 justify-center">
              {gameState.targetArray.map((value, index) => (
                <div
                  key={index}
                  className="w-16 h-16 border-2 border-green-300 bg-green-100 rounded-lg flex items-center justify-center font-bold"
                >
                  {value}
                  <div className="text-xs text-gray-500 absolute mt-12">{index}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Button
                variant={selectedOperation === 'insert' ? 'default' : 'outline'}
                onClick={() => setSelectedOperation('insert')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Insert
              </Button>
              <Button
                variant={selectedOperation === 'delete' ? 'default' : 'outline'}
                onClick={() => setSelectedOperation('delete')}
                className="flex items-center gap-2"
              >
                <Minus className="w-4 h-4" />
                Delete
              </Button>
              <Button
                variant={selectedOperation === 'update' ? 'default' : 'outline'}
                onClick={() => setSelectedOperation('update')}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Update
              </Button>
              <Button
                variant={selectedOperation === 'search' ? 'default' : 'outline'}
                onClick={() => setSelectedOperation('search')}
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            <div className="flex gap-2 items-center">
              {selectedOperation !== 'delete' && (
                <Input
                  type="number"
                  placeholder="Value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-24"
                />
              )}
              {selectedOperation !== 'search' && (
                <Input
                  type="number"
                  placeholder="Index"
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  className="w-24"
                />
              )}
              <Button onClick={performOperation} disabled={gameState.isComplete}>
                Execute
              </Button>
              <Button onClick={undoLastOperation} variant="outline" disabled={gameState.operations.length === 0}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button onClick={generatePuzzle} variant="outline">
                New Puzzle
              </Button>
            </div>
          </div>

          {/* Search Result */}
          {searchResult !== null && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800">
                Search result: {searchResult >= 0 ? `Found at index ${searchResult}` : 'Value not found'}
              </p>
            </div>
          )}

          {/* Operations History */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Operations History ({gameState.operations.length} moves):</h4>
            <div className="max-h-32 overflow-y-auto">
              {gameState.operations.length === 0 ? (
                <p className="text-gray-500 text-sm">No operations performed yet.</p>
              ) : (
                gameState.operations.map((operation, index) => (
                  <div key={index} className="text-sm py-1 border-b last:border-b-0">
                    {index + 1}. {operation}
                  </div>
                ))
              )}
            </div>
          </div>

          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mt-4">
              <h3 className="text-lg font-semibold text-green-800">Puzzle Solved! 🎉</h3>
              <p className="text-green-700">
                Completed in {gameState.moves} moves
              </p>
              <p className="text-green-600 text-sm mt-1">
                Final Score: {gameState.score} points
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArrayPuzzleGame;
