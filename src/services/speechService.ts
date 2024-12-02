import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';
import { AZURE_SPEECH_KEY, AZURE_SPEECH_REGION } from './azureConfig';

export class SpeechService {
  private speechConfig: speechsdk.SpeechConfig | null = null;

  initialize(): { success: boolean; error?: string } {
    console.log('Initializing Speech Service...');
    try {
      if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
        console.error('Speech Service initialization failed: Missing credentials');
        return {
          success: false,
          error: 'Azure Speech credentials are missing',
        };
      }

      this.speechConfig = speechsdk.SpeechConfig.fromSubscription(
        AZURE_SPEECH_KEY,
        AZURE_SPEECH_REGION
      );
      this.speechConfig.speechRecognitionLanguage = 'en-US';
      this.speechConfig.speechSynthesisLanguage = 'en-US';
      console.log('Speech Service initialized successfully');
      return { success: true };
    } catch (error) {
      console.error('Speech Service initialization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to initialize speech service',
      };
    }
  }

  async startRecording(): Promise<string> {
    console.log('Starting speech recording...');
    if (!this.speechConfig) {
      console.error('Recording failed: Speech service not initialized');
      throw new Error('Speech service not initialized');
    }

    return new Promise((resolve, reject) => {
      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        this.speechConfig!,
        audioConfig
      );

      console.log('Speech recognizer created, waiting for audio...');

      recognizer.recognizing = (s, e) => {
        console.log(`RECOGNIZING: Text=${e.result.text}`);
      };

      recognizer.recognized = (s, e) => {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
      };

      recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
      };

      recognizer.recognizeOnceAsync(
        (result) => {
          if (result.text) {
            console.log('Recognition successful:', result.text);
            resolve(result.text);
          } else {
            console.error('No speech detected');
            reject(new Error('No speech detected'));
          }
        },
        (error) => {
          console.error('Recognition error:', error);
          reject(error);
        }
      );
    });
  }

  async synthesizeSpeech(text: string): Promise<ArrayBuffer> {
    console.log('Starting speech synthesis...', { text });
    if (!this.speechConfig) {
      console.error('Synthesis failed: Speech service not initialized');
      throw new Error('Speech service not initialized');
    }

    return new Promise((resolve, reject) => {
      const synthesizer = new speechsdk.SpeechSynthesizer(this.speechConfig!);

      synthesizer.synthesizing = (s, e) => {
        console.log('Synthesis in progress...');
      };

      synthesizer.synthesisCompleted = (s, e) => {
        console.log('Synthesis completed');
      };

      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.audioData) {
            console.log('Synthesis successful, audio data length:', result.audioData.byteLength);
            resolve(result.audioData);
          } else {
            console.error('Speech synthesis failed: No audio data');
            reject(new Error('Speech synthesis failed'));
          }
        },
        (error) => {
          console.error('Synthesis error:', error);
          reject(error);
        }
      );
    });
  }
}