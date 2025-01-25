import ChatComponent from '@/components/ChatComponent'
import SdkComponent from '@/components/SdkComponent'
import React from 'react'

const page = () => {
  return (
    <div className='grid gap-2 p-2 grid-cols-2 h-[92dvh] w-dvw'>
        <ChatComponent/>
        <SdkComponent/>
    </div>
  )
}

export default page