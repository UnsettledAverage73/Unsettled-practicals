
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, RotateCcw, Plus, Zap } from 'lucide-react';

interface Process {
  id: string;
  arrivalTime: number;
  burstTime: number;
  completionTime?: number;
  waitingTime?: number;
  turnaroundTime?: number;
  startTime?: number;
  remainingTime?: number;
}

const SJFSchedulingGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', arrivalTime: 0, burstTime: 6 },
    { id: 'P2', arrivalTime: 1, burstTime: 8 },
    { id: 'P3', arrivalTime: 2, burstTime: 7 },
    { id: 'P4', arrivalTime: 3, burstTime: 3 }
  ]);
  
  const [newProcess, setNewProcess] = useState({ id: '', arrivalTime: 0, burstTime: 0 });
  const [isScheduled, setIsScheduled] = useState(false);
  const [schedulingType, setSchedulingType] = useState<'non-preemptive' | 'preemptive'>('non-preemptive');
  const [score, setScore] = useState(0);
  const [ganttChart, setGanttChart] = useState<Array<{processId: string, start: number, end: number}>>([]);

  const addProcess = () => {
    if (newProcess.id && newProcess.burstTime > 0) {
      setProcesses([...processes, { ...newProcess }]);
      setNewProcess({ id: '', arrivalTime: 0, burstTime: 0 });
      setScore(score + 5);
    }
  };

  const scheduleNonPreemptiveSJF = () => {
    const processQueue = [...processes];
    const scheduled: Process[] = [];
    const gantt: Array<{processId: string, start: number, end: number}> = [];
    let currentTime = 0;

    while (processQueue.length > 0) {
      // Get processes that have arrived
      const availableProcesses = processQueue.filter(p => p.arrivalTime <= currentTime);
      
      if (availableProcesses.length === 0) {
        // No process available, move time to next arrival
        currentTime = Math.min(...processQueue.map(p => p.arrivalTime));
        continue;
      }

      // Select process with shortest burst time (SJF)
      const shortestProcess = availableProcesses.reduce((shortest, current) => 
        current.burstTime < shortest.burstTime ? current : shortest
      );

      // Schedule the process
      const startTime = currentTime;
      const completionTime = currentTime + shortestProcess.burstTime;
      const turnaroundTime = completionTime - shortestProcess.arrivalTime;
      const waitingTime = turnaroundTime - shortestProcess.burstTime;

      scheduled.push({
        ...shortestProcess,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime
      });

      gantt.push({
        processId: shortestProcess.id,
        start: startTime,
        end: completionTime
      });

      currentTime = completionTime;
      
      // Remove the scheduled process from queue
      const index = processQueue.findIndex(p => p.id === shortestProcess.id);
      processQueue.splice(index, 1);
    }

    setProcesses(scheduled);
    setGanttChart(gantt);
    setIsScheduled(true);
    setScore(score + 60);
  };

  const schedulePreemptiveSJF = () => {
    const processQueue = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
    const scheduled: Process[] = [];
    const gantt: Array<{processId: string, start: number, end: number}> = [];
    let currentTime = 0;
    let completedProcesses = 0;
    const processStartTimes: {[key: string]: number} = {};

    while (completedProcesses < processes.length) {
      // Get processes that have arrived and not completed
      const availableProcesses = processQueue.filter(p => 
        p.arrivalTime <= currentTime && (p.remainingTime || 0) > 0
      );
      
      if (availableProcesses.length === 0) {
        currentTime++;
        continue;
      }

      // Select process with shortest remaining time
      const shortestProcess = availableProcesses.reduce((shortest, current) => 
        (current.remainingTime || 0) < (shortest.remainingTime || 0) ? current : shortest
      );

      // Record start time if first execution
      if (!processStartTimes[shortestProcess.id]) {
        processStartTimes[shortestProcess.id] = currentTime;
      }

      // Execute for 1 time unit
      if (shortestProcess.remainingTime) {
        shortestProcess.remainingTime--;
      }

      // Add to Gantt chart (merge consecutive segments)
      if (gantt.length > 0 && gantt[gantt.length - 1].processId === shortestProcess.id) {
        gantt[gantt.length - 1].end = currentTime + 1;
      } else {
        gantt.push({
          processId: shortestProcess.id,
          start: currentTime,
          end: currentTime + 1
        });
      }

      currentTime++;

      // Check if process completed
      if (shortestProcess.remainingTime === 0) {
        const completionTime = currentTime;
        const turnaroundTime = completionTime - shortestProcess.arrivalTime;
        const waitingTime = turnaroundTime - shortestProcess.burstTime;

        scheduled.push({
          ...shortestProcess,
          startTime: processStartTimes[shortestProcess.id],
          completionTime,
          turnaroundTime,
          waitingTime
        });

        completedProcesses++;
      }
    }

    // Sort by original order
    const sortedScheduled = processes.map(p => 
      scheduled.find(s => s.id === p.id) || p
    );

    setProcesses(sortedScheduled);
    setGanttChart(gantt);
    setIsScheduled(true);
    setScore(score + 80);
  };

  const scheduleSJF = () => {
    if (schedulingType === 'non-preemptive') {
      scheduleNonPreemptiveSJF();
    } else {
      schedulePreemptiveSJF();
    }
  };

  const resetScheduling = () => {
    setProcesses(processes.map(p => ({
      id: p.id,
      arrivalTime: p.arrivalTime,
      burstTime: p.burstTime
    })));
    setIsScheduled(false);
    setGanttChart([]);
  };

  const resetGame = () => {
    setProcesses([
      { id: 'P1', arrivalTime: 0, burstTime: 6 },
      { id: 'P2', arrivalTime: 1, burstTime: 8 },
      { id: 'P3', arrivalTime: 2, burstTime: 7 },
      { id: 'P4', arrivalTime: 3, burstTime: 3 }
    ]);
    setNewProcess({ id: '', arrivalTime: 0, burstTime: 0 });
    setIsScheduled(false);
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

  if (score >= 200) {
    setTimeout(() => onComplete(score), 1000);
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-yellow-500" />
            SJF (Shortest Job First) CPU Scheduling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="font-bold mb-2">SJF Algorithm:</h3>
            <p>Processes with the shortest burst time are executed first. Optimal for minimizing average waiting time.</p>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-preemptive"
                  checked={schedulingType === 'non-preemptive'}
                  onChange={(e) => setSchedulingType(e.target.value as 'non-preemptive')}
                />
                Non-Preemptive SJF
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="preemptive"
                  checked={schedulingType === 'preemptive'}
                  onChange={(e) => setSchedulingType(e.target.value as 'preemptive')}
                />
                Preemptive SJF (SRTF)
              </label>
            </div>
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
              onClick={scheduleSJF} 
              disabled={isScheduled}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              <Play className="mr-2 h-4 w-4" />
              Schedule {schedulingType === 'preemptive' ? 'SRTF' : 'SJF'}
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
                    className="border border-gray-400 bg-yellow-100 px-4 py-2 min-w-16 text-center font-semibold"
                    style={{ minWidth: `${Math.max((segment.end - segment.start) * 40, 60)}px` }}
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
                    style={{ minWidth: `${Math.max((segment.end - segment.start) * 40, 60)}px` }}
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

export default SJFSchedulingGame;
