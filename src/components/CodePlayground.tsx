"use client";

import { useState } from 'react';

interface CodePlaygroundProps {
  initialCode: string;
  title?: string;
  description?: string;
}

export default function CodePlayground({ 
  initialCode, 
  title = "Code Playground",
  description = "Edit the code below and see how it works:"
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput(["Running code...", "This is a simulation - in real life, this would control your LEGO robot!"]);
    
    // Simulate code execution
    setTimeout(() => {
      const simulatedOutput = simulateCodeExecution(code);
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
  };

  const simulateCodeExecution = (code: string): string[] => {
    const output: string[] = [];
    
    // Simple simulation of common robot commands
    if (code.includes('print(')) {
      const printMatches = code.match(/print\([^)]+\)/g);
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.replace(/print\(['"`](.+?)['"`]\)/, '$1');
          output.push(`> ${content}`);
        });
      }
    }
    
    if (code.includes('move_forward')) {
      output.push("🤖 Robot moving forward...");
    }
    
    if (code.includes('turn_angle')) {
      output.push("🔄 Robot turning...");
    }
    
    if (code.includes('distance_sensor')) {
      output.push("📡 Reading distance sensor: 45 cm");
    }
    
    if (code.includes('color_sensor')) {
      output.push("🎨 Color detected: RED");
    }
    
    if (code.includes('for') && code.includes('range')) {
      output.push("🔄 Executing loop...");
    }
    
    if (code.includes('while')) {
      output.push("🔄 Starting while loop...");
      output.push("⏹️ Loop condition met - stopping");
    }
    
    if (output.length === 0) {
      output.push("✅ Code executed successfully!");
      output.push("💡 Tip: Add print() statements to see more output");
    }
    
    return output;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Python Code
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={resetCode}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {isRunning ? "Running..." : "▶ Run"}
                </button>
              </div>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 font-mono text-sm border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Python code here..."
            />
          </div>
          
          {/* Output */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Simulation Output
            </label>
            <div className="h-64 bg-gray-900 text-green-400 font-mono text-sm rounded p-3 overflow-y-auto">              {output.length === 0 ? (
                <div className="text-gray-500">
                  Click &quot;Run&quot; to see output...
                </div>
              ) : (
                output.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for experimentation:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Try changing speed values and distances</li>
            <li>• Add print() statements to debug your code</li>
            <li>• Experiment with different loop ranges</li>
            <li>• This is a simulation - real robot behavior may vary</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
