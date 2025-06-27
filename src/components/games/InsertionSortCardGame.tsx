
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shuffle, RotateCcw, Trophy, Hand, Zap } from 'lucide-react';
import { InsertionSortGameState } from '@/types/dataStructureGames';
import { toast } from '@/components/ui/sonner';

interface InsertionSortCardGameProps {
  onComplete?: (score: number) => void;
}

const InsertionSortCardGame: React.FC<InsertionSortCardGameProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<InsertionSortGameState>({
    score: 0,
    moves: 0,
    timeElapsed: 0,
    isComplete: false,
    level: 1,
    cards: [7, 3, 9, 1, 5, 8, 2],
    sortedCards: [],
    currentCard: null,
    insertPosition: 0
  });

  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<'manual' | 'auto'>('manual');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNewGame = useCallback(() => {
    const numCards = 5 + gameState.level;
    const cards = Array.from({ length: numCards }, () => Math.floor(Math.random() * 50) + 1);
    
    setGameState(prev => ({
      ...prev,
      cards: [...cards],
      sortedCards: [],
      currentCard: null,
      insertPosition: 0,
      moves: 0,
      score: 0,
      isComplete: false
    }));
    
    setDraggedCard(null);
    setIsAnimating(false);
  }, [gameState.level]);

  const pickCard = () => {
    if (gameState.cards.length === 0 || isAnimating) return;
    
    const nextCard = gameState.cards[0];
    const remainingCards = gameState.cards.slice(1);
    
    setGameState(prev => ({
      ...prev,
      cards: remainingCards,
      currentCard: nextCard,
      moves: prev.moves + 1
    }));
    
    toast.info(`Picked card: ${nextCard}`);
  };

  const insertCard = (position: number) => {
    if (gameState.currentCard === null || isAnimating) return;
    
    setIsAnimating(true);
    
    const newSortedCards = [...gameState.sortedCards];
    newSortedCards.splice(position, 0, gameState.currentCard);
    
    // Check if insertion is correct
    const isCorrect = isCorrectInsertion(gameState.currentCard, position);
    const points = isCorrect ? 20 : -5;
    
    setGameState(prev => ({
      ...prev,
      sortedCards: newSortedCards,
      currentCard: null,
      score: prev.score + points,
      insertPosition: position
    }));
    
    if (isCorrect) {
      toast.success(`Correct insertion! +20 points`);
    } else {
      toast.error(`Wrong position! -5 points`);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
      checkGameComplete(newSortedCards, gameState.cards.length === 0);
    }, 500);
  };

  const isCorrectInsertion = (card: number, position: number): boolean => {
    const sortedCards = gameState.sortedCards;
    
    // Check left neighbor
    if (position > 0 && sortedCards[position - 1] > card) {
      return false;
    }
    
    // Check right neighbor
    if (position < sortedCards.length && sortedCards[position] < card) {
      return false;
    }
    
    return true;
  };

  const checkGameComplete = (sortedCards: number[], noMoreCards: boolean) => {
    if (noMoreCards && sortedCards.length > 0) {
      const isFullySorted = isSorted(sortedCards);
      const finalScore = gameState.score + (isFullySorted ? 50 : 0);
      
      setGameState(prev => ({
        ...prev,
        isComplete: true,
        score: finalScore
      }));
      
      if (isFullySorted) {
        toast.success(`Perfect! All cards sorted correctly! Final score: ${finalScore}`);
      } else {
        toast.warning(`Game complete but not perfectly sorted. Score: ${finalScore}`);
      }
      
      onComplete?.(finalScore);
    }
  };

  const isSorted = (arr: number[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  const autoStep = () => {
    if (gameState.cards.length === 0 || isAnimating) return;
    
    // Pick the next card
    const nextCard = gameState.cards[0];
    const remainingCards = gameState.cards.slice(1);
    
    // Find correct position using insertion sort logic
    let correctPosition = 0;
    for (let i = 0; i < gameState.sortedCards.length; i++) {
      if (gameState.sortedCards[i] > nextCard) {
        correctPosition = i;
        break;
      }
      correctPosition = i + 1;
    }
    
    setIsAnimating(true);
    
    const newSortedCards = [...gameState.sortedCards];
    newSortedCards.splice(correctPosition, 0, nextCard);
    
    setGameState(prev => ({
      ...prev,
      cards: remainingCards,
      sortedCards: newSortedCards,
      currentCard: null,
      moves: prev.moves + 1,
      score: prev.score + 15,
      insertPosition: correctPosition
    }));
    
    toast.success(`Auto-inserted ${nextCard} at position ${correctPosition}`);
    
    setTimeout(() => {
      setIsAnimating(false);
      checkGameComplete(newSortedCards, remainingCards.length === 0);
    }, 1000);
  };

  const getCardStyle = (value: number, index?: number) => {
    const baseStyle = "w-16 h-20 rounded-lg border-2 flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 transform hover:scale-105";
    
    if (value === draggedCard) {
      return `${baseStyle} bg-yellow-200 border-yellow-400 shadow-lg`;
    }
    
    if (value === gameState.currentCard) {
      return `${baseStyle} bg-green-200 border-green-400 animate-pulse`;
    }
    
    // Color coding based on value ranges
    if (value <= 10) return `${baseStyle} bg-red-100 border-red-300 text-red-800`;
    if (value <= 20) return `${baseStyle} bg-blue-100 border-blue-300 text-blue-800`;
    if (value <= 30) return `${baseStyle} bg-green-100 border-green-300 text-green-800`;
    if (value <= 40) return `${baseStyle} bg-purple-100 border-purple-300 text-purple-800`;
    return `${baseStyle} bg-orange-100 border-orange-300 text-orange-800`;
  };

  return (
    <Card className="w-full max-w-5xl mx-auto bg-gradient-to-br from-orange-50 to-red-50">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Hand className="w-6 h-6" />
          Insertion Sort Card Game
        </CardTitle>
        <div className="flex justify-between text-sm opacity-90">
          <span>Score: {gameState.score}</span>
          <span>Moves: {gameState.moves}</span>
          <span>Cards Left: {gameState.cards.length}</span>
          <span>Sorted: {gameState.sortedCards.length}</span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button onClick={generateNewGame} variant="outline">
                <Shuffle className="w-4 h-4 mr-1" />
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
              <span className="bg-green-100 px-2 py-1 rounded mr-2">Current Card</span>
              <span className="bg-blue-100 px-2 py-1 rounded">Sorted Hand</span>
            </div>
          </div>

          {/* Deck of unsorted cards */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shuffle className="w-5 h-5" />
              Deck ({gameState.cards.length} cards)
            </h4>
            <div className="flex gap-2 flex-wrap justify-center min-h-[5rem] bg-gray-100 rounded-lg p-4">
              {gameState.cards.map((card, index) => (
                <div
                  key={index}
                  className={getCardStyle(card)}
                  onClick={() => gameMode === 'manual' && index === 0 && pickCard()}
                >
                  {index === 0 ? card : '?'}
                </div>
              ))}
              {gameState.cards.length === 0 && (
                <div className="text-gray-500 italic">No more cards</div>
              )}
            </div>
          </div>

          {/* Current card */}
          {gameState.currentCard && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Current Card to Insert:</h4>
              <div className="flex justify-center">
                <div className={getCardStyle(gameState.currentCard)}>
                  {gameState.currentCard}
                </div>
              </div>
            </div>
          )}

          {/* Sorted hand */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Hand className="w-5 h-5" />
              Sorted Hand
            </h4>
            <div className="bg-white rounded-lg p-4 shadow-inner min-h-[6rem]">
              <div className="flex justify-center gap-2 flex-wrap">
                {/* Insertion slots */}
                {Array.from({ length: gameState.sortedCards.length + 1 }).map((_, position) => (
                  <React.Fragment key={position}>
                    {position < gameState.sortedCards.length && (
                      <div className={getCardStyle(gameState.sortedCards[position])}>
                        {gameState.sortedCards[position]}
                      </div>
                    )}
                    {gameState.currentCard && gameMode === 'manual' && (
                      <Button
                        onClick={() => insertCard(position)}
                        className="w-4 h-20 bg-gray-200 hover:bg-blue-200 border-2 border-dashed border-gray-400 hover:border-blue-400 text-xs"
                        variant="ghost"
                        disabled={isAnimating}
                      >
                        ↓
                      </Button>
                    )}
                  </React.Fragment>
                ))}
                {gameState.sortedCards.length === 0 && !gameState.currentCard && (
                  <div className="text-gray-500 italic flex items-center">
                    Your sorted cards will appear here
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Game controls */}
          <div className="flex justify-center gap-4 mb-4">
            {gameMode === 'manual' ? (
              <Button 
                onClick={pickCard} 
                disabled={gameState.cards.length === 0 || gameState.currentCard !== null || isAnimating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Pick Next Card
              </Button>
            ) : (
              <Button 
                onClick={autoStep} 
                disabled={gameState.cards.length === 0 || isAnimating || gameState.isComplete}
                className="bg-green-600 hover:bg-green-700"
              >
                <Zap className="w-4 h-4 mr-1" />
                Auto Insert
              </Button>
            )}
          </div>

          {gameState.isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Game Complete!</h3>
              <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                <div>
                  <p className="font-medium">Cards Sorted</p>
                  <p className="text-lg">{gameState.sortedCards.length}</p>
                </div>
                <div>
                  <p className="font-medium">Accuracy</p>
                  <p className="text-lg">{isSorted(gameState.sortedCards) ? '100%' : 'Partial'}</p>
                </div>
                <div>
                  <p className="font-medium">Final Score</p>
                  <p className="text-lg">{gameState.score}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Final sequence: [{gameState.sortedCards.join(', ')}]
                </p>
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
            <p className="text-xs text-gray-600">Time: O(n²) worst case</p>
            <p className="text-xs text-gray-600">Space: O(1)</p>
            <p className="text-xs text-gray-600 mt-1">
              Insertion sort builds the sorted array one element at a time.
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Game Strategy</h4>
            <p className="text-xs text-gray-600">
              {gameMode === 'manual' 
                ? 'Pick cards one by one and insert them in the correct position'
                : 'Watch how insertion sort automatically finds the correct position'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsertionSortCardGame;
