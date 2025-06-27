
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Trophy, Target, Zap } from 'lucide-react';
import { HanoiGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface HanoiTowerGameProps {
  onComplete?: (score: number) => void;
}

const HanoiTowerGame: React.FC<HanoiTowerGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<HanoiGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 3,
    towers: [[3, 2, 1], [], []],
    selectedDisk: null,
    selectedTower: null,
    minMoves: 7
  });

  const [startTime, setStartTime] = useState<number>(0);

  const initializeGame = useCallback(() => {
    const numDisks = gameState.level;
    const initialTower = Array.from({ length: numDisks }, (_, i) => numDisks - i);
    const minMoves = Math.pow(2, numDisks) - 1;
    
    setGameState(prev => ({
      ...prev,
      towers: [initialTower, [], []],
      selectedDisk: null,
      selectedTower: null,
      moves: 0,
      score: 0,
      isComplete: false,
      minMoves,
      timeElapsed: 0
    }));
    setStartTime(Date.now());
  }, [gameState.level]);

  const selectTower = (towerIndex: number) => {
    if (gameState.isComplete) return;

    const tower = gameState.towers[towerIndex];
    
    if (gameState.selectedTower === null) {
      // First click - select source tower
      if (tower.length === 0) {
        toast.error('Cannot select empty tower!');
        return;
      }
      
      setGameState(prev => ({
        ...prev,
        selectedTower: towerIndex,
        selectedDisk: tower[tower.length - 1]
      }));
      
      toast.info(`Selected disk ${tower[tower.length - 1]} from tower ${towerIndex + 1}`);
    } else {
      // Second click - move disk
      const sourceTower = gameState.selectedTower;
      const sourceDisk = gameState.selectedDisk;
      
      if (sourceTower === towerIndex) {
        // Deselect if clicking same tower
        setGameState(prev => ({
          ...prev,
          selectedTower: null,
          selectedDisk: null
        }));
        toast.info('Deselected disk');
        return;
      }

      // Check if move is valid
      if (tower.length > 0 && tower[tower.length - 1] < sourceDisk!) {
        toast.error('Cannot place larger disk on smaller disk!');
        setGameState(prev => ({
          ...prev,
          selectedTower: null,
          selectedDisk: null
        }));
        return;
      }

      // Perform the move
      const newTowers = [...gameState.towers];
      const movedDisk = newTowers[sourceTower].pop()!;
      newTowers[towerIndex].push(movedDisk);

      const newMoves = gameState.moves + 1;
      const timeElapsed = (Date.now() - startTime) / 1000;
      
      // Check if game is complete
      const isComplete = newTowers[2].length === gameState.level;
      let newScore = gameState.score + 10;
      
      if (isComplete) {
        const efficiency = gameState.minMoves / newMoves;
        const timeBonus = Math.max(0, Math.floor(100 - timeElapsed));
        newScore += Math.floor(efficiency * 100) + timeBonus;
        
        toast.success(`Puzzle solved! Efficiency: ${(efficiency * 100).toFixed(1)}%`);
        onComplete?.(newScore);
      }

      setGameState(prev => ({
        ...prev,
        towers: newTowers,
        moves: newMoves,
        score: newScore,
        selectedTower: null,
        selectedDisk: null,
        isComplete,
        timeElapsed
      }));

      toast.success(`Moved disk ${movedDisk} to tower ${towerIndex + 1}`);
    }
  };

  const getDiskColor = (size: number) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    return colors[size - 1] || 'bg-gray-500';
  };

  const getDiskWidth = (size: number) => {
    return `${size * 20 + 40}px`;
  };

  const changeLevel = (newLevel: number) => {
    setGameState(prev => ({ ...prev, level: newLevel }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6" />
          Tower of Hanoi Challenge
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Moves: {gameState.moves}</span>
          <span>Min Moves: {gameState.minMoves}</span>
          <span>Level: {gameState.level} disks</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button onClick={initializeGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <div className="flex gap-1">
                {[3, 4, 5, 6].map(level => (
                  <Button
                    key={level}
                    onClick={() => changeLevel(level)}
                    variant={gameState.level === level ? "default" : "outline"}
                    size="sm"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Efficiency: {gameState.moves > 0 ? ((gameState.minMoves / gameState.moves) * 100).toFixed(1) : 100}%
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-inner">
            <div className="flex justify-around items-end" style={{ height: '300px' }}>
              {gameState.towers.map((tower, towerIndex) => (
                <div
                  key={towerIndex}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => selectTower(towerIndex)}
                >
                  <div className="text-sm font-medium mb-2">
                    Tower {towerIndex + 1}
                  </div>
                  
                  <div className="relative flex flex-col-reverse items-center">
                    {/* Tower pole */}
                    <div className={`w-2 bg-gray-600 rounded-t transition-all ${
                      gameState.selectedTower === towerIndex ? 'bg-blue-600' : ''
                    }`} style={{ height: '250px' }} />
                    
                    {/* Base */}
                    <div className="w-32 h-4 bg-gray-800 rounded mb-1" />
                    
                    {/* Disks */}
                    <div className="absolute bottom-4 flex flex-col-reverse items-center">
                      {tower.map((disk, diskIndex) => (
                        <div
                          key={diskIndex}
                          className={`h-6 rounded transition-all duration-300 border-2 border-white shadow-md ${
                            getDiskColor(disk)
                          } ${
                            gameState.selectedDisk === disk && gameState.selectedTower === towerIndex
                              ? 'animate-pulse ring-2 ring-yellow-400'
                              : ''
                          }`}
                          style={{ 
                            width: getDiskWidth(disk),
                            zIndex: diskIndex + 1
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {tower.length} disk{tower.length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {gameState.selectedDisk && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-blue-800">
                <Zap className="w-4 h-4 inline mr-1" />
                Selected disk {gameState.selectedDisk} from tower {(gameState.selectedTower || 0) + 1}. 
                Click another tower to move it there.
              </p>
            </div>
          )}

          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mt-4">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Puzzle Solved!</h3>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="font-medium">Moves Used</p>
                  <p className="text-lg">{gameState.moves}</p>
                </div>
                <div>
                  <p className="font-medium">Efficiency</p>
                  <p className="text-lg">{((gameState.minMoves / gameState.moves) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="font-medium">Final Score</p>
                  <p className="text-lg">{gameState.score}</p>
                </div>
              </div>
              <Button onClick={initializeGame} variant="outline">
                Play Again
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Game Rules</h4>
            <ul className="text-xs space-y-1 text-gray-600">
              <li>• Move all disks to the rightmost tower</li>
              <li>• Only move one disk at a time</li>
              <li>• Never place a larger disk on a smaller one</li>
              <li>• Try to solve in minimum moves possible</li>
            </ul>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Algorithm Info</h4>
            <p className="text-xs text-gray-600">
              Minimum moves: 2^n - 1 where n = number of disks
            </p>
            <p className="text-xs text-gray-600 mt-1">
              This is a classic recursive problem demonstrating divide-and-conquer strategy.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HanoiTowerGame;
