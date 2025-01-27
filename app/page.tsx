'use client'
import { useUserPrompt } from '@/components/context/UserPrompt'
import InputBox from '@/components/InputBox'
import { Button } from '@/components/ui/button'
import { SystemPrompt } from '@/constant'
import { DemoApps } from '@/constant/DemoApps'
import { usePollinationsChat } from '@pollinations/react'
import { useRouter } from 'next/navigation'
import React from 'react'
const LandingPage = () => {
  const { setUserPrompt } = useUserPrompt();
  const router = useRouter()
  const { sendUserMessage } = usePollinationsChat([
    { role: "system", content: SystemPrompt }
], {
    seed: 42,
    model: 'openai',
});


const handlePropmt = (prompt: string) => {
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
            <InputBox onSendMessage={sendUserMessage} />
          </div>
          <div className='my-5 gap-2 flex justify-center items-center flex-wrap'>
            {DemoApps.map((item, i) =>
              <Button onClick={() => handlePropmt(item.prompt)} variant={"outline"} key={i} className='rounded-full text-xs hover:bg-accent/50'>
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