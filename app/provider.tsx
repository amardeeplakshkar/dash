'use client'

import { TabProvider } from "@/components/context/CurrentTab";
import { FileGroupProvider } from "@/components/context/FileGroupContext";
import { ModelProvider } from "@/components/context/ModelContext";
import { UserPromptProvider } from "@/components/context/UserPrompt";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "react-hot-toast";
export default function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            color: "hsl(var(--accent-foreground))",
                            borderColor: "hsl(var(--accent-foreground) 0.5)",
                            backgroundColor: "rgb(255 255 255 / 0.05)",
                            borderRadius: "1rem",
                        },
                    }
                    }
                />
                <ModelProvider>
                    <UserPromptProvider>
                        <FileGroupProvider>
                            <TabProvider>
                                <Navbar />
                                {children}
                            </TabProvider>
                        </FileGroupProvider>
                    </UserPromptProvider>
                </ModelProvider>
            </ThemeProvider>
        </>
    )
}
