
import React from 'react';
import { GameProps, GameType } from '@/types/games';
import MemoryGame from './MemoryGame';
import CommandSimulationGame from './CommandSimulationGame';
import CodingChallengeGame from './CodingChallengeGame';
import BubbleSortGame from './BubbleSortGame';
import ArrayPuzzleGame from './ArrayPuzzleGame';
import StackTowerGame from './StackTowerGame';
import QueueBusGame from './QueueBusGame';
import HanoiTowerGame from './HanoiTowerGame';
import BinarySearchGame from './BinarySearchGame';
import RecursionBotGame from './RecursionBotGame';
import InsertionSortCardGame from './InsertionSortCardGame';

interface GameComponentProps extends GameProps {
  gameType: GameType;
}

const GameComponent: React.FC<GameComponentProps> = ({ gameType, practicalId, practicalTitle, onComplete }) => {
  // Map practical IDs to specific games
  const getGameForPractical = (id: number) => {
    switch (id) {
      case 1: // Bubble Sort
        return <BubbleSortGame onComplete={onComplete} />;
      case 2: // Array Operations
        return <ArrayPuzzleGame onComplete={onComplete} />;
      case 3: // Stack Operations
        return <StackTowerGame onComplete={onComplete} />;
      case 4: // Queue Operations
        return <QueueBusGame onComplete={onComplete} />;
      case 5: // Tower of Hanoi
        return <HanoiTowerGame onComplete={onComplete} />;
      case 6: // Binary Search
        return <BinarySearchGame onComplete={onComplete} />;
      case 7: // Recursion Multiplication
        return <RecursionBotGame onComplete={onComplete} />;
      case 8: // Insertion Sort
        return <InsertionSortCardGame onComplete={onComplete} />;
      default:
        return <MemoryGame practicalId={practicalId} practicalTitle={practicalTitle} onComplete={onComplete} />;
    }
  };

  // Use practical-specific games when available, otherwise fall back to generic games
  if (practicalId && practicalId <= 8) {
    return getGameForPractical(practicalId);
  }

  // Generic game selection based on gameType
  switch (gameType) {
    case 'memory':
      return <MemoryGame practicalId={practicalId} practicalTitle={practicalTitle} onComplete={onComplete} />;
    case 'simulation':
      return <CommandSimulationGame practicalId={practicalId} practicalTitle={practicalTitle} onComplete={onComplete} />;
    case 'coding':
      return <CodingChallengeGame practicalId={practicalId} practicalTitle={practicalTitle} onComplete={onComplete} />;
    default:
      return <MemoryGame practicalId={practicalId} practicalTitle={practicalTitle} onComplete={onComplete} />;
  }
};

export default GameComponent;
