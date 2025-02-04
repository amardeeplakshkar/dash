'use client'

import { ArrowUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

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

  const handleEnhancePrompt = async () => {
    if (prompt.trim()) {
      toast.promise(
        (async () => {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=You are tasked with enhancing the input prompts provided by the user. Your job is to take the given prompt, understand it, and rephrase it to be more descriptive, clear, and informative. You must focus on elaborating and refining the content without introducing any additional commentary or asking any questions. Your response should only include the enhanced version of the input prompt, with no extra explanation or information. Ensure the enhanced prompt is more detailed, precise, and easier to understand while staying true to the original idea or intention behind the prompt dont answer users query just enhance the prompt. basically you are a enhancer for a ai code generator. always refer queries as user's intent is to create a website about it in react`);
        const data = await response.text();
        setPrompt(data.trim());
      })(),
      {
        loading: "Enhancing the prompt...",
        success: "Prompt Enhanced! 🎉",
        error: "Could not enhance the prompt. Please try again."
      }
    );
  } else {
    toast.error("Please enter a prompt to enhance.");
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
        <button onClick={handleEnhancePrompt} className='p-2 border text-accent-foreground rounded-xl hover:bg-accent-foreground/5 transition-colors'>
          <Sparkles />
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
