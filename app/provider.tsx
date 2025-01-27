import { FileGroupProvider } from "@/components/context/FileGroupContext";
import { UserPromptProvider } from "@/components/context/UserPrompt";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider"

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
                 <UserPromptProvider>
                <FileGroupProvider>
                <Navbar />
                {children}
                </FileGroupProvider>
                 </UserPromptProvider>
            </ThemeProvider>
        </>
    )
}
