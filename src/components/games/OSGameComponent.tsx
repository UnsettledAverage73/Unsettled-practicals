
import React from 'react';
import { GameProps, GameType } from '@/types/games';
import LinuxDistroGame from './LinuxDistroGame';
import LinuxCommandsGame from './LinuxCommandsGame';
import ShellScriptingGame from './ShellScriptingGame';
import ProcessCreationGame from './ProcessCreationGame';
import MultithreadingGame from './MultithreadingGame';
import FCFSSchedulingGame from './FCFSSchedulingGame';
import SJFSchedulingGame from './SJFSchedulingGame';
import FirstFitMemoryGame from './FirstFitMemoryGame';

interface OSGameComponentProps extends GameProps {
  gameType: GameType;
}

const OSGameComponent: React.FC<OSGameComponentProps> = ({ gameType, practicalId, practicalTitle, onComplete }) => {
  // Map practical IDs to specific OS games
  const getGameForPractical = (id: number) => {
    switch (id) {
      case 1: // Study of Various Linux Distributions
        return <LinuxDistroGame onComplete={onComplete} />;
      case 2: // Basic Linux Commands
        return <LinuxCommandsGame onComplete={onComplete} />;
      case 3: // Shell Scripting in Linux
        return <ShellScriptingGame onComplete={onComplete} />;
      case 4: // Process Creation in Linux
        return <ProcessCreationGame onComplete={onComplete} />;
      case 5: // Multithreading in Linux
        return <MultithreadingGame onComplete={onComplete} />;
      case 6: // FCFS CPU Scheduling Algorithm
        return <FCFSSchedulingGame onComplete={onComplete} />;
      case 7: // SJF CPU Scheduling Algorithm
        return <SJFSchedulingGame onComplete={onComplete} />;
      case 8: // First Fit Memory Allocation Algorithm
        return <FirstFitMemoryGame onComplete={onComplete} />;
      default:
        return <LinuxDistroGame onComplete={onComplete} />;
    }
  };

  // Use practical-specific games when available
  if (practicalId && practicalId <= 8) {
    return getGameForPractical(practicalId);
  }

  // Generic game selection based on gameType (fallback)
  switch (gameType) {
    case 'simulation':
      return <LinuxCommandsGame onComplete={onComplete} />;
    case 'memory':
      return <LinuxDistroGame onComplete={onComplete} />;
    default:
      return <LinuxDistroGame onComplete={onComplete} />;
  }
};

export default OSGameComponent;
