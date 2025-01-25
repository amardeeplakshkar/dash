'use client'
import React, { useEffect } from 'react'
import InputBox from './InputBox'
import { usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';
import SystemPrompt from '@/constant';
import { Terminal } from 'lucide-react';
import { useFileGroup } from './context/FileGroupContext';

interface Message {
    role: string;
    content: MessageContent | string;
}

interface MessageContent {
    title?: string;
    brief?: string;
    files?: [
        {
            [key: string]: {
                file: {
                    contents: string;
                };
            };
        }
    ];
    response?: string;
    codeSnippet?: string;
}

const ChatComponent = () => {
    const { sendUserMessage, messages } = usePollinationsChat([
        { role: "system", content: SystemPrompt }
    ], {
        seed: 42,
        model: 'openai',
        jsonMode: true,
    });

    const { setFileGroup } = useFileGroup();

    useEffect(() => {
        // Find the latest message with files
        const latestMessageWithFiles = messages.slice(1).find(msg => {
            const content = typeof msg.content === 'string' ? { response: msg.content } : msg.content as MessageContent;
            return content.files && content.files.length > 0;
        });

        if (latestMessageWithFiles) {
            const content = typeof latestMessageWithFiles.content === 'string' ? { response: latestMessageWithFiles.content } : latestMessageWithFiles.content as MessageContent;
            if (content.files && content.files.length > 0) {
                setFileGroup(content.files[0]); // Assuming you want to set the first file group
            }
        }
    }, [messages, setFileGroup]);

    return (
        <div className='border-gray-100 flex flex-col border p-2 rounded-xl'>
            <div className="overflow-y-auto p-4 space-y-4 h-[75dvh]">
                {messages.slice(1).map((msg: Message, index) => {
                    let content: MessageContent;
                    try {
                        content = typeof msg.content === 'string' ? { response: msg.content } : msg.content as MessageContent;
                    } catch (error) {
                        console.error('Error parsing message content:', error);
                        content = { response: msg.content as string };
                    }
                    console.log('Files:', content.files);
                    return (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex flex-col px-4 shadow-sm whitespace-pre-wrap bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground py-4 rounded-2xl gap-4 w-full font-serif`}>
                                <div>
                                    {msg.role === 'user' && <p>{msg.content as string}</p>}
                                    {msg.role === 'assistant' && (
                                        <>
                                            {content.brief ? <ReactMarkdown className="">{content.brief}</ReactMarkdown> : null}
                                            {content.response && <p>{content.response}</p>}
                                            {content.title && (
                                                <div className="py-2 mt-2 pl-2 w-full md:w-max flex items-center border rounded-xl select-none hover:bg-white dark:hover:bg-white/5 hover:cursor-pointer">
                                                    <div className='rounded-[0.5rem] p-3 bg-black/5 dark:bg-white/5 self-stretch flex items-center justify-center'>
                                                        <Terminal className='text-[#FF8800]' />
                                                    </div>
                                                    <div className="pl-2 pr-4 flex flex-col">
                                                        <span className="font-bold font-sans text-sm text-primary">{content.title}</span>
                                                        <span className="font-sans text-xs text-muted-foreground">Click to see fragment</span>
                                                    </div>
                                                </div>
                                            )}
                                            {content.files && content.files.map((fileGroup, groupIndex) => (
                                                Object.entries(fileGroup).map(([fileName, fileContent], idx) => {
                                                    console.log('File Group:', fileGroup)
                                                    // setFileGroup(fileGroup)
                                                    return (
                                                        <div key={`${groupIndex}-${idx}`} className="my-4">
                                                            <h3 className="font-bold">{fileName}</h3>
                                                            <pre className="bg-gray-500/10 overflow-auto p-4 rounded-xl">{fileContent.file.contents}</pre>
                                                        </div>
                                                    );
                                                })
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='p-2'>
            <InputBox onSendMessage={sendUserMessage} />
            </div>
        </div>
    )
}

export default ChatComponent