import React, { useState, useEffect } from 'react';
import { RobotIcon } from './icons/RobotIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { ResetIcon } from './icons/ResetIcon';

interface LkpdHeaderProps {
  groupName: string;
  groupMembers: string;
  onGroupInfoChange: (name: string, members: string) => void;
  score: number;
  onReset: () => void;
}

export const LkpdHeader: React.FC<LkpdHeaderProps> = ({ groupName, groupMembers, onGroupInfoChange, score, onReset }) => {
  const [localGroupName, setLocalGroupName] = useState(groupName);
  const [localGroupMembers, setLocalGroupMembers] = useState(groupMembers);

  useEffect(() => {
    setLocalGroupName(groupName);
    setLocalGroupMembers(groupMembers);
  }, [groupName, groupMembers]);

  useEffect(() => {
    const handler = setTimeout(() => {
      // Only call the parent if the values have actually changed from what was passed in props
      if (localGroupName !== groupName || localGroupMembers !== groupMembers) {
        onGroupInfoChange(localGroupName, localGroupMembers);
      }
    }, 500); // Debounce input

    return () => {
      clearTimeout(handler);
    };
  }, [localGroupName, localGroupMembers, groupName, groupMembers, onGroupInfoChange]);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-12 z-10 p-4 mb-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <RobotIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              LKPD: Algoritma Robot Penata Meja
            </h1>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Nama Kelompok"
              value={localGroupName}
              onChange={(e) => setLocalGroupName(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            />
            <input
              type="text"
              placeholder="Anggota (pisahkan koma)"
              value={localGroupMembers}
              onChange={(e) => setLocalGroupMembers(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            />
             <div className="flex items-center gap-2 bg-indigo-600 text-white font-bold rounded-lg px-4 py-2 text-center">
              <TrophyIcon className="h-5 w-5"/>
              <span>SKOR: {score}</span>
            </div>
            <button
                onClick={onReset}
                title="Mulai Baru"
                className="p-2 rounded-md bg-rose-800/50 text-rose-300 hover:bg-rose-700/50 transition-colors"
            >
                <ResetIcon className="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};