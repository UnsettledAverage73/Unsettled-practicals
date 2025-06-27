
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Terminal, CheckCircle, XCircle, Play, RotateCcw } from 'lucide-react';

interface Command {
  command: string;
  description: string;
  example: string;
  syntax: string;
}

interface Challenge {
  scenario: string;
  expectedCommand: string;
  hint: string;
}

const LinuxCommandsGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to Linux Commands Learning Terminal!",
    "Type 'help' to see available commands or try the challenges below."
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const commands: Command[] = [
    { command: 'ls', description: 'List directory contents', example: 'ls -la', syntax: 'ls [options] [directory]' },
    { command: 'cd', description: 'Change directory', example: 'cd /home/user', syntax: 'cd [directory]' },
    { command: 'pwd', description: 'Print working directory', example: 'pwd', syntax: 'pwd' },
    { command: 'mkdir', description: 'Create directory', example: 'mkdir newfolder', syntax: 'mkdir [directory_name]' },
    { command: 'cp', description: 'Copy files or directories', example: 'cp file1.txt file2.txt', syntax: 'cp [source] [destination]' },
    { command: 'mv', description: 'Move/rename files', example: 'mv oldname.txt newname.txt', syntax: 'mv [source] [destination]' },
    { command: 'rm', description: 'Remove files or directories', example: 'rm file.txt', syntax: 'rm [options] [file]' },
    { command: 'cat', description: 'Display file contents', example: 'cat file.txt', syntax: 'cat [file]' },
  ];

  const challenges: Challenge[] = [
    {
      scenario: "You want to see all files in the current directory including hidden files.",
      expectedCommand: "ls -la",
      hint: "Use the 'ls' command with flags for 'long format' and 'all files'"
    },
    {
      scenario: "Navigate to the /home directory.",
      expectedCommand: "cd /home",
      hint: "Use the 'cd' command followed by the directory path"
    },
    {
      scenario: "Create a new directory called 'projects'.",
      expectedCommand: "mkdir projects",
      hint: "Use the 'mkdir' command followed by the directory name"
    },
    {
      scenario: "Copy a file named 'document.txt' to 'backup.txt'.",
      expectedCommand: "cp document.txt backup.txt",
      hint: "Use the 'cp' command with source and destination files"
    },
    {
      scenario: "Display the contents of a file named 'readme.txt'.",
      expectedCommand: "cat readme.txt",
      hint: "Use the 'cat' command followed by the filename"
    }
  ];

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    let output = `$ ${command}`;
    
    if (trimmedCommand === 'help') {
      output += '\nAvailable commands:';
      commands.forEach(cmd => {
        output += `\n  ${cmd.command} - ${cmd.description}`;
      });
    } else if (trimmedCommand === 'clear') {
      setTerminalOutput([]);
      setCurrentInput('');
      return;
    } else if (commands.some(cmd => trimmedCommand.startsWith(cmd.command))) {
      const matchedCommand = commands.find(cmd => trimmedCommand.startsWith(cmd.command));
      if (matchedCommand) {
        output += `\n${matchedCommand.description}`;
        output += `\nSyntax: ${matchedCommand.syntax}`;
        output += `\nExample: ${matchedCommand.example}`;
      }
    } else {
      output += `\nCommand '${command}' not found. Type 'help' for available commands.`;
    }

    setTerminalOutput(prev => [...prev, output]);
  };

  const handleChallengeSubmit = () => {
    const userCommand = currentInput.trim().toLowerCase();
    const expectedCommand = challenges[currentChallenge].expectedCommand.toLowerCase();
    
    let output = `$ ${currentInput}`;
    
    if (userCommand === expectedCommand) {
      output += '\n✅ Correct! Well done!';
      setScore(score + 20);
      setChallengeComplete(true);
      
      setTimeout(() => {
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1);
          setChallengeComplete(false);
        } else {
          setGameComplete(true);
          onComplete(score + 20);
        }
      }, 2000);
    } else {
      output += '\n❌ Not quite right. Try again!';
      output += `\nHint: ${challenges[currentChallenge].hint}`;
    }

    setTerminalOutput(prev => [...prev, output]);
    setCurrentInput('');
  };

  const resetGame = () => {
    setScore(0);
    setCurrentChallenge(0);
    setChallengeComplete(false);
    setGameComplete(false);
    setTerminalOutput([
      "Welcome to Linux Commands Learning Terminal!",
      "Type 'help' to see available commands or try the challenges below."
    ]);
    setCurrentInput('');
  };

  if (gameComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Terminal className="text-green-500" />
            Linux Commands Mastery Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-green-600">{score}/100</div>
          <p className="text-lg">
            {score >= 80 ? "Excellent! You're a Linux command expert!" :
             score >= 60 ? "Good work! Keep practicing Linux commands." :
             "Keep learning to master Linux commands!"}
          </p>
          <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Command Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="text-green-500" />
            Linux Commands Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="font-mono font-bold text-green-600">{cmd.command}</div>
                <div className="text-sm text-gray-600">{cmd.description}</div>
                <div className="text-xs text-blue-600 mt-1">Example: {cmd.example}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            Challenge {currentChallenge + 1} of {challenges.length}
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h3 className="font-semibold">Scenario:</h3>
            <p>{challenges[currentChallenge].scenario}</p>
          </div>

          {challengeComplete && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600 h-4 w-4" />
                <span className="font-semibold text-green-600">Challenge Complete! +20 points</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terminal Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="text-green-500" />
            Linux Terminal Simulator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
            {terminalOutput.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <div className="flex-1 flex items-center gap-2">
              <span className="text-green-600 font-mono">$</span>
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (currentChallenge < challenges.length && !challengeComplete) {
                      handleChallengeSubmit();
                    } else {
                      handleCommand(currentInput);
                      setCurrentInput('');
                    }
                  }
                }}
                placeholder="Type a command..."
                className="font-mono"
              />
            </div>
            <Button 
              onClick={() => {
                if (currentChallenge < challenges.length && !challengeComplete) {
                  handleChallengeSubmit();
                } else {
                  handleCommand(currentInput);
                  setCurrentInput('');
                }
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div>Score: {score}/100</div>
            <div>Type 'clear' to clear terminal, 'help' for commands</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinuxCommandsGame;
