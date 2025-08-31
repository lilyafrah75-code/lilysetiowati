import React from 'react';
import { UsersIcon } from './icons/UsersIcon';
import { CogsIcon } from './icons/CogsIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

export interface Progress {
  groupInfo: boolean;
  instructionGenerated: boolean;
  reflection1: boolean;
  reflection2: boolean;
  reflection3: boolean;
}

interface TeacherDashboardProps {
  progress: Progress;
  groupName: string;
  groupMembers: string;
}

interface ProgressItemProps {
    label: string;
    completed: boolean;
    icon: React.ReactNode;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ label, completed, icon }) => (
  <li className={`flex items-center justify-between p-4 rounded-lg transition-colors ${completed ? 'bg-green-800/50' : 'bg-slate-700/50'}`}>
    <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
    </div>
    <span className={`font-bold text-sm px-3 py-1 rounded-full ${completed ? 'bg-green-400 text-green-900' : 'bg-slate-500 text-slate-900'}`}>
      {completed ? 'Selesai' : 'Belum'}
    </span>
  </li>
);

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ progress, groupName, groupMembers }) => {
  const completionPercentage = (Object.values(progress).filter(Boolean).length / Object.values(progress).length) * 100;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h1 className="text-2xl font-bold text-indigo-400 mb-2">Dasbor Guru: Progres Siswa</h1>
        <p className="text-slate-400 mb-6">Pantau mobilisasi dan pengerjaan LKPD oleh kelompok.</p>
        
        <div className="mb-6 bg-slate-900/50 p-4 rounded-lg">
          <h2 className="font-semibold text-lg text-slate-200">Informasi Kelompok</h2>
          <p className="text-slate-400"><strong className="text-slate-300">Nama:</strong> {groupName || 'Belum diisi'}</p>
          <p className="text-slate-400"><strong className="text-slate-300">Anggota:</strong> {groupMembers || 'Belum diisi'}</p>
        </div>

        <div className="mb-6">
            <h2 className="font-semibold text-lg text-slate-200 mb-2">Progres Pengerjaan ({completionPercentage.toFixed(0)}%)</h2>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
            </div>
        </div>

        <ul className="space-y-3">
          <ProgressItem label="1. Mengisi Informasi Kelompok" completed={progress.groupInfo} icon={<UsersIcon className="h-5 w-5 text-slate-400"/>} />
          <ProgressItem label="2. Membuat Rencana Robot" completed={progress.instructionGenerated} icon={<CogsIcon className="h-5 w-5 text-slate-400"/>} />
          <ProgressItem label="3. Menjawab Soal Diskusi #1" completed={progress.reflection1} icon={<ChatBubbleIcon className="h-5 w-5 text-slate-400"/>} />
          <ProgressItem label="4. Menjawab Soal Diskusi #2" completed={progress.reflection2} icon={<ChatBubbleIcon className="h-5 w-5 text-slate-400"/>} />
          <ProgressItem label="5. Menjawab Soal Diskusi #3" completed={progress.reflection3} icon={<ChatBubbleIcon className="h-5 w-5 text-slate-400"/>} />
        </ul>
      </div>
    </div>
  );
};