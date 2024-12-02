import React, { useCallback, useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from './components/ChatMessage';
import { RecordButton } from './components/RecordButton';
import { SpeechService } from './services/speechService';
import { OpenAIService } from './services/openAIService';
import { useChatStore } from './store/useChatStore';
import { validateAzureCredentials } from './services/serviceInitializer';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    addMessage, 
    setIsRecording, 
    setIsProcessing,
    stopCurrentAudio 
  } = useChatStore();

  const speechService = React.useMemo(() => new SpeechService(), []);
  const openAIService = React.useMemo(() => new OpenAIService(), []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('Starting service initialization...');
    const initializeServices = () => {
      const validation = validateAzureCredentials();
      if (!validation.isValid) {
        console.error('Validation failed:', validation.error);
        setError(validation.error);
        return;
      }

      const speechInit = speechService.initialize();
      if (!speechInit.success) {
        console.error('Speech service initialization failed:', speechInit.error);
        setError(speechInit.error);
        return;
      }

      const openAIInit = openAIService.initialize();
      if (!openAIInit.success) {
        console.error('OpenAI service initialization failed:', openAIInit.error);
        setError(openAIInit.error);
        return;
      }

      console.log('All services initialized successfully');
      setIsInitialized(true);
    };

    initializeServices();
  }, [speechService, openAIService]);

  const handleRecord = useCallback(async () => {
    console.log('Record button clicked');
    if (!isInitialized) {
      const errorMsg = 'Services not initialized. Please check your configuration.';
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    try {
      stopCurrentAudio();
      setError(null);
      setIsRecording(true);
      console.log('Starting recording...');
      const userText = await speechService.startRecording();
      console.log('Recording completed:', userText);
      
      addMessage({
        id: uuidv4(),
        role: 'user',
        content: userText,
        timestamp: new Date(),
      });

      setIsRecording(false);
      setIsProcessing(true);
      console.log('Processing message...');

      const aiResponse = await openAIService.getCompletion(userText);
      console.log('AI response received:', aiResponse);
      
      console.log('Synthesizing speech...');
      const audioData = await speechService.synthesizeSpeech(aiResponse);
      const audioUrl = URL.createObjectURL(
        new Blob([audioData], { type: 'audio/wav' })
      );
      console.log('Speech synthesis completed');

      addMessage({
        id: uuidv4(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        audioUrl,
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'An error occurred';
      console.error('Error in handleRecord:', errorMsg);
      setError(errorMsg);
    } finally {
      setIsProcessing(false);
      console.log('Message processing completed');
    }
  }, [
    addMessage, 
    setIsRecording, 
    setIsProcessing, 
    isInitialized, 
    speechService, 
    openAIService,
    stopCurrentAudio
  ]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-semibold text-center">Voice Chat Assistant</h1>
      </header>

      <main className="flex-1 container mx-auto max-w-2xl p-4 overflow-hidden">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="space-y-4 h-[calc(100vh-16rem)] overflow-y-auto pr-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white shadow-sm p-4">
        <div className="container mx-auto max-w-2xl flex justify-center">
          <RecordButton onRecord={handleRecord} />
        </div>
      </footer>
    </div>
  );
}

export default App;