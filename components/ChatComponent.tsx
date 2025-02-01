/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useRef } from 'react'
import InputBox from './InputBox'
import { usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';
import { SystemPrompt } from '@/constant';
import { Terminal } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useFileGroup } from './context/FileGroupContext';
import { DemoApps } from '@/constant/DemoApps';
import { useUserPrompt } from './context/UserPrompt';
import toast from 'react-hot-toast';

export interface File {
    contents: string;
}

export interface Files {
    [key: string]: {
        file: File;
    };
}

export interface MessageContent {
    title: string;
    brief: string;
    response: string;
    files?: Files[];
}


const ChatComponent = () => {
    const latestMessageRef = useRef<HTMLDivElement | null>(null);
    const { sendUserMessage, messages } = usePollinationsChat([
        { role: "system", content: SystemPrompt }
    ], {
        seed: Math.floor(Math.random() * 1000000),
        model: 'openai',
    });
    const { userPrompt } = useUserPrompt();

    useEffect(() => {
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [messages]);

    useEffect(() => {
        if (userPrompt) {
            sendUserMessage(JSON.stringify(userPrompt));
        }
    }, [userPrompt]);

    const { setFileGroup } = useFileGroup();
    useEffect(() => {
        if (messages.length > 1) {
            try {
                const content = JSON.parse(messages[messages.length - 1].content);
                const { files } = content[0] as MessageContent;
                const filesGroup = files?.[0] as Files;

                if (filesGroup) {
                    setFileGroup(filesGroup);
                    toast.success('Code Generated!');
                }
            } catch (error) {
                console.error('Error parsing message content:', error);
            }
        }
    }, [messages, setFileGroup]);

    return (
        <div className='flex bg-white/5 flex-col backdrop-blur-[2px] border p-2 rounded-xl'>
            <ScrollArea className="p-4 h-[68dvh] overflow-x-auto">
                {messages.length <= 1 && (
                    <div className='h-[62dvh] flex-1 flex flex-col items-center justify-center w-full'>
                        {DemoApps.map((item, index) =>
                            <button onClick={() => sendUserMessage(JSON.stringify(item.prompt as string))} key={index} className='flex overflow-auto px-4 shadow-sm bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground py-4 my-2 rounded-2xl w-full font-serif gap-2 items-center'>
                                <div className='bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground p-2 rounded-xl'>
                                    {item.icon}
                                </div>
                                <div>
                                    <div className='text-sm text-start line-clamp-1 font-semibold text-accent-foreground'>
                                        {item.name}
                                    </div>
                                    <div className='text-sm text-muted-foreground line-clamp-1'>
                                        {item.description}
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                )}
                {messages.slice(1).map((msg, index) => {
                    let content;
                    try {
                        content = JSON.parse(msg.content);
                    } catch (error) {
                        console.error("Invalid JSON content:", error);
                        content = { title: "Error", brief: "Invalid message content", response: "" };
                        toast.error('Failed to parse message content!');
                    }

                    const { title, brief, response } = content[0] || {};

                    return (
                        <div
                            key={index}
                            ref={index === messages.length - 2 ? latestMessageRef : null}
                            className={`flex flex-wrap my-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex text-sm overflow-auto flex-col px-4 shadow-sm bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground py-4 rounded-2xl w-full font-serif`}
                            >
                                <ReactMarkdown>
                                    {response ? response : brief || JSON.parse(msg.content) || 'No content available'}
                                </ReactMarkdown>
                                {msg.role === 'assistant' && !response && (
                                    <div className="py-2 mt-2 pl-2 w-full md:w-max flex items-center border border-accent-foreground/10 rounded-xl select-none hover:bg-accent hover:cursor-pointer">
                                        <div className='rounded-[0.5rem] p-3 bg-black/20 self-stretch flex items-center justify-center'>
                                            <Terminal className='text-[#FF8800]' />
                                        </div>
                                        <div className="pl-2 pr-4 flex flex-col">
                                            <span className="font-bold font-sans text-sm text-primary">{title}</span>
                                            <span className="font-sans text-xs text-muted-foreground">Click to see fragment</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

            </ScrollArea>
            <div className='pt-2'>
                <InputBox onSendMessage={sendUserMessage} />
            </div>
        </div>
    )
}

export default ChatComponent