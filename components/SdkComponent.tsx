'use client'

import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { WebContainer } from '@webcontainer/api';
import { Play, Loader2, ArrowBigLeft } from 'lucide-react';
import { ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from './ui/button';
import { useFileGroup } from './context/FileGroupContext';

const defaultCode = `import React from 'react';
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
root.render(<App />);`;

export default function CodeEditor() {
  const {fileGroup} = useFileGroup();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(defaultCode);
  const webcontainerInstance = useRef<WebContainer | null>(null);
  const previewUrl = useRef<string>('');

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const runCode = async () => {
    setIsLoading(true);
    try {
      if (!webcontainerInstance.current) {
        webcontainerInstance.current = await WebContainer.boot();
      }

      const files = {
        'index.html': {
          file: {
            contents: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>`,
          },
        },
        'main.jsx': {
          file: {
            contents: code,
          },
        },
        'index.css': {
          file: {
            contents: `
@tailwind base;
@tailwind components;
@tailwind utilities;`,
          },
        },
        'package.json': {
          file: {
            contents: `
{
  "name": "react-preview",
  "type": "module",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.0"
  },
  "scripts": {
    "start": "vite --port 5173 --host"
  }
}`,
          },
        },
        'vite.config.js': {
          file: {
            contents: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});`,
          },
        },
        'postcss.config.js': {
          file: {
            contents: `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
          },
        },
        'tailwind.config.js': {
          file: {
            contents: `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
          },
        },
      };

      await webcontainerInstance.current.mount(fileGroup || files);

      // Install dependencies
      const installProcess = await webcontainerInstance.current.spawn('npm', ['install']);
      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        throw new Error('Installation failed');
      }

      // Start the dev server

      // Listen for the server to be ready
      webcontainerInstance.current.on('server-ready', (port, url) => {
        previewUrl.current = url;
        const previewFrame = document.getElementById('preview') as HTMLIFrameElement;
        if (previewFrame) {
          previewFrame.src = url;
        }
      });

    } catch (error) {
      console.error('Failed to run code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col rounded-xl bg-accent/70 overflow-hidden border-2">
      <Tabs defaultValue="code" className="flex-1">
        <nav className='w-full p-1 flex justify-between items-center'>
          <div className='hover:bg-accent p-1 rounded-md cursor-pointer'>
          <ArrowBigLeft />
          </div>
          <div className='flex justify-center'>
            <TabsList className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground px-1 py-0 border h-8">
              <TabsTrigger className='justify-center whitespace-nowrap rounded-md  transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="code">Code</TabsTrigger>
              <TabsTrigger className='justify-center whitespace-nowrap rounded-md  transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow font-normal text-xs py-1 px-2 gap-1 flex items-center' value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          <Button
            variant="default"
            onClick={runCode}
            disabled={isLoading}
            className='bg-muted text-xs p-1 px-1 py-0 text-accent-foreground hover:text-accent h-8'
          >
            {isLoading ? (
               <div className='flex gap-1 justify-center items-center rounded-md cursor-pointer'>
                <Loader2 className="animate-spin"/>
                Loading...
              </div>
            ) : (
               <div className='rounded-md cursor-pointer flex gap-1 justify-center items-center '>
                <Play />
                Run
              </div>
            )}
          </Button>
        </nav>
        <ResizablePanelGroup direction="horizontal" className="grid grid-cols-1 flex-1">
          <TabsContent value='code' className='h-full w-full'>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={defaultCode}
              theme='vs-dark'
              onChange={handleEditorChange}
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
          <TabsContent value='preview' className='h-full w-full bg-white rounded-lg overflow-hidden shadow-lg'>
            <ResizablePanel className="">
              <iframe
                id="preview"
                className="w-full border-none"
                title="Preview"
                sandbox="allow-scripts allow-same-origin allow-modals"
              />
            </ResizablePanel>
          </TabsContent>
        </ResizablePanelGroup>
      </Tabs>
    </div>
  );
}