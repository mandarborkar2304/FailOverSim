import React from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';

interface ControlPanelProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onTriggerFailure: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isSimulating,
  onToggleSimulation,
  onTriggerFailure,
  onReset,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Simulation Controls</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onToggleSimulation}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
            isSimulating
              ? 'bg-red-600/80 hover:bg-red-600'
              : 'bg-green-600/80 hover:bg-green-600'
          }`}
        >
          {isSimulating ? (
            <>
              <Pause size={18} /> Pause
            </>
          ) : (
            <>
              <Play size={18} /> Start
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/80 hover:bg-blue-600 rounded-lg font-medium transition-colors"
        >
          <RotateCcw size={18} />
          Reset
        </button>

        <button
          onClick={onTriggerFailure}
          className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600/80 hover:bg-yellow-600 rounded-lg font-medium transition-colors"
        >
          <AlertTriangle size={18} />
          Trigger Failure
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;