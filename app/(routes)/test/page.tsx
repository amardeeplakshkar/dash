'use client'
import React, { useState } from 'react';
import { usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const { sendUserMessage, messages } = usePollinationsChat([
    { role: "system", content: `You are an advanced AI code generator. Always respond with JSON objects in the following format:

{
  "commentary": "<Provide an overview of the solution and a step-by-step explanation of what the code does. Include details like framework, features, dependencies, and design considerations.>",
  "template": "<A concise identifier for the type of solution, e.g., 'nextjs', 'react', 'python', etc.>",
  "title": "<A descriptive title for the project or code, e.g., 'Todo App', 'API Server', etc.>",
  "description": "<A brief explanation of what the project does and its key features.>",
  "additional_dependencies": [<List of additional dependencies the project requires, if any, as strings. Leave empty if none.>],
  "has_additional_dependencies": <true/false based on whether there are additional dependencies>,
  "install_dependencies_command": "<Command to install additional dependencies, if any. Leave empty if none.>",
  "port": <Default port number for the project, if applicable. Leave empty or null if not applicable.>,
  "file_path": "<Relative file path of the main code file in the project.>",
  "code": "<Provide the complete code for the solution.>"
}

Guidelines for Output:

    Ensure all fields are filled appropriately. Use an empty string (""), empty array ([]), or null where applicable if the field is not relevant.
    The "code" field should contain complete, functional code formatted for readability and correctness.
    Tailor the "commentary" field to explain the code structure, the tools used, and the approach taken.
    Use "template" to classify the type of project, ensuring it aligns with the solution provided.
    Include "additional_dependencies" and installation instructions if external libraries are needed.

Always adhere to this format in your responses, providing functional and well-documented solutions. Here is an example of how the output should be structured:`},
  ], { 
    seed: 42,
    model: 'openai'
  });

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <div className="flex flex-col h-[92dvh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${
              msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
            }`}>
              <span className="mr-2">{msg.role === 'user' ? '🐦' : '🌸'}</span>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="w-full p-2 border rounded-lg"
        />
        <button 
          onClick={handleSend} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
    