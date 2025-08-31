
import React, { useState, useEffect } from 'react';
import { RobotIcon } from './icons/RobotIcon';

interface LkpdHeaderProps {
  groupName: string;
  groupMembers: string;
  onGroupInfoChange: (name: string, members: string) => void;
  score: number;
}

export const LkpdHeader: React.FC<LkpdHeaderProps> = ({ groupName, groupMembers, onGroupInfoChange, score }) => {
  const [localGroupName, setLocalGroupName] = useState(groupName);
  const [localGroupMembers, setLocalGroupMembers] = useState(groupMembers);

  useEffect(() => {
    const handler = setTimeout(() => {
      onGroupInfoChange(localGroupName, localGroupMembers);
    }, 500); // Debounce input

    return () => {
      clearTimeout(handler);
    };
  }, [localGroupName, localGroupMembers, onGroupInfoChange]);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-12 z-10 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <RobotIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              LKPD: Algoritma Robot Penata Meja
            </h1>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Nama Kelompok"
              value={localGroupName}
              onChange={(e) => setLocalGroupName(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Anggota (pisahkan dengan koma)"
              value={localGroupMembers}
              onChange={(e) => setLocalGroupMembers(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
           <div className="bg-indigo-600 text-white font-bold rounded-lg px-4 py-2 text-center">
            SKOR: {score}
          </div>
        </div>
      </div>
    </header>
  );
};
