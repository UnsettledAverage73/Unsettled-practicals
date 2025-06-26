
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { GameProps } from '@/types/games';
import { toast } from '@/components/ui/sonner';

interface Command {
  command: string;
  description: string;
  expectedOutput: string;
}

const CommandSimulationGame: React.FC<GameProps> = ({ practicalId, practicalTitle, onComplete }) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [completedCommands, setCompletedCommands] = useState<boolean[]>([]);
  const [terminal, setTerminal] = useState<string[]>(['Welcome to OS Command Simulator!', '']);

  const getCommandsForPractical = (id: number) => {
    const commandSets = {
      1: [
        { command: 'ls', description: 'List directory contents', expectedOutput: 'file1.txt file2.txt directory1/' },
        { command: 'pwd', description: 'Print working directory', expectedOutput: '/home/user' },
        { command: 'cd Documents', description: 'Change to Documents directory', expectedOutput: 'Changed to /home/user/Documents' }
      ],
      2: [
        { command: 'ps', description: 'Show running processes', expectedOutput: 'PID COMMAND\n1234 bash\n5678 vim' },
        { command: 'top', description: 'Display system processes', expectedOutput: 'Tasks: 145 total, 2 running, 143 sleeping' },
        { command: 'kill 1234', description: 'Kill process with PID 1234', expectedOutput: 'Process 1234 terminated' }
      ],
      default: [
        { command: 'whoami', description: 'Display current user', expectedOutput: 'student' },
        { command: 'date', description: 'Display current date', expectedOutput: 'Mon Dec 25 10:30:00 UTC 2023' },
        { command: 'echo "Hello World"', description: 'Print text to terminal', expectedOutput: 'Hello World' }
      ]
    };
    return commandSets[id as keyof typeof commandSets] || commandSets.default;
  };

  const [commands] = useState<Command[]>(getCommandsForPractical(practicalId));

  const initializeGame = () => {
    setGameStarted(true);
    setCurrentCommandIndex(0);
    setScore(0);
    setCompletedCommands(new Array(commands.length).fill(false));
    setTerminal(['Welcome to OS Command Simulator!', '', `Task: ${commands[0].description}`, '$ ']);
  };

  const handleSubmit = () => {
    const currentCommand = commands[currentCommandIndex];
    const isCorrect = userInput.toLowerCase().trim() === currentCommand.command.toLowerCase();
    
    const newTerminal = [...terminal];
    newTerminal[newTerminal.length - 1] = `$ ${userInput}`;
    
    if (isCorrect) {
      newTerminal.push(currentCommand.expectedOutput);
      setScore(prev => prev + 20);
      toast.success('Correct command! +20 points');
      
      const newCompleted = [...completedCommands];
      newCompleted[currentCommandIndex] = true;
      setCompletedCommands(newCompleted);
      
      if (currentCommandIndex < commands.length - 1) {
        const nextIndex = currentCommandIndex + 1;
        setCurrentCommandIndex(nextIndex);
        newTerminal.push('', `Task: ${commands[nextIndex].description}`, '$ ');
      } else {
        newTerminal.push('', 'All tasks completed! Well done!');
        toast.success(`Game completed! Final score: ${score + 20}`);
        onComplete?.(score + 20);
      }
    } else {
      newTerminal.push(`Command not found: ${userInput}`);
      newTerminal.push(`Hint: Try "${currentCommand.command}"`);
      newTerminal.push('$ ');
      toast.error('Incorrect command. Try again!');
    }
    
    setTerminal(newTerminal);
    setUserInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Command Simulation - {practicalTitle}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Practice OS commands in a simulated terminal environment!</p>
          <Button onClick={initializeGame} className="bg-primary">
            Start Simulation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Command Simulation - {practicalTitle}</span>
          <div className="text-sm">
            Score: {score} | Progress: {completedCommands.filter(Boolean).length}/{commands.length}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black text-green-400 font-mono p-4 rounded-lg mb-4 h-64 overflow-y-auto">
          {terminal.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        
        {currentCommandIndex < commands.length && (
          <div className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your command here..."
              className="font-mono"
            />
            <Button onClick={handleSubmit}>Execute</Button>
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Current task: {currentCommandIndex < commands.length ? commands[currentCommandIndex].description : 'All tasks completed!'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandSimulationGame;
