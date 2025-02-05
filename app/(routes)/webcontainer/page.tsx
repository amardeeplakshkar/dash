import ChatComponent from '@/components/ChatComponent'
import SdkComponent from '@/components/SdkComponent'
import React from 'react'

const page = () => {
  return (
    <div className='relative z-50 grid gap-2 p-2 grid-cols-2 h-[82dvh] w-dvw'>
        <ChatComponent/>
        <SdkComponent/>
    </div>
  )
}

export default page