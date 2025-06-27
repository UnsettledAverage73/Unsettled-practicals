
export interface GameProps {
  practicalId: number;
  practicalTitle: string;
  onComplete?: (score: number) => void;
}

export interface GameResult {
  score: number;
  timeSpent: number;
  completed: boolean;
}

export type GameType = 'memory' | 'simulation' | 'coding' | 'quiz' | 'sorting' | 'array' | 'stack' | 'queue' | 'hanoi' | 'search' | 'recursion';
