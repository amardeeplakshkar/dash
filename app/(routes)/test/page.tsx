"use client";

import { useTheme } from "next-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { dracula, githubLight } from "@codesandbox/sandpack-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, Terminal } from "lucide-react";

const files = {
  "/App.tsx": `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Interactive Counter
      </h1>
      <p className="mb-4">
        Click the button to increment the counter!
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Count: {count}
        </button>
      </div>
    </div>
  );
}`,
  "/styles.css": `
/* Add your custom styles here */
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}`,
};

const CustomHeader = () => {
  const { sandpack } = useSandpack();
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Code2 className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Code Editor</h2>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => sandpack.runSandpack()}
        className="flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        Run Code
      </Button>
    </div>
  );
};

export default function SandpackEditor() {
  const { theme } = useTheme();

  return (
    <div className="rounded-lg border shadow-sm">
      <SandpackProvider
        theme={theme && theme === "dark" ? dracula : githubLight}
        template={'react-ts'}
        files={files}
        options={{
          activeFile: '/App.tsx',
          visibleFiles: Object.keys(files || {}),
          recompileMode: "immediate",
          recompileDelay: 300,
        }}
        customSetup={{
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "@types/react": "^18.0.0",
            "@types/react-dom": "^18.0.0"
          },
          entry: "/index.tsx"
        }}
      >
        <CustomHeader />
        <SandpackLayout>
          <div className="flex-1">
            <Tabs defaultValue="code" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b">
                <TabsTrigger value="code" className="gap-2">
                  <Code2 className="w-4 h-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="console" className="gap-2">
                  <Terminal className="w-4 h-4" />
                  Console
                </TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="mt-0">
                <SandpackCodeEditor
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  className="h-[400px]"
                />
              </TabsContent>
              <TabsContent value="console" className="mt-0">
                <SandpackConsole className="h-[400px]" />
              </TabsContent>
            </Tabs>
          </div>
          <div className="border-l">
            <SandpackPreview className="h-[500px]" />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}