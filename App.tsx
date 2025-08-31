import React, { useState, useCallback, useEffect } from 'react';
import { LkpdHeader } from './components/LkpdHeader';
import { InstructionPanel, RobotStrategy } from './components/InstructionPanel';
import { ExecutionPanel } from './components/ExecutionPanel';
import { ReflectionPanel } from './components/ReflectionPanel';
import { generateRobotSteps } from './services/geminiService';
import { TeacherDashboard, Progress } from './components/TeacherDashboard';
import { ViewSwitcher } from './components/ViewSwitcher';

type ViewMode = 'student' | 'teacher';

interface ReflectionAnswers {
  reflection1: string;
  reflection2: string;
  reflection3: string;
}

interface LkpdState {
  groupName: string;
  groupMembers: string;
  score: number;
  progress: Progress;
  instruction: string;
  strategy: RobotStrategy;
  robotSteps: string[];
  reflectionAnswers: ReflectionAnswers;
}

const initialLkpdState: LkpdState = {
  groupName: '',
  groupMembers: '',
  score: 0,
  progress: {
    groupInfo: false,
    instructionGenerated: false,
    reflection1: false,
    reflection2: false,
    reflection3: false,
  },
  instruction: '',
  strategy: 'item-by-item',
  robotSteps: [],
  reflectionAnswers: {
    reflection1: '',
    reflection2: '',
    reflection3: '',
  },
};

const App: React.FC = () => {
  const [lkpdState, setLkpdState] = useState<LkpdState>(() => {
    try {
      const savedState = localStorage.getItem('lkpdState');
      return savedState ? JSON.parse(savedState) : initialLkpdState;
    } catch (error) {
      console.error("Failed to parse state from localStorage", error);
      return initialLkpdState;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('student');

  useEffect(() => {
    localStorage.setItem('lkpdState', JSON.stringify(lkpdState));
  }, [lkpdState]);

  const updateScoreAndProgress = useCallback((key: keyof Progress, points: number) => {
    setLkpdState(prev => {
      if (!prev.progress[key]) {
        return {
          ...prev,
          score: prev.score + points,
          progress: { ...prev.progress, [key]: true },
        };
      }
      return prev;
    });
  }, []);

  const handleGroupInfoChange = useCallback((name: string, members: string) => {
    setLkpdState(prev => ({ ...prev, groupName: name, groupMembers: members }));
    if (name.trim() && members.trim()) {
      updateScoreAndProgress('groupInfo', 10);
    }
  }, [updateScoreAndProgress]);

  const handleInstructionSubmit = useCallback(async () => {
    if (!lkpdState.instruction.trim()) {
      setError("Instruksi tidak boleh kosong.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setLkpdState(prev => ({ ...prev, robotSteps: [] }));

    try {
      const steps = await generateRobotSteps(lkpdState.instruction, lkpdState.strategy);
      setLkpdState(prev => ({ ...prev, robotSteps: steps }));
      if (steps.length > 0) {
        updateScoreAndProgress('instructionGenerated', 30);
      }
    } catch (err) {
      setError("Gagal menghasilkan langkah-langkah. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [lkpdState.instruction, lkpdState.strategy, updateScoreAndProgress]);
  
  const handleReflectionChange = useCallback((id: keyof ReflectionAnswers, value: string) => {
      setLkpdState(prev => ({
        ...prev,
        reflectionAnswers: {
            ...prev.reflectionAnswers,
            [id]: value
        }
      }));
  }, []);
  
  const handleReset = () => {
    if (window.confirm("Apakah Anda yakin ingin memulai ulang LKPD? Semua progres akan dihapus.")) {
        localStorage.removeItem('lkpdState');
        setLkpdState(initialLkpdState);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 font-sans">
      <ViewSwitcher currentView={viewMode} setView={setViewMode} />
      
      {viewMode === 'student' ? (
        <div className="pt-28">
          <LkpdHeader 
            groupName={lkpdState.groupName}
            groupMembers={lkpdState.groupMembers}
            onGroupInfoChange={handleGroupInfoChange}
            score={lkpdState.score}
            onReset={handleReset}
          />
          <main className="container mx-auto p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-8">
                <InstructionPanel 
                  instruction={lkpdState.instruction}
                  setInstruction={(value) => setLkpdState(prev => ({...prev, instruction: value}))}
                  strategy={lkpdState.strategy}
                  setStrategy={(value) => setLkpdState(prev => ({...prev, strategy: value}))}
                  onSubmit={handleInstructionSubmit}
                  isLoading={isLoading}
                />
                <ExecutionPanel 
                  steps={lkpdState.robotSteps}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
              <ReflectionPanel 
                answers={lkpdState.reflectionAnswers}
                onAnswerChange={handleReflectionChange}
                onAnswered={(id) => {
                  if (id === 'reflection1') updateScoreAndProgress('reflection1', 20);
                  if (id === 'reflection2') updateScoreAndProgress('reflection2', 20);
                  if (id === 'reflection3') updateScoreAndProgress('reflection3', 20);
                }}
              />
            </div>
          </main>
        </div>
      ) : (
        <div className="pt-12">
            <TeacherDashboard progress={lkpdState.progress} groupName={lkpdState.groupName} groupMembers={lkpdState.groupMembers} />
        </div>
      )}

      <footer className="text-center p-4 text-slate-500 text-sm">
        Didukung oleh Gemini API
      </footer>
    </div>
  );
};

export default App;