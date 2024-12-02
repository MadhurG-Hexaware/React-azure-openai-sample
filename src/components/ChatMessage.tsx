import React, { useRef, useEffect } from 'react';
import { Mic, Speaker } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { useChatStore } from '../store/useChatStore';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setCurrentAudio } = useChatStore();

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handlePlay = () => {
        setCurrentAudio(audio);
      };

      const handleEnded = () => {
        setCurrentAudio(null);
      };

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handleEnded);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handleEnded);
      };
    }
  }, [setCurrentAudio]);

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4 gap-2`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          {isUser ? <Mic size={16} /> : <Speaker size={16} />}
          <span className="text-sm">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm">{message.content}</p>
        {message.audioUrl && (
          <audio ref={audioRef} controls className="mt-2 w-full">
            <source src={message.audioUrl} type="audio/wav" />
          </audio>
        )}
      </div>
    </div>
  );
}