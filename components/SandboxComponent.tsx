'use client'

import React, { useEffect, useState } from 'react'
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
    useSandpack,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ArrowBigLeft, Play } from 'lucide-react';
import { TabsContent } from './ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { githubLight, sandpackDark, } from '@codesandbox/sandpack-themes';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useFileGroup } from './context/FileGroupContext';

interface NavbarProps {
    setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveTab }) => {
    const { sandpack } = useSandpack();
    const { fileGroup } = useFileGroup();

    const handleRunCode = () => {
        sandpack.runSandpack()
        setActiveTab('preview');
    }

    useEffect(() => {
        if (fileGroup) {
            handleRunCode()
        }
    }, [fileGroup])
    return (
        <nav className='w-full p-1 flex justify-between items-center'>
            <div className='hover:bg-accent dark:text-accent-foreground p-1 rounded-md cursor-pointer'>
                <ArrowBigLeft />
            </div>
            <div className='flex justify-center'>
                <TabsList className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground px-1 py-0 border h-8">
                    <TabsTrigger className='justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="code">Code</TabsTrigger>
                    <TabsTrigger
                        onClick={handleRunCode}
                        className='justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="preview">Preview</TabsTrigger>
                </TabsList>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleRunCode()}
                className="flex bg-accent/50 dark:text-accent-foreground items-center gap-2 p-2 text-xs justify-center"
            >
                <Play size={16} />
                <span className='sm:block hidden'>
                    Run
                </span>
            </Button>
        </nav>
    )
}

const SandboxComponent = () => {
    const { theme } = useTheme()
    const [activeTab, setActiveTab] = useState("code");
    const { fileGroup } = useFileGroup()

    return (
        <div className='flex-1 flex flex-col rounded-xl bg-accent/70 border-2'>
            <Tabs
                defaultValue="code"
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1">
                <SandpackProvider
                    theme={theme && theme === 'light' ? githubLight : sandpackDark}
                    customSetup={{
                        dependencies: {
                            "react": "latest",
                            "react-dom": "latest",
                            "react-scripts": "latest",
                            'tailwindcss': 'latest',
                            "lucide-react": "latest"
                        },
                    }}
                    files={{
                        "index.css": "@tailwind base;@tailwind components;@tailwind utilities;",
                        "index.js": fileGroup ? fileGroup['main.jsx'].file.contents : `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hello from Dash!
          </h1>
          <p className="text-gray-600">
            Edit this code and click Run to see changes. This component is styled with Tailwind CSS.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Click me
          </button>
        </div>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
                        `
                    }}
                    template="react"
                    options={{
                        visibleFiles: ['/index.js', '/index.css'],
                        activeFile: '/index.js',
                        recompileMode: "immediate",
                        recompileDelay: 300,
                        externalResources: [
                            "https://cdn.tailwindcss.com",
                        ]
                    }}
                >
                    <Navbar setActiveTab={setActiveTab} />
                    <SandpackLayout>
                        <TabsContent className='w-full' value='code'>
                            <ResizablePanelGroup className='w-full' direction='horizontal'>
                                <ResizablePanel defaultSize={35}>
                                    <SandpackFileExplorer
                                        className='rounded-l-xl  overflow-hidden h-[81dvh]'
                                    />
                                </ResizablePanel>
                                <ResizableHandle />
                                <ResizablePanel defaultSize={100}>
                                    <SandpackCodeEditor
                                        className='rounded-r-xl  overflow-hidden h-[81dvh]'
                                        showTabs
                                        showRunButton
                                    />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </TabsContent>
                        <TabsContent className='w-full' value='preview'>
                            <SandpackPreview
                                className='rounded-xl overflow-hidden h-[81dvh]'
                                showNavigator
                                showOpenInCodeSandbox={false}
                                showOpenNewtab
                            />
                        </TabsContent>
                    </SandpackLayout>
                </SandpackProvider>
            </Tabs>
        </div >
    )
}

export default SandboxComponent