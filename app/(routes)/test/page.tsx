"use client";

import { useTheme } from "next-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { dracula, githubLight } from "@codesandbox/sandpack-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, Terminal } from "lucide-react";

import { viteShadcn } from "@/constant/templates/vite-shadcn";
import ChatComponent from "@/components/ChatComponent";
import { useFileGroup } from "@/components/context/FileGroupContext";

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
      <button onClick={() => console.log("")} className="bg-red-500">
        code
      </button>
    </div >
  );
};

export default function SandpackEditor() {
  const { theme } = useTheme();
  const { fileGroup } = useFileGroup();
  const newFiles = fileGroup && fileGroup;
  const mergedFiles = { ...viteShadcn[0]?.template?.files, ...newFiles };
  
  return (
    <div className="rounded-lg border shadow-sm">
      <ChatComponent />
      <SandpackProvider
        theme={theme && theme === "light" ? githubLight : dracula}
        files={mergedFiles}
        template="react"
        options={{
          recompileMode: "immediate",
          recompileDelay: 300,
          externalResources: [
            "https://cdn.tailwindcss.com",
          ]
        }}
        customSetup={{
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
              <TabsContent value="code" className="mt-0 grid grid-cols-4">
                <SandpackFileExplorer className="col-span-1" />
                <SandpackCodeEditor
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  className="h-[400px] col-span-3"
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