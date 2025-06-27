
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface Process {
  pid: number;
  name: string;
  status: 'running' | 'sleeping' | 'terminated';
  parentPid?: number;
  children: number[];
  createdAt: number;
}

const ProcessCreationGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const tasks = [
    { description: "Create a parent process", target: "parent", points: 20 },
    { description: "Fork a child process from parent", target: "child", points: 25 },
    { description: "Create a process tree (parent with 2 children)", target: "tree", points: 30 },
    { description: "Terminate a process", target: "terminate", points: 25 }
  ];

  const createProcess = (name: string, parentPid?: number) => {
    const newPid = Date.now() % 10000;
    const newProcess: Process = {
      pid: newPid,
      name,
      status: 'running',
      parentPid,
      children: [],
      createdAt: Date.now()
    };

    setProcesses(prev => {
      const updated = [...prev, newProcess];
      if (parentPid) {
        const parentIndex = updated.findIndex(p => p.pid === parentPid);
        if (parentIndex !== -1) {
          updated[parentIndex].children.push(newPid);
        }
      }
      return updated;
    });

    setScore(prev => prev + 10);
    checkTaskCompletion(name, parentPid);
  };

  const forkProcess = (parentPid: number) => {
    const parent = processes.find(p => p.pid === parentPid);
    if (parent) {
      createProcess(`${parent.name}_child`, parentPid);
    }
  };

  const terminateProcess = (pid: number) => {
    setProcesses(prev => 
      prev.map(p => 
        p.pid === pid ? { ...p, status: 'terminated' } : p
      )
    );
    setScore(prev => prev + 5);
    checkTaskCompletion('terminate');
  };

  const checkTaskCompletion = (action: string, parentPid?: number) => {
    const currentTaskObj = tasks[currentTask];
    
    switch (currentTaskObj.target) {
      case 'parent':
        if (action === 'parent' && !parentPid) {
          completeTask();
        }
        break;
      case 'child':
        if (action.includes('child') && parentPid) {
          completeTask();
        }
        break;
      case 'tree':
        const parentProcesses = processes.filter(p => !p.parentPid && p.status === 'running');
        const hasTreeStructure = parentProcesses.some(p => p.children.length >= 2);
        if (hasTreeStructure) {
          completeTask();
        }
        break;
      case 'terminate':
        if (action === 'terminate') {
          completeTask();
        }
        break;
    }
  };

  const completeTask = () => {
    setTaskCompleted(true);
    setScore(prev => prev + tasks[currentTask].points);
    
    setTimeout(() => {
      if (currentTask < tasks.length - 1) {
        setCurrentTask(prev => prev + 1);
        setTaskCompleted(false);
      } else {
        onComplete(score + tasks[currentTask].points);
      }
    }, 2000);
  };

  const resetGame = () => {
    setProcesses([]);
    setScore(0);
    setGameStarted(false);
    setCurrentTask(0);
    setTaskCompleted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    // Create initial system process
    setProcesses([{
      pid: 1,
      name: 'init',
      status: 'running',
      children: [],
      createdAt: Date.now()
    }]);
  };

  if (!gameStarted) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Activity className="text-blue-500" />
            Process Creation in Linux
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h3 className="font-bold mb-2">Learning Objectives:</h3>
            <ul className="text-left space-y-2">
              <li>• Understanding process creation with fork()</li>
              <li>• Process hierarchy and parent-child relationships</li>
              <li>• Process states and lifecycle</li>
              <li>• Process termination and cleanup</li>
            </ul>
          </div>
          
          <Button onClick={startGame} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Play className="mr-2 h-5 w-5" />
            Start Process Simulation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Task Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="text-blue-500" />
            Task {currentTask + 1} of {tasks.length}
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentTask + 1) / tasks.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-semibold">Current Task:</h3>
            <p>{tasks[currentTask].description}</p>
            <p className="text-sm text-gray-600 mt-1">Reward: {tasks[currentTask].points} points</p>
          </div>
          
          {taskCompleted && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <p className="font-semibold text-green-800">✅ Task Completed! +{tasks[currentTask].points} points</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Process Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Process Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              onClick={() => createProcess('parent')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Zap className="mr-2 h-4 w-4" />
              Create Parent Process
            </Button>
            
            {processes.filter(p => p.status === 'running' && p.name !== 'init').map(process => (
              <Button
                key={process.pid}
                onClick={() => forkProcess(process.pid)}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Fork from PID {process.pid}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Process Tree Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Process Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {processes.map(process => (
              <div key={process.pid} className={`border rounded-lg p-4 ${
                process.status === 'running' ? 'bg-green-50 border-green-200' :
                process.status === 'sleeping' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={process.status === 'running' ? 'default' : 'secondary'}>
                        PID: {process.pid}
                      </Badge>
                      <span className="font-semibold">{process.name}</span>
                      <Badge variant="outline">
                        {process.status}
                      </Badge>
                    </div>
                    
                    {process.parentPid && (
                      <p className="text-sm text-gray-600 mt-1">
                        Parent PID: {process.parentPid}
                      </p>
                    )}
                    
                    {process.children.length > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        Children: {process.children.join(', ')}
                      </p>
                    )}
                  </div>
                  
                  {process.status === 'running' && process.name !== 'init' && (
                    <Button
                      onClick={() => terminateProcess(process.pid)}
                      variant="destructive"
                      size="sm"
                    >
                      Terminate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Process Creation Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    
    if (pid == 0) {
        // Child process
        printf("Child process: PID = %d\\n", getpid());
        printf("Child's parent PID = %d\\n", getppid());
    } else if (pid > 0) {
        // Parent process
        printf("Parent process: PID = %d\\n", getpid());
        printf("Created child with PID = %d\\n", pid);
        wait(NULL); // Wait for child to complete
    } else {
        // Fork failed
        printf("Fork failed\\n");
    }
    
    return 0;
}`}</pre>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <Button onClick={resetGame} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default ProcessCreationGame;
