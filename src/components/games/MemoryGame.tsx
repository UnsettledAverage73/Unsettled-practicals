
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameProps } from '@/types/games';
import { toast } from '@/components/ui/sonner';

interface MemoryCard {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<GameProps> = ({ practicalId, practicalTitle, onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const getCardsForPractical = (id: number) => {
    const cardSets = {
      1: ['Array', 'Index', 'Element', 'Length', 'Push', 'Pop', 'Shift', 'Splice'],
      2: ['Stack', 'Push', 'Pop', 'LIFO', 'Top', 'Empty', 'Full', 'Peek'],
      3: ['Queue', 'Enqueue', 'Dequeue', 'FIFO', 'Front', 'Rear', 'Empty', 'Full'],
      default: ['Data', 'Structure', 'Algorithm', 'Memory', 'Pointer', 'Node', 'Link', 'Tree']
    };
    return cardSets[id as keyof typeof cardSets] || cardSets.default;
  };

  const initializeGame = () => {
    const cardContents = getCardsForPractical(practicalId);
    const gameCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(gameCards);
    setSelectedCards([]);
    setScore(0);
    setMoves(0);
    setGameStarted(true);
    setGameCompleted(false);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    const newSelectedCards = [...selectedCards, cardId];
    setSelectedCards(newSelectedCards);
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newSelectedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      setTimeout(() => {
        const [firstId, secondId] = newSelectedCards;
        const firstCard = cards[firstId];
        const secondCard = cards[secondId];
        
        if (firstCard.content === secondCard.content) {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isMatched: true }
              : card
          ));
          setScore(prev => prev + 10);
          toast.success('Match found! +10 points');
        } else {
          setCards(prev => prev.map(card => 
            card.id === firstId || card.id === secondId 
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        
        setSelectedCards([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameCompleted(true);
      const finalScore = score + Math.max(0, 100 - moves);
      toast.success(`Game completed! Final score: ${finalScore}`);
      onComplete?.(finalScore);
    }
  }, [cards, score, moves, onComplete]);

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Memory Game - {practicalTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Match the data structure terms to test your memory!</p>
          <Button onClick={initializeGame} className="bg-primary">
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Memory Game - {practicalTitle}</span>
          <div className="text-sm">
            Score: {score} | Moves: {moves}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                h-20 rounded-lg flex items-center justify-center cursor-pointer transition-all
                ${card.isFlipped || card.isMatched 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }
                ${card.isMatched ? 'ring-2 ring-green-500' : ''}
              `}
            >
              {card.isFlipped || card.isMatched ? card.content : '?'}
            </div>
          ))}
        </div>
        
        {gameCompleted && (
          <div className="text-center">
            <Button onClick={initializeGame} variant="outline">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryGame;
