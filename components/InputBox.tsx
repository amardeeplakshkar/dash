'use client'

import { ArrowUp, Paperclip } from 'lucide-react';
import React, { useState } from 'react';

interface InputBoxProps {
  onSendMessage: (message: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSendMessage }) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleSend = () => {
    if (prompt.trim()) {
      onSendMessage(JSON.stringify(prompt));
      setPrompt('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  return (
    <div className='border p-2 rounded-2xl'>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="w-full p-2 border rounded-lg bg-transparent outline-none border-none resize-none"
        rows={2}
      />
      <div className='flex justify-between items-center'>
        <button className='p-2 border text-accent-foreground rounded-xl hover:bg-accent-foreground/5 transition-colors'>
          <Paperclip />
        </button>
        <button
          onClick={handleSend}
          className="p-2 bg-accent-foreground text-accent rounded-xl hover:bg-gray-200 transition-colors"
        >
          <ArrowUp />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
