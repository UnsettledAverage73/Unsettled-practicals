
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, RotateCcw, Plus } from 'lucide-react';

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  completionTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
  startTime?: number;
}

const FCFSSchedulingGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', arrivalTime: 0, burstTime: 5 },
    { id: 'P2', arrivalTime: 1, burstTime: 3 },
    { id: 'P3', arrivalTime: 2, burstTime: 8 },
    { id: 'P4', arrivalTime: 3, burstTime: 6 }
  ]);
  
  const [newProcess, setNewProcess] = useState({ id: '', arrivalTime: 0, burstTime: 0 });
  const [isScheduled, setIsScheduled] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [ganttChart, setGanttChart] = useState<Array<{processId: string, start: number, end: number}>>([]);

  const addProcess = () => {
    if (newProcess.id && newProcess.burstTime > 0) {
      setProcesses([...processes, { ...newProcess }]);
      setNewProcess({ id: '', arrivalTime: 0, burstTime: 0 });
      setScore(score + 5);
    }
  };

  const scheduleFCFS = () => {
    // Sort processes by arrival time (FCFS principle)
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
    let currentTime = 0;
    const scheduledProcesses: Process[] = [];
    const gantt: Array<{processId: string, start: number, end: number}> = [];

    sortedProcesses.forEach(process => {
      // If process arrives after current time, CPU is idle
      if (process.arrivalTime > currentTime) {
        currentTime = process.arrivalTime;
      }

      const startTime = currentTime;
      const completionTime = currentTime + process.burstTime;
      const turnaroundTime = completionTime - process.arrivalTime;
      const waitingTime = turnaroundTime - process.burstTime;

      scheduledProcesses.push({
        ...process,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime
      });

      gantt.push({
        processId: process.id,
        start: startTime,
        end: completionTime
      });

      currentTime = completionTime;
    });

    setProcesses(scheduledProcesses);
    setGanttChart(gantt);
    setCurrentTime(currentTime);
    setIsScheduled(true);
    setScore(score + 50);
  };

  const resetScheduling = () => {
    setProcesses(processes.map(p => ({
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime
    })));
    setIsScheduled(false);
    setCurrentTime(0);
    setGanttChart([]);
  };

  const resetGame = () => {
    setProcesses([
      { id: 'P1', arrivalTime: 0, burstTime: 5 },
      { id: 'P2', arrivalTime: 1, burstTime: 3 },
      { id: 'P3', arrivalTime: 2, burstTime: 8 },
      { id: 'P4', arrivalTime: 3, burstTime: 6 }
    ]);
    setNewProcess({ id: '', arrivalTime: 0, burstTime: 0 });
    setIsScheduled(false);
    setCurrentTime(0);
    setScore(0);
    setGanttChart([]);
  };

  const calculateAverages = () => {
    if (!isScheduled) return null;
    
    const avgWaitingTime = processes.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / processes.length;
    const avgTurnaroundTime = processes.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / processes.length;
    
    return { avgWaitingTime, avgTurnaroundTime };
  };

  const averages = calculateAverages();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="text-blue-500" />
            FCFS (First Come First Serve) CPU Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h3 className="font-bold mb-2">FCFS Algorithm:</h3>
            <p>Processes are executed in the order they arrive. The first process to arrive is the first to be served.</p>
            <p className="mt-2"><strong>Characteristics:</strong> Non-preemptive, simple to implement, may cause convoy effect.</p>
          </div>
        </CardContent>
      </Card>

      {/* Add Process */}
      <Card>
        <CardHeader>
          <CardTitle>Add Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1">Process ID</label>
              <Input
                value={newProcess.id}
                onChange={(e) => setNewProcess({...newProcess, id: e.target.value})}
                placeholder="P5"
                className="w-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Arrival Time</label>
              <Input
                type="number"
                value={newProcess.arrivalTime}
                onChange={(e) => setNewProcess({...newProcess, arrivalTime: parseInt(e.target.value) || 0})}
                className="w-32"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Burst Time</label>
              <Input
                type="number"
                value={newProcess.burstTime}
                onChange={(e) => setNewProcess({...newProcess, burstTime: parseInt(e.target.value) || 0})}
                className="w-32"
              />
            </div>
            <Button onClick={addProcess} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Process Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Process Table</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={scheduleFCFS} 
              disabled={isScheduled}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="mr-2 h-4 w-4" />
              Schedule FCFS
            </Button>
            <Button onClick={resetScheduling} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Process</th>
                  <th className="border border-gray-300 p-2">Arrival Time</th>
                  <th className="border border-gray-300 p-2">Burst Time</th>
                  {isScheduled && (
                    <>
                      <th className="border border-gray-300 p-2">Start Time</th>
                      <th className="border border-gray-300 p-2">Completion Time</th>
                      <th className="border border-gray-300 p-2">Waiting Time</th>
                      <th className="border border-gray-300 p-2">Turnaround Time</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {processes.map((process, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 font-semibold">{process.id}</td>
                    <td className="border border-gray-300 p-2">{process.arrivalTime}</td>
                    <td className="border border-gray-300 p-2">{process.burstTime}</td>
                    {isScheduled && (
                      <>
                        <td className="border border-gray-300 p-2">{process.startTime}</td>
                        <td className="border border-gray-300 p-2">{process.completionTime}</td>
                        <td className="border border-gray-300 p-2">{process.waitingTime}</td>
                        <td className="border border-gray-300 p-2">{process.turnaroundTime}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {averages && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <h4 className="font-semibold text-green-800">Average Waiting Time</h4>
                <p className="text-2xl font-bold text-green-600">{averages.avgWaitingTime.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                <h4 className="font-semibold text-blue-800">Average Turnaround Time</h4>
                <p className="text-2xl font-bold text-blue-600">{averages.avgTurnaroundTime.toFixed(2)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gantt Chart */}
      {isScheduled && ganttChart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Gantt Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center overflow-x-auto">
                {ganttChart.map((segment, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 bg-blue-100 px-4 py-2 min-w-16 text-center font-semibold"
                    style={{ width: `${segment.end - segment.start}0px` }}
                  >
                    {segment.processId}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center overflow-x-auto">
                {ganttChart.map((segment, index) => (
                  <div
                    key={index}
                    className="text-xs text-center border-r border-gray-300"
                    style={{ width: `${segment.end - segment.start}0px` }}
                  >
                    {segment.start}
                    {index === ganttChart.length - 1 && (
                      <span className="ml-2">{segment.end}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>FCFS Algorithm Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`// FCFS Scheduling Algorithm
1. Sort processes by arrival time
2. For each process in order:
   a. If arrival time > current time:
      current_time = arrival_time
   b. start_time = current_time
   c. completion_time = start_time + burst_time
   d. turnaround_time = completion_time - arrival_time
   e. waiting_time = turnaround_time - burst_time
   f. current_time = completion_time

// Characteristics:
- Non-preemptive scheduling
- Simple to understand and implement
- May suffer from convoy effect
- Average performance metrics`}</pre>
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

export default FCFSSchedulingGame;
