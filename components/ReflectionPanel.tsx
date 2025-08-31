import React, { useState } from 'react';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';

interface ReflectionItemProps {
  id: 'reflection1' | 'reflection2' | 'reflection3';
  question: React.ReactNode;
  value: string;
  onAnswerChange: (id: 'reflection1' | 'reflection2' | 'reflection3', value: string) => void;
  onAnswered: (id: 'reflection1' | 'reflection2' | 'reflection3') => void;
}

const ReflectionItem: React.FC<ReflectionItemProps> = ({ id, question, value, onAnswerChange, onAnswered }) => {
  const [wasAnswered, setWasAnswered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange(id, e.target.value);
    if (e.target.value.trim().length > 5 && !wasAnswered) {
      onAnswered(id);
      setWasAnswered(true);
    }
  };
  
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium text-slate-300">
        {question}
      </label>
      <textarea
        id={id}
        rows={3}
        value={value}
        onChange={handleChange}
        className="bg-slate-900 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out w-full resize-y"
        placeholder="Tuliskan hasil diskusimu..."
      />
    </div>
  );
};

interface ReflectionPanelProps {
  answers: {
    reflection1: string;
    reflection2: string;
    reflection3: string;
  };
  onAnswerChange: (id: 'reflection1' | 'reflection2' | 'reflection3', value: string) => void;
  onAnswered: (id: 'reflection1' | 'reflection2' | 'reflection3') => void;
}


export const ReflectionPanel: React.FC<ReflectionPanelProps> = ({ answers, onAnswerChange, onAnswered }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg lg:sticky lg:top-44">
      <div className="flex items-center gap-3 mb-6">
        <ChatBubbleIcon className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-indigo-400">Langkah 4: Waktunya Berdiskusi!</h2>
      </div>
      <div className="space-y-6">
        <ReflectionItem
          id="reflection1"
          question={<>1. Apakah 'Robot' berhasil menata meja dengan benar pada percobaan pertama? Menurutmu, bagian mana dari instruksimu yang paling penting untuk keberhasilan ini?</>}
          value={answers.reflection1}
          onAnswerChange={onAnswerChange}
          onAnswered={onAnswered}
        />
        <ReflectionItem
          id="reflection2"
          question={<>2. Apa yang akan terjadi jika urutan instruksi 'AMBIL' dan 'TARUH' pada kodemu tertukar? Hubungkan dengan pengalamanmu saat mengikuti resep masakan!</>}
          value={answers.reflection2}
          onAnswerChange={onAnswerChange}
          onAnswered={onAnswered}
        />
        <ReflectionItem
          id="reflection3"
          question={<>3. Selain menata meja atau memasak, sebutkan minimal 2 aktivitas sehari-hari lain yang menurutmu mirip dengan mengikuti sebuah algoritma. Jelaskan kenapa!</>}
          value={answers.reflection3}
          onAnswerChange={onAnswerChange}
          onAnswered={onAnswered}
        />
      </div>
    </div>
  );
};