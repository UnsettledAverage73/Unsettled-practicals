
import React from 'react';
import { GameProps, GameType } from '@/types/games';
import MemoryGame from './MemoryGame';
import CommandSimulationGame from './CommandSimulationGame';
import CodingChallengeGame from './CodingChallengeGame';

interface GameComponentProps extends GameProps {
  gameType: GameType;
}

const GameComponent: React.FC<GameComponentProps> = ({ gameType, ...props }) => {
  switch (gameType) {
    case 'memory':
      return <MemoryGame {...props} />;
    case 'simulation':
      return <CommandSimulationGame {...props} />;
    case 'coding':
      return <CodingChallengeGame {...props} />;
    default:
      return <MemoryGame {...props} />;
  }
};

export default GameComponent;
