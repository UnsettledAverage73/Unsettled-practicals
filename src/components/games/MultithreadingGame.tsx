import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Cpu, Play, Pause, RotateCcw } from 'lucide-react';

interface Thread {
  id: number;
  name: string;
  status: 'running' | 'waiting' | 'blocked' | 'terminated';
  progress: number;
  priority: number;
  task: string;
}

const MultithreadingGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const challenges = [
    {
      title: "Create Multiple Threads",
      description: "Create 3 threads to perform different tasks simultaneously",
      requirement: 3,
      points: 30
    },
    {
      title: "Thread Synchronization",
      description: "Demonstrate thread coordination by managing shared resources",
      requirement: 2,
      points: 40
    },
    {
      title: "Producer-Consumer Problem",
      description: "Implement producer and consumer threads with proper synchronization",
      requirement: 2,
      points: 30
    }
  ];

  const createThread = (name: string, task: string, priority: number = 1) => {
    const newThread: Thread = {
      id: Date.now() + Math.random(),
      name,
      status: 'running',
      progress: 0,
      priority,
      task
    };

    setThreads(prev => [...prev, newThread]);
    setScore(prev => prev + 10);
  };

  const predefinedTasks = [
    { name: "Calculator", task: "Mathematical calculations", priority: 2 },
    { name: "FileReader", task: "Reading files", priority: 1 },
    { name: "NetworkHandler", task: "Network operations", priority: 3 },
    { name: "Producer", task: "Producing data", priority: 2 },
    { name: "Consumer", task: "Consuming data", priority: 2 },
    { name: "DatabaseWorker", task: "Database operations", priority: 1 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setThreads(prev => prev.map(thread => {
          if (thread.status === 'running' && thread.progress < 100) {
            const increment = Math.random() * (thread.priority * 2) + 1;
            const newProgress = Math.min(thread.progress + increment, 100);
            
            return {
              ...thread,
              progress: newProgress,
              status: newProgress >= 100 ? 'terminated' : 'running'
            };
          }
          return thread;
        }));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  useEffect(() => {
    checkChallengeCompletion();
  }, [threads, currentChallenge]);

  const checkChallengeCompletion = () => {
    const challenge = challenges[currentChallenge];
    let completed = false;

    switch (currentChallenge) {
      case 0: // Create Multiple Threads
        completed = threads.length >= challenge.requirement;
        break;
      case 1: // Thread Synchronization
        const runningThreads = threads.filter(t => t.status === 'running').length;
        completed = runningThreads >= challenge.requirement && threads.length >= 3;
        break;
      case 2: // Producer-Consumer
        const hasProducer = threads.some(t => t.name.toLowerCase().includes('producer'));
        const hasConsumer = threads.some(t => t.name.toLowerCase().includes('consumer'));
        completed = hasProducer && hasConsumer;
        break;
    }

    if (completed && currentChallenge < challenges.length - 1) {
      setScore(prev => prev + challenge.points);
      setTimeout(() => {
        setCurrentChallenge(prev => prev + 1);
      }, 2000);
    } else if (completed && currentChallenge === challenges.length - 1) {
      setScore(prev => prev + challenge.points);
      setGameComplete(true);
      onComplete(score + challenge.points);
    }
  };

  const toggleExecution = () => {
    setIsRunning(!isRunning);
  };

  const terminateThread = (id: number) => {
    setThreads(prev => prev.map(thread => 
      thread.id === id ? { ...thread, status: 'terminated' } : thread
    ));
  };

  const resetGame = () => {
    setThreads([]);
    setScore(0);
    setIsRunning(false);
    setCurrentChallenge(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Cpu className="text-orange-500" />
            Multithreading Mastery Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-orange-600">{score}/100</div>
          <p className="text-lg">
            {score >= 80 ? "Excellent! You're a multithreading expert!" :
             score >= 60 ? "Good work! Keep practicing multithreading concepts." :
             "Keep learning to master multithreading!"}
          </p>
          <Button onClick={resetGame} className="bg-orange-600 hover:bg-orange-700">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Challenge Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="text-orange-500" />
            Challenge {currentChallenge + 1}: {challenges[currentChallenge].title}
          </CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <p className="font-semibold">{challenges[currentChallenge].description}</p>
            <p className="text-sm text-gray-600 mt-1">Reward: {challenges[currentChallenge].points} points</p>
          </div>
        </CardContent>
      </Card>

      {/* Thread Creation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="text-orange-500" />
              Thread Management
            </div>
            <div className="flex gap-2">
              <Button
                onClick={toggleExecution}
                variant={isRunning ? "destructive" : "default"}
                className={isRunning ? "" : "bg-orange-600 hover:bg-orange-700"}
              >
                {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isRunning ? 'Pause' : 'Start'} Execution
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {predefinedTasks.map((task, index) => (
              <Button
                key={index}
                onClick={() => createThread(task.name, task.task, task.priority)}
                variant="outline"
                className="text-left h-auto p-3"
              >
                <div>
                  <div className="font-semibold">{task.name}</div>
                  <div className="text-xs text-gray-500">{task.task}</div>
                  <Badge variant="secondary" className="mt-1">
                    Priority: {task.priority}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Thread Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Active Threads</CardTitle>
        </CardHeader>
        <CardContent>
          {threads.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No threads created yet. Click on a task above to create a thread.
            </div>
          ) : (
            <div className="space-y-4">
              {threads.map(thread => (
                <div
                  key={thread.id}
                  className={`border rounded-lg p-4 ${
                    thread.status === 'running' ? 'bg-green-50 border-green-200' :
                    thread.status === 'waiting' ? 'bg-yellow-50 border-yellow-200' :
                    thread.status === 'blocked' ? 'bg-red-50 border-red-200' :
                    'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{thread.name}</span>
                        <Badge variant={
                          thread.status === 'running' ? 'default' :
                          thread.status === 'waiting' ? 'secondary' :
                          thread.status === 'blocked' ? 'destructive' :
                          'outline'
                        }>
                          {thread.status}
                        </Badge>
                        <Badge variant="outline">Priority: {thread.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{thread.task}</p>
                    </div>
                    
                    {thread.status !== 'terminated' && (
                      <Button
                        onClick={() => terminateThread(thread.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Terminate
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(thread.progress)}%</span>
                    </div>
                    <Progress value={thread.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Multithreading Code Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`#include <pthread.h>
#include <stdio.h>
#include <unistd.h>

void* thread_function(void* arg) {
    int id = *(int*)arg;
    printf("Thread %d is running\\n", id);
    
    // Simulate work
    for(int i = 0; i < 5; i++) {
        printf("Thread %d: Working... %d\\n", id, i+1);
        sleep(1);
    }
    
    printf("Thread %d completed\\n", id);
    return NULL;
}

int main() {
    pthread_t threads[3];
    int thread_ids[3] = {1, 2, 3};
    
    // Create threads
    for(int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, 
                      thread_function, &thread_ids[i]);
    }
    
    // Wait for all threads to complete
    for(int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }
    
    printf("All threads completed\\n");
    return 0;
}`}</pre>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <div className="text-sm text-gray-600">
          Threads: {threads.length} | Running: {threads.filter(t => t.status === 'running').length}
        </div>
      </div>
    </div>
  );
};

export default MultithreadingGame;
