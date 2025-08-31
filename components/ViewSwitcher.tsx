
import React from 'react';

type ViewMode = 'student' | 'teacher';

interface ViewSwitcherProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ currentView, setView }) => {
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500";
  const activeClasses = "bg-indigo-600 text-white";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-end">
        <div className="flex items-center p-1 space-x-1 bg-slate-900/70 rounded-lg">
           <button
             onClick={() => setView('student')}
             className={`${baseClasses} ${currentView === 'student' ? activeClasses : inactiveClasses}`}
           >
            Tampilan Siswa
           </button>
           <button
             onClick={() => setView('teacher')}
             className={`${baseClasses} ${currentView === 'teacher' ? activeClasses : inactiveClasses}`}
           >
            Tampilan Guru
           </button>
        </div>
      </div>
    </div>
  );
};
