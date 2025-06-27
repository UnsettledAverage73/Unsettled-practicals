
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { HardDrive, Plus, Trash2, RotateCcw, Cpu } from 'lucide-react';

interface MemoryBlock {
  id: number;
  size: number;
  allocated: boolean;
  processId?: string;
  startAddress: number;
}

interface Process {
  id: string;
  size: number;
  allocated: boolean;
  blockId?: number;
}

const FirstFitMemoryGame: React.FC<{ onComplete: (score: number) => void }> = ({ onComplete }) => {
  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>([
    { id: 1, size: 100, allocated: false, startAddress: 0 },
    { id: 2, size: 500, allocated: false, startAddress: 100 },
    { id: 3, size: 200, allocated: false, startAddress: 600 },
    { id: 4, size: 300, allocated: false, startAddress: 800 },
    { id: 5, size: 600, allocated: false, startAddress: 1100 }
  ]);

  const [processes, setProcesses] = useState<Process[]>([
    { id: 'P1', size: 212, allocated: false },
    { id: 'P2', size: 417, allocated: false },
    { id: 'P3', size: 112, allocated: false },
    { id: 'P4', size: 426, allocated: false }
  ]);

  const [newProcess, setNewProcess] = useState({ id: '', size: 0 });
  const [score, setScore] = useState(0);
  const [allocationHistory, setAllocationHistory] = useState<string[]>([]);

  const addProcess = () => {
    if (newProcess.id && newProcess.size > 0) {
      setProcesses([...processes, { ...newProcess, allocated: false }]);
      setNewProcess({ id: '', size: 0 });
      setScore(score + 5);
    }
  };

  const allocateMemory = (processId: string) => {
    const process = processes.find(p => p.id === processId);
    if (!process || process.allocated) return;

    // First Fit Algorithm: Find first block that can accommodate the process
    for (let block of memoryBlocks) {
      if (!block.allocated && block.size >= process.size) {
        // Allocate memory
        setMemoryBlocks(blocks => blocks.map(b => 
          b.id === block.id 
            ? { ...b, allocated: true, processId: process.id }
            : b
        ));

        setProcesses(procs => procs.map(p => 
          p.id === process.id 
            ? { ...p, allocated: true, blockId: block.id }
            : p
        ));

        setAllocationHistory(prev => [
          ...prev,
          `${process.id} (${process.size}KB) → Block ${block.id} (${block.size}KB)`
        ]);

        setScore(score + 20);
        break;
      }
    }
  };

  const deallocateMemory = (processId: string) => {
    const process = processes.find(p => p.id === processId);
    if (!process || !process.allocated) return;

    setMemoryBlocks(blocks => blocks.map(b => 
      b.processId === processId 
        ? { ...b, allocated: false, processId: undefined }
        : b
    ));

    setProcesses(procs => procs.map(p => 
      p.id === processId 
        ? { ...p, allocated: false, blockId: undefined }
        : p
    ));

    setAllocationHistory(prev => [
      ...prev,
      `${processId} deallocated`
    ]);

    setScore(score + 10);
  };

  const resetGame = () => {
    setMemoryBlocks([
      { id: 1, size: 100, allocated: false, startAddress: 0 },
      { id: 2, size: 500, allocated: false, startAddress: 100 },
      { id: 3, size: 200, allocated: false, startAddress: 600 },
      { id: 4, size: 300, allocated: false, startAddress: 800 },
      { id: 5, size: 600, allocated: false, startAddress: 1100 }
    ]);

    setProcesses([
      { id: 'P1', size: 212, allocated: false },
      { id: 'P2', size: 417, allocated: false },
      { id: 'P3', size: 112, allocated: false },
      { id: 'P4', size: 426, allocated: false }
    ]);

    setNewProcess({ id: '', size: 0 });
    setScore(0);
    setAllocationHistory([]);
  };

  const calculateFragmentation = () => {
    const totalMemory = memoryBlocks.reduce((sum, block) => sum + block.size, 0);
    const allocatedMemory = memoryBlocks
      .filter(block => block.allocated)
      .reduce((sum, block) => sum + block.size, 0);
    const freeMemory = totalMemory - allocatedMemory;
    
    const largestFreeBlock = Math.max(
      ...memoryBlocks.filter(block => !block.allocated).map(block => block.size),
      0
    );

    const fragmentation = largestFreeBlock > 0 ? 
      ((freeMemory - largestFreeBlock) / freeMemory) * 100 : 0;

    return {
      totalMemory,
      allocatedMemory,
      freeMemory,
      fragmentation: isNaN(fragmentation) ? 0 : fragmentation
    };
  };

  const memoryStats = calculateFragmentation();

  if (score >= 200) {
    setTimeout(() => onComplete(score), 1000);
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="text-purple-500" />
            First Fit Memory Allocation Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <h3 className="font-bold mb-2">First Fit Algorithm:</h3>
            <p>Allocates the first memory block that is large enough to accommodate the process. Simple and fast, but can lead to fragmentation.</p>
            <p className="mt-2"><strong>Advantages:</strong> Fast allocation, simple implementation</p>
            <p><strong>Disadvantages:</strong> May cause external fragmentation</p>
          </div>
        </CardContent>
      </Card>

      {/* Add Process */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Process</CardTitle>
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
              <label className="block text-sm font-medium mb-1">Size (KB)</label>
              <Input
                type="number"
                value={newProcess.size}
                onChange={(e) => setNewProcess({...newProcess, size: parseInt(e.target.value) || 0})}
                className="w-32"
              />
            </div>
            <Button onClick={addProcess} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Process
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memory Blocks */}
        <Card>
          <CardHeader>
            <CardTitle>Memory Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {memoryBlocks.map(block => (
                <div
                  key={block.id}
                  className={`border rounded-lg p-4 ${
                    block.allocated 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={block.allocated ? 'destructive' : 'default'}>
                          Block {block.id}
                        </Badge>
                        <span className="font-semibold">{block.size} KB</span>
                        <Badge variant="outline">
                          Addr: {block.startAddress}
                        </Badge>
                      </div>
                      {block.allocated && block.processId && (
                        <p className="text-sm text-red-600 mt-1">
                          Allocated to: {block.processId}
                        </p>
                      )}
                    </div>
                    
                    {block.allocated && block.processId && (
                      <Button
                        onClick={() => deallocateMemory(block.processId!)}
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Processes */}
        <Card>
          <CardHeader>
            <CardTitle>Processes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processes.map(process => (
                <div
                  key={process.id}
                  className={`border rounded-lg p-4 ${
                    process.allocated 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{process.id}</span>
                        <Badge variant="outline">{process.size} KB</Badge>
                        <Badge variant={process.allocated ? 'default' : 'secondary'}>
                          {process.allocated ? 'Allocated' : 'Waiting'}
                        </Badge>
                      </div>
                      {process.allocated && process.blockId && (
                        <p className="text-sm text-blue-600 mt-1">
                          Allocated to Block {process.blockId}
                        </p>
                      )}
                    </div>
                    
                    {!process.allocated && (
                      <Button
                        onClick={() => allocateMemory(process.id)}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <Cpu className="mr-2 h-4 w-4" />
                        Allocate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memory Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <h4 className="font-semibold text-blue-800">Total Memory</h4>
              <p className="text-2xl font-bold text-blue-600">{memoryStats.totalMemory} KB</p>
            </div>
            <div className="bg-red-50 border border-red-200 p-3 rounded">
              <h4 className="font-semibold text-red-800">Allocated</h4>
              <p className="text-2xl font-bold text-red-600">{memoryStats.allocatedMemory} KB</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-3 rounded">
              <h4 className="font-semibold text-green-800">Free Memory</h4>
              <p className="text-2xl font-bold text-green-600">{memoryStats.freeMemory} KB</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 p-3 rounded">
              <h4 className="font-semibold text-orange-800">Fragmentation</h4>
              <p className="text-2xl font-bold text-orange-600">{memoryStats.fragmentation.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Memory Representation */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {memoryBlocks.map(block => (
              <div key={block.id} className="flex items-center">
                <div className="w-16 text-sm">{block.startAddress}</div>
                <div
                  className={`h-8 border flex items-center justify-center text-sm font-semibold ${
                    block.allocated 
                      ? 'bg-red-200 border-red-300 text-red-800' 
                      : 'bg-green-200 border-green-300 text-green-800'
                  }`}
                  style={{ width: `${Math.max(block.size / 10, 50)}px` }}
                >
                  {block.processId || `B${block.id}`}
                </div>
                <div className="ml-2 text-sm">{block.size}KB</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allocation History */}
      {allocationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Allocation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-32 overflow-y-auto">
              {allocationHistory.map((entry, index) => (
                <div key={index}>{entry}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Code */}
      <Card>
        <CardHeader>
          <CardTitle>First Fit Algorithm Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>{`// First Fit Memory Allocation Algorithm
void firstFit(int blockSize[], int m, int processSize[], int n) {
    int allocation[n];
    
    // Initialize all allocations as -1 (not allocated)
    for (int i = 0; i < n; i++)
        allocation[i] = -1;
    
    // Pick each process and find suitable blocks
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (blockSize[j] >= processSize[i]) {
                // Allocate block j to process i
                allocation[i] = j;
                blockSize[j] -= processSize[i];
                break; // Move to next process
            }
        }
    }
}

// Time Complexity: O(m*n) where m = blocks, n = processes
// Space Complexity: O(n) for allocation array`}</pre>
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

export default FirstFitMemoryGame;
