
export interface GameState {
  score: number;
  moves: number;
  timeElapsed: number;
  isComplete: boolean;
  level: number;
}

export interface SortingGameState extends GameState {
  array: number[];
  currentStep: number;
  isAnimating: boolean;
  comparisons: number;
  swaps: number;
}

export interface ArrayGameState extends GameState {
  array: (number | null)[];
  targetArray: number[];
  operations: string[];
  currentIndex: number;
}

export interface StackGameState extends GameState {
  stack: number[];
  sequence: number[];
  userGuess: number[];
  showStack: boolean;
  phase: 'memorize' | 'hidden' | 'guess';
}

export interface QueueGameState extends GameState {
  queue: string[];
  people: string[];
  maxQueueSize: number;
  waitTimes: number[];
}

export interface HanoiGameState extends GameState {
  towers: number[][];
  selectedDisk: number | null;
  selectedTower: number | null;
  minMoves: number;
}

export interface BinarySearchGameState extends GameState {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  found: boolean;
  steps: string[];
}

export interface RecursionGameState extends GameState {
  a: number;
  b: number;
  callStack: { level: number; a: number; b: number; result?: number }[];
  currentLevel: number;
}

export interface InsertionSortGameState extends GameState {
  cards: number[];
  sortedCards: number[];
  currentCard: number | null;
  insertPosition: number;
}
