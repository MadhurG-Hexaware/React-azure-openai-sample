import { create } from 'zustand';
import { ChatMessage } from '../types/chat';

interface ChatStore {
  messages: ChatMessage[];
  isRecording: boolean;
  isProcessing: boolean;
  currentAudio: HTMLAudioElement | null;
  addMessage: (message: ChatMessage) => void;
  setIsRecording: (isRecording: boolean) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  stopCurrentAudio: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isRecording: false,
  isProcessing: false,
  currentAudio: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsRecording: (isRecording) => set({ isRecording }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  setCurrentAudio: (audio) => {
    const { currentAudio } = get();
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    set({ currentAudio: audio });
  },
  stopCurrentAudio: () => {
    const { currentAudio } = get();
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      set({ currentAudio: null });
    }
  },
}));