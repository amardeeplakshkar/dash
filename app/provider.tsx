import { FileGroupProvider } from "@/components/context/FileGroupContext";
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
                <FileGroupProvider>
                <Navbar />
                {children}
                </FileGroupProvider>
            </ThemeProvider>
        </>
    )
}
