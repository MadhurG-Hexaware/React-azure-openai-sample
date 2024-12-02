# Voice Chat with Azure

Voice Chat with Azure is a React application that leverages Azure services to enable voice communication and interaction with a chat system using OpenAI's GPT-3 model.

## Features

- **Real-time Voice Communication**: Utilizes Microsoft Azure Speech Service for transcription and synthesis.
- **Chat Interaction**: Interacts with an OpenAI language model to process text-based queries and generate responses.
- **User Interface**: A modern React application with Tailwind CSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or later)
2. **npm** (or **yarn**)
3. **Azure Account**: Ensure you have an Azure subscription and created the necessary resources for Speech Service and OpenAI.
   - **Azure Speech Service**: Create a resource and note down the `Subscription Key` and `Region`.
   - **OpenAI**: Create a resource and note down the `API Key` and `Endpoint`.

## Setup

1. **Clone the Repository**:

    ```sh
    git clone https://github.com/your-repo/voice-chat-azure.git
    cd voice-chat-azure
    ```

2. **Set Environment Variables**:
   - Create a `.env.development` file in the root of your project.
   - Add the following variables, replacing the placeholders with your actual Azure credentials:

        ```plaintext
        VITE_AZURE_SPEECH_KEY=your-speech-key
        VITE_AZURE_SPEECH_REGION=your-speech-region
        VITE_AZURE_OPENAI_KEY=your-openai-key
        VITE_AZURE_OPENAI_ENDPOINT=https://your-openai-endpoint.openai.azure.com
        VITE_AZURE_DEPLOYMENT_NAME=your-deployment-name
        ```

3. **Install Dependencies**:

    ```sh
    npm install
    # or
    yarn install
    ```

4. **Run the Development Server**:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:3000` (or another port specified).

## Usage

1. **Transcription**: Start a voice conversation by clicking on the microphone icon.
2. **Chat Interaction**: The application will transcribe your speech and send it to the Azure OpenAI model for processing. The response will be displayed in the chat window.

## Customization

- **Tailwind CSS**: Customize the look and feel of the application by modifying `index.css` or adding new styles.
- **API Endpoints**: Update the `AZURE_OPENAI_ENDPOINT` and `AZURE_DEPLOYMENT_NAME` in `.env.development` to use a different deployment.

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for more information on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.