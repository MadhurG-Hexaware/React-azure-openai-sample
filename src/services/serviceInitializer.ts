import { AZURE_SPEECH_KEY, AZURE_SPEECH_REGION, AZURE_OPENAI_KEY, AZURE_OPENAI_ENDPOINT } from './azureConfig';

export function validateAzureCredentials(): { isValid: boolean; error?: string } {
  if (!AZURE_SPEECH_KEY || !AZURE_SPEECH_REGION) {
    return {
      isValid: false,
      error: 'Azure Speech credentials are missing. Please check your environment variables.',
    };
  }

  if (!AZURE_OPENAI_KEY || !AZURE_OPENAI_ENDPOINT) {
    return {
      isValid: false,
      error: 'Azure OpenAI credentials are missing. Please check your environment variables.',
    };
  }

  return { isValid: true };
}