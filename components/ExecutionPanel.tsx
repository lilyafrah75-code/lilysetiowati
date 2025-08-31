import React from 'react';
import { RobotProcessingLoader } from './RobotProcessingLoader';
import { StepVisualizer } from './StepVisualizer';
import { RobotIcon } from './icons/RobotIcon';

interface ExecutionPanelProps {
  steps: string[];
  isLoading: boolean;
  error: string | null;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ steps, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <RobotProcessingLoader />
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-48 text-red-400 bg-red-900/20 rounded-lg p-4">
          <p>{error}</p>
        </div>
      );
    }
    
    if (steps.length > 0) {
      return (
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li 
              key={index} 
              className="bg-slate-700/30 border border-slate-700 p-3 rounded-lg animate-fade-in" 
              style={{ animationDelay: `${index * 100}ms` }}>
              <StepVisualizer step={step} />
            </li>
          ))}
        </ol>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500 text-center">
        <RobotIcon className="h-12 w-12 mb-4 text-slate-600" />
        <p className="font-semibold">Aku siap menerima perintah!</p>
        <p className="text-sm">Rencana langkah demi langkah robot akan muncul di sini.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg min-h-[20rem]">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">Langkah 3: Analisis Rencana Aksi Robot</h2>
      {renderContent()}
    </div>
  );
};