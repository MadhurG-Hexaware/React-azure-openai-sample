import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_DEPLOYMENT_NAME,
} from './azureConfig';

export class OpenAIService {
  private client: OpenAIClient | null = null;

  initialize(): { success: boolean; error?: string } {
    console.log('Initializing OpenAI Service...');
    try {
      if (!AZURE_OPENAI_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_DEPLOYMENT_NAME) {
        console.error('OpenAI Service initialization failed: Missing credentials');
        return {
          success: false,
          error: 'Azure OpenAI credentials are missing',
        };
      }

      this.client = new OpenAIClient(
        AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(AZURE_OPENAI_KEY)
      );
      console.log('OpenAI Service initialized successfully');
      return { success: true };
    } catch (error) {
      console.error('OpenAI Service initialization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to initialize OpenAI service',
      };
    }
  }

  async getCompletion(prompt: string): Promise<string> {
    console.log('Requesting OpenAI completion...', { prompt });
    if (!this.client) {
      console.error('Completion failed: OpenAI service not initialized');
      throw new Error('OpenAI service not initialized');
    }

    try {
      console.log('Sending request to OpenAI API...');
      const response = await this.client.getChatCompletions(
        AZURE_DEPLOYMENT_NAME,
        [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ]
      );

      const content = response.choices[0]?.message?.content || 'No response generated';
      console.log('OpenAI response received:', { content });
      return content;
    } catch (error) {
      console.error('Error getting completion:', error);
      throw error;
    }
  }
}