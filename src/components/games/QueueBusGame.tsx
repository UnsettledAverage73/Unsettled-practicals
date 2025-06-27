
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Users, Clock, Trophy, Timer } from 'lucide-react';
import { QueueGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface QueueBusGameProps {
  onComplete?: (score: number) => void;
}

const QueueBusGame: React.FC<QueueBusGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<QueueGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    queue: [],
    people: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'],
    maxQueueSize: 5,
    waitTimes: []
  });

  const [currentPerson, setCurrentPerson] = useState<string>('');
  const [gameTimer, setGameTimer] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [busArrivalTimer, setBusArrivalTimer] = useState(15);

  const generateRandomPerson = useCallback(() => {
    const availablePeople = gameState.people.filter(person => 
      !gameState.queue.includes(person) && person !== currentPerson
    );
    if (availablePeople.length > 0) {
      const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)];
      setCurrentPerson(randomPerson);
    }
  }, [gameState.people, gameState.queue, currentPerson]);

  const startGame = () => {
    setIsGameActive(true);
    setGameTimer(60);
    setBusArrivalTimer(15);
    generateRandomPerson();
    setGameState(prev => ({
      ...prev,
      queue: [],
      score: 0,
      moves: 0,
      timeElapsed: 0,
      isComplete: false,
      waitTimes: []
    }));
  };

  const enqueue = () => {
    if (currentPerson && gameState.queue.length < gameState.maxQueueSize) {
      setGameState(prev => ({
        ...prev,
        queue: [...prev.queue, currentPerson],
        moves: prev.moves + 1,
        score: prev.score + 5,
        waitTimes: [...prev.waitTimes, Date.now()]
      }));
      toast.success(`${currentPerson} joined the queue! +5 points`);
      setCurrentPerson('');
      setTimeout(generateRandomPerson, 2000);
    } else if (gameState.queue.length >= gameState.maxQueueSize) {
      toast.error('Queue is full! Bus needs to arrive soon!');
    }
  };

  const dequeue = () => {
    if (gameState.queue.length > 0) {
      const person = gameState.queue[0];
      const waitTime = gameState.waitTimes[0];
      const actualWaitTime = (Date.now() - waitTime) / 1000;
      
      setGameState(prev => ({
        ...prev,
        queue: prev.queue.slice(1),
        waitTimes: prev.waitTimes.slice(1),
        moves: prev.moves + 1,
        score: prev.score + Math.max(1, Math.floor(20 - actualWaitTime))
      }));
      
      toast.success(`${person} boarded the bus! Wait time: ${actualWaitTime.toFixed(1)}s`);
    }
  };

  const busArrival = () => {
    if (gameState.queue.length > 0) {
      const queueSize = gameState.queue.length;
      setGameState(prev => ({
        ...prev,
        queue: [],
        waitTimes: [],
        score: prev.score + (queueSize * 10),
        moves: prev.moves + 1
      }));
      toast.success(`Bus arrived! ${queueSize} people boarded! +${queueSize * 10} points`);
    }
    setBusArrivalTimer(15);
  };

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 1) {
          setIsGameActive(false);
          const finalScore = gameState.score + (gameState.queue.length * 5);
          setGameState(prevState => ({ ...prevState, score: finalScore, isComplete: true }));
          toast.success(`Game Over! Final Score: ${finalScore}`);
          onComplete?.(finalScore);
          return 0;
        }
        return prev - 1;
      });

      setBusArrivalTimer(prev => {
        if (prev <= 1) {
          busArrival();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive, gameState.score, gameState.queue.length, onComplete]);

  useEffect(() => {
    if (isGameActive && !currentPerson && Math.random() < 0.3) {
      generateRandomPerson();
    }
  }, [isGameActive, currentPerson, generateRandomPerson]);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-green-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Bus className="w-6 h-6" />
          Queue the Bus Challenge
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Queue: {gameState.queue.length}/{gameState.maxQueueSize}</span>
          <span>Time: {gameTimer}s</span>
          <span>Bus in: {busArrivalTimer}s</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {!isGameActive && !gameState.isComplete && (
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-4">Welcome to Queue the Bus!</h3>
            <p className="mb-4 text-gray-600">
              Manage the bus queue efficiently. People arrive randomly - enqueue them quickly!
              The bus arrives every 15 seconds to pick up passengers.
            </p>
            <Button onClick={startGame} className="bg-blue-600 hover:bg-blue-700">
              <Timer className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          </div>
        )}

        {isGameActive && (
          <>
            <div className="mb-6">
              <div className="flex justify-center items-center gap-4 mb-4">
                {currentPerson && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <p className="font-semibold">{currentPerson}</p>
                    <p className="text-sm text-gray-600">wants to join queue</p>
                    <Button onClick={enqueue} className="mt-2 bg-green-600 hover:bg-green-700" size="sm">
                      Enqueue
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg p-4 shadow-inner">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Bus Queue (FIFO)
                </h4>
                <div className="flex justify-center gap-2 mb-4">
                  {Array.from({ length: gameState.maxQueueSize }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-16 h-20 rounded-lg border-2 flex items-center justify-center text-sm font-medium ${
                        gameState.queue[index] 
                          ? 'bg-blue-100 border-blue-300 text-blue-800' 
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                    >
                      {gameState.queue[index] || `#${index + 1}`}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={dequeue} 
                    disabled={gameState.queue.length === 0}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Dequeue (Board Bus)
                  </Button>
                  <Button 
                    onClick={busArrival}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Bus className="w-4 h-4 mr-2" />
                    Emergency Bus Arrival
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="font-medium mb-1">Queue Status</h4>
                <p>Size: {gameState.queue.length}/{gameState.maxQueueSize}</p>
                <p>Efficiency: {gameState.moves > 0 ? Math.round((gameState.score / gameState.moves) * 10) : 0}%</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="font-medium mb-1">Bus Schedule</h4>
                <p>Next arrival: {busArrivalTimer}s</p>
                <p>Auto pickup: {gameState.queue.length > 0 ? 'Ready' : 'Waiting'}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="font-medium mb-1">Game Stats</h4>
                <p>Operations: {gameState.moves}</p>
                <p>Time left: {gameTimer}s</p>
              </div>
            </div>
          </>
        )}

        {gameState.isComplete && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Game Complete!</h3>
            <p className="text-green-700 mb-2">Final Score: {gameState.score} points</p>
            <p className="text-green-600 text-sm mb-4">
              You managed {gameState.moves} queue operations efficiently!
            </p>
            <Button onClick={startGame} variant="outline">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QueueBusGame;
