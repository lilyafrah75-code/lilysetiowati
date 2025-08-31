import React from 'react';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { HelpCircleIcon } from './icons/HelpCircleIcon';

export type RobotStrategy = 'item-by-item' | 'batch';

interface InstructionPanelProps {
  instruction: string;
  setInstruction: (value: string) => void;
  strategy: RobotStrategy;
  setStrategy: (value: RobotStrategy) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({ instruction, setInstruction, strategy, setStrategy, onSubmit, isLoading }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <LightbulbIcon className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-indigo-400">Langkah 1: Beri Instruksi pada Robot</h2>
      </div>

      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircleIcon className="h-5 w-5 text-slate-400" />
          <h3 className="font-semibold text-slate-300">Petunjuk Singkat</h3>
        </div>
        <ol className="list-decimal list-inside text-slate-400 text-sm space-y-1">
          <li>Tulis instruksi untuk robot.</li>
          <li>Pilih strategi robot (Satu per Satu atau Ambil Semua Dulu).</li>
          <li>Klik tombol 'Buat Rencana Robot!'.</li>
        </ol>
      </div>

      <div className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-700 text-indigo-200 mb-6">
        <p className="font-bold">🤖 Misi Untukmu & Robotmu:</p>
        <p>
          Tuliskan sebuah instruksi dalam bahasa sehari-hari agar 'Robot' mengambil semua peralatan makan (piring, sendok, garpu, gelas) dari <strong>Area Dapur</strong>, lalu menatanya dengan benar di <strong>Area Meja Makan</strong>.
        </p>
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="instruction-input" className="font-medium text-slate-300">
            Ketik Instruksi untuk Robot di Sini:
          </label>
          <textarea
            id="instruction-input"
            rows={4}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Contoh: Robot, tolong siapkan meja makan untuk satu orang. Ambil semua alat makan dari dapur."
            className="mt-2 bg-slate-900 border border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out w-full resize-none"
            disabled={isLoading}
          />
        </div>

        <fieldset>
          <legend className="font-medium text-slate-300">Langkah 2: Pilih Strategi Robot</legend>
          <div className="mt-2 space-y-3">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="strategy-item-by-item"
                  aria-describedby="strategy-item-by-item-description"
                  name="strategy"
                  type="radio"
                  checked={strategy === 'item-by-item'}
                  onChange={() => setStrategy('item-by-item')}
                  disabled={isLoading}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-500 bg-slate-900"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="strategy-item-by-item" className="font-medium text-slate-200">
                  Satu per Satu (Kurang Efisien)
                </label>
                <p id="strategy-item-by-item-description" className="text-slate-400">
                  Robot bolak-balik untuk setiap barang.
                </p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="strategy-batch"
                  aria-describedby="strategy-batch-description"
                  name="strategy"
                  type="radio"
                  checked={strategy === 'batch'}
                  onChange={() => setStrategy('batch')}
                  disabled={isLoading}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-500 bg-slate-900"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="strategy-batch" className="font-medium text-slate-200">
                  Ambil Semua Dulu (Efisien)
                </label>
                <p id="strategy-batch-description" className="text-slate-400">
                  Robot mengumpulkan semua barang dulu, baru menata.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
        
        <button
          onClick={onSubmit}
          disabled={isLoading || !instruction.trim()}
          className="mt-2 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 disabled:bg-indigo-800/50 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Robot Sedang Memproses...' : 'Buat Rencana Robot!'}
        </button>
      </div>
    </div>
  );
};