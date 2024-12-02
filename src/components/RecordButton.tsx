import React from 'react';
import { Mic, Loader2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

interface Props {
  onRecord: () => void;
}

export const RecordButton: React.FC<Props> = ({ onRecord }) => {
  const { isRecording, isProcessing } = useChatStore();

  return (
    <button
      onClick={onRecord}
      disabled={isRecording || isProcessing}
      className={`p-4 rounded-full ${
        isRecording
          ? 'bg-red-500 animate-pulse'
          : isProcessing
          ? 'bg-gray-400'
          : 'bg-blue-500 hover:bg-blue-600'
      } text-white transition-colors`}
    >
      {isProcessing ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <Mic className="w-6 h-6" />
      )}
    </button>
  );
}