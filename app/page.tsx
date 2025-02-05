'use client'
import { useUserPrompt } from '@/components/context/UserPrompt'
import { Button } from '@/components/ui/button'
import { DemoApps } from '@/constant/DemoApps'
import { ArrowUp, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
const LandingPage = () => {
  const [promptString, setPromptString] = useState<string>('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handlePrompt(promptString);
        setPromptString("")
      }
    }
  };

  const handleEnhancePrompt = async () => {
    if (promptString.trim()) {
      toast.promise(
        (async () => {
          const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(promptString)}?system=You are tasked with enhancing the input prompts provided by the user. Your job is to take the given prompt, understand it, and rephrase it to be more descriptive, clear, and informative. You must focus on elaborating and refining the content without introducing any additional commentary or asking any questions. Your response should only include the enhanced version of the input prompt, with no extra explanation or information. Ensure the enhanced prompt is more detailed, precise, and easier to understand while staying true to the original idea or intention behind the prompt dont answer users query just enhance the prompt. basically you are a enhancer for a ai code generator. always refer queries as user's intent is to create a website about it in react`);
          const data = await response.text();
          setPromptString(data.trim());
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


  const { setUserPrompt } = useUserPrompt();
  const router = useRouter()

  const handlePrompt = (prompt: string) => {
    if (prompt.trim()) {
      router.push(`/code`);
      const newPrompt = JSON.stringify({ prompt });
      setUserPrompt(newPrompt);
    }
  };
  return (
    <div className='h-[85dvh] flex justify-center items-center'>
      <div className='max-w-xl'>
        <div className='flex items-center flex-col'>
          <h2 className='text-[2.5rem] text-center font-semibold tracking-tight'>What do you want to build?</h2>
          <p className="mb-4 text-sm text-center text-muted-foreground">Prompt, run, edit, and deploy full-stack web apps.</p>
          <div className='max-w-3xl w-full'>
            <div className='sm:m-0 mx-6'>
              <div className='border p-2 rounded-2xl'>
                <textarea
                  value={promptString}
                  onChange={(e) => setPromptString(e.target.value)}
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
                    onClick={() => handlePrompt(promptString)}
                    className="p-2 bg-accent-foreground text-accent rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <ArrowUp />
                  </button>
                </div>
              </div>
            </div>
            <div className='my-5 gap-2 flex justify-center items-center flex-wrap'>
              {DemoApps.map((item, i) =>
                <Button onClick={() => handlePrompt(item.prompt)} variant={"outline"} key={i} className='rounded-full text-xs hover:bg-accent/50'>
                  {item.name}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage