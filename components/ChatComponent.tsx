'use client'
import React, { useEffect } from 'react'
import InputBox from './InputBox'
import { usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';
import { SystemPrompt } from '@/constant';
import { Terminal } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useFileGroup } from './context/FileGroupContext';

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
    const { sendUserMessage, messages } = usePollinationsChat([
        { role: "system", content: SystemPrompt }
    ], {
        seed: 42,
        model: 'openai',
    });

    const { setFileGroup, fileGroup } = useFileGroup();

    useEffect(() => {
        if (messages.length > 1) {
            const content = JSON.parse(messages[messages.length - 1].content);
            const { files } = content[0] as MessageContent;
            const filesGroup = files?.[0] as Files;
            console.log("use effect",filesGroup);
            setFileGroup(filesGroup);
        }
    }, [messages, setFileGroup]);



    return (
        <div className='flex bg-white/5 flex-col backdrop-blur-[2px] border p-2 rounded-xl'>
            <ScrollArea className="p-4 h-[72dvh]">
                {messages.slice(1).map((msg, index) => {
                    const content = JSON.parse(msg.content)
                    const { title, brief, response } = content[0] as MessageContent;
                    console.log("Context:",fileGroup && fileGroup["main.jsx"])

                    return (
                        <div
                            key={index}
                            className={`flex my-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex flex-col px-4 shadow-sm bg-accent dark:bg-white/5 border text-accent-foreground dark:text-muted-foreground py-4 rounded-2xl w-full font-serif`}
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

/*{

[
    {
      "title": "Todo App",
      "brief": "This Todo application allows users to add, remove, and check off tasks as completed. It leverages React for state management and Tailwind CSS for styling the user interface. Interactions are handled through React's state hooks.",
      "files": [
        {
          "main.jsx": {
            "file": {
              "contents": "import React, { useState } from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\n\nfunction App() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState('');\n\n  const addTodo = () => {\n    if (input) {\n      setTodos([...todos, { text: input, completed: false }]);\n      setInput('');\n    }\n  };\n\n  const toggleTodo = (index) => {\n    const newTodos = [...todos];\n    newTodos[index].completed = !newTodos[index].completed;\n    setTodos(newTodos);\n  };\n\n  const removeTodo = (index) => {\n    const newTodos = todos.filter((_, i) => i !== index);\n    setTodos(newTodos);\n  };\n\n  return (\n    <div className=\"min-h-screen bg-gray-100 p-8\">\n      <div className=\"max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden\">\n        <div className=\"p-8\">\n          <h1 className=\"text-3xl font-bold text-gray-900 mb-4\">Todo App</h1>\n          <div className=\"flex mb-4\">\n            <input\n              type=\"text\"\n              value={input}\n              onChange={(e) => setInput(e.target.value)}\n              className=\"flex-grow p-2 border border-gray-300 rounded mr-2\"\n              placeholder=\"Add a new task\"\n            />\n            <button\n              onClick={addTodo}\n              className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors\"\n            >\n              Add\n            </button>\n          </div>\n          <ul>\n            {todos.map((todo, index) => (\n              <li key={index} className={`flex justify-between items-center mb-2 p-2 rounded ${todo.completed ? 'bg-green-100' : 'bg-white'} shadow\"`}\n>\n                <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-900'} onClick={() => toggleTodo(index)}>{todo.text}</span>\n                <button onClick={() => removeTodo(index)} className=\"text-red-500 hover:text-red-600\">Remove</button>\n              </li>\n            ))}\n          </ul>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);"
            }
          }
        }
      ]
    }
  ]
}*/