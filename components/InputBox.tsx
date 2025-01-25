'use client'

import React, { useState } from 'react';

interface InputBoxProps {
  onSendMessage: (message: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSend = () => {
    if (prompt.trim()) {
      onSendMessage(prompt as string);
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="w-full p-2 border rounded-lg bg-transparent"
      />
      <button
        onClick={handleSend}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox;
