/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { WebContainer } from '@webcontainer/api';
import { Play, Loader2, ArrowBigLeft } from 'lucide-react';
import { ResizablePanelGroup } from './ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from './ui/button';
import { useFileGroup } from './context/FileGroupContext';
// import { files } from '@/constant';

export default function CodeEditor() {
  const { fileGroup } = useFileGroup();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(fileGroup ? fileGroup['main.jsx'].file.contents : `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Hello from WebContainer!
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
root.render(<App />);`);
  const webcontainerInstance = useRef<WebContainer | null>(null);
  const previewUrl = useRef<string>('');
  const editorRef = useRef<any>(null);

  // Boot WebContainer on component mount
  useEffect(() => {
    async function bootWebContainer() {
      if (!webcontainerInstance.current) {
        try {
          webcontainerInstance.current = await WebContainer.boot();
        } catch (error) {
          console.error('Failed to boot WebContainer:', error);
        }
      }
    }
    bootWebContainer();
  }, []);

  // Handle editor mounting
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setTimeout(() => {
      editor.layout();
    }, 100);
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
      runCode()
    };
  };

  const runCode = async () => {
    setIsLoading(true);
    try {
      if (!webcontainerInstance.current) {
        webcontainerInstance.current = await WebContainer.boot();
      }

      // Safely get main.jsx content
      const mainJsxContent = fileGroup && fileGroup['main.jsx']
        ? fileGroup['main.jsx'].file.contents
        : code;

      // Prepare files for mounting
      const mountFiles = {
        'package.json': {
          file: {
            contents: JSON.stringify({
              name: 'todo-app',
              version: '1.0.0',
              scripts: { start: 'vite' },
              dependencies: {
                'react': '^18.2.0',
                'react-dom': '^18.2.0',
                'tailwindcss': '^3.3.2',
                'postcss': '^8.4.23',
                'autoprefixer': '^10.4.14',
                'lucide-react': '^0.260.0'
              },
              devDependencies: {
                'vite': '^4.3.0',
                '@vitejs/plugin-react': '^4.0.0'
              }
            })
          }
        },
        'index.html': {
          file: {
            contents: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Todo App</title>
              </head>
              <body>
                <div id="root"></div>
                <script type="module" src="/main.jsx"></script>
              </body>
              </html>
            `
          }
        },
        'vite.config.js': {
          file: {
            contents: `
              import { defineConfig } from 'vite'
              import react from '@vitejs/plugin-react'
              
              export default defineConfig({
                plugins: [react()],
              })
            `
          }
        },
        'tailwind.config.js': {
          file: {
            contents: `
              /** @type {import('tailwindcss').Config} */
              export default {
                content: [
                  "./index.html",
                  "./main.jsx"
                ],
                theme: {
                  extend: {},
                },
                plugins: [],
              }
            `
          }
        },
        'postcss.config.js': {
          file: {
            contents: `
              export default {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              }
            `
          }
        },
        'main.jsx': {
          file: {
            contents: mainJsxContent
          }
        },
        'index.css': {
          file: {
            contents: `
              @tailwind base;
              @tailwind components;
              @tailwind utilities;
            `
          }
        }
      };

      // Mount files
      await webcontainerInstance.current.mount(mountFiles);

      // Update editor with mounted file content
      if (mainJsxContent) {
        setCode(mainJsxContent);
        if (editorRef.current) {
          editorRef.current.setValue(mainJsxContent);
        }
      }

      // Install dependencies
      const installProcess = await webcontainerInstance.current.spawn('npm', ['install']);
      const installExitCode = await installProcess.exit;
      if (installExitCode !== 0) {
        throw new Error('Installation failed');
      }

      // Start the dev server
      const startProcess = await webcontainerInstance.current.spawn('npm', ['start']);

      // Listen for the server to be ready
      webcontainerInstance.current.on('server-ready', (port, url) => {
        previewUrl.current = url;
        const previewFrame = document.getElementById('preview') as HTMLIFrameElement;
        if (previewFrame) {
          previewFrame.src = url;
        }
      });

      // Handle server output
      startProcess.output.pipeTo(new WritableStream({
        write(data) {
          if (data.includes('Local:')) {
            console.log(`Server started successfully`);
          }
        }
      }));
    } catch (error) {
      console.error('Failed to run code:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 flex flex-col rounded-xl bg-accent/70 overflow-hidden border-2">
      {isLoading && (
        <div className='flex justify-center transition-all text-sm text-accent-foreground items-center gap-2'>
          <Loader2 size={16} className='animate-spin' />
          Dash App is Booting...
        </div>
      )}
      <Tabs defaultValue="code" className="flex-1">
        <nav className='w-full p-1 flex justify-between items-center'>
          <div className='hover:bg-accent p-1 rounded-md cursor-pointer'>
            <ArrowBigLeft />
          </div>
          <div className='flex justify-center'>
            <TabsList className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground px-1 py-0 border h-8">
              <TabsTrigger className='justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="code">Code</TabsTrigger>
              <TabsTrigger className='justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          <Button
            variant="default"
            onClick={runCode}
            disabled={isLoading}
            className='bg-muted hover:bg-accent-foreground/15 text-xs p-1 px-1 py-0 text-accent-foreground h-8'
          >
            {isLoading ? (
              <div className='flex gap-1 justify-center items-center rounded-md cursor-pointer'>
                <Loader2 size={16} className="animate-spin" />
                Booting...
              </div>
            ) : (
              <div className='rounded-md cursor-pointer flex gap-1 justify-center items-center'>
                <Play size={16} />
                Run
              </div>
            )}
          </Button>
        </nav>
        <ResizablePanelGroup direction="horizontal" className="grid grid-cols-1 flex-1">
          <TabsContent value='code' className='h-full w-full overflow-auto'>
            <Editor
              height="100%"
              className='overflow-auto'
              defaultPath='main.jsx'
              defaultLanguage="javascript"
              defaultValue={code}
              theme='vs-dark'
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                folding: true,
                showUnused: true,
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                acceptSuggestionOnCommitCharacter: true,
                tabCompletion: 'on',
                autoClosingBrackets: 'always',
                autoClosingQuotes: 'always',
                autoIndent: 'full',
                suggest: {
                  snippetsPreventQuickSuggestions: false,
                },
              }}
            />
          </TabsContent>
          <TabsContent value='preview' className='h-full w-full rounded-lg overflow-hidden shadow-lg'>
            {isLoading ? (
              <div className='flex justify-center items-center h-full w-full'>
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <iframe
                id="preview"
                className="w-full h-full border-none"
                title="Preview"
                sandbox="allow-same-origin allow-scripts allow-modals"
              />
            )}
          </TabsContent>
        </ResizablePanelGroup>
      </Tabs>
    </div>
  );
}