import React from 'react';
import { RobotIcon } from './icons/RobotIcon';

export const RobotProcessingLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48">
      <div className="relative">
        <RobotIcon className="h-16 w-16 text-indigo-400" />
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-400"></span>
        </span>
      </div>
      <p className="mt-6 text-slate-300 text-lg font-semibold tracking-wide">
        Robot sedang berpikir...
      </p>
      <div className="flex space-x-1 mt-2">
          <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-slate-500 rounded-full animate-pulse"></span>
      </div>
    </div>
  );
};
