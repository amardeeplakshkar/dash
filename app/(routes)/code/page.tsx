import ChatComponent from '@/components/ChatComponent'
import SandboxComponent from '@/components/SandboxComponent'
import React from 'react'

const page = () => {
  return (
    <div className='relative z-50 grid gap-2 p-2 grid-cols-2 h-[82dvh] w-dvw'>
        <ChatComponent/>
        <SandboxComponent/>
    </div>
  )
}

export default page