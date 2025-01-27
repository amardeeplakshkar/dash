import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DASH: AI-Powered React Code Editor & Live Preview",  
  description:
    "Generate React code instantly with AI and see your website come to life in a live preview iframe. DASH is the all-in-one solution for web development, offering superior AI assistance compared to tools like Bolt and v0.dev.",  
  keywords: "AI code editor, React code generation, web development, AI development tools, live preview, React framework, coding assistant, web app builder, DASH, Bolt, v0.dev",  
  authors: [
    {
      name: "Amardeep Lakshkar",
      url: "https://amardeep.is-a.dev",
    },
  ],
  creator: "Amardeep Lakshkar",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow", 
  twitter: {
    card: "summary_large_image", 
    title: "DASH: Code React with AI & See Live Preview",
    description:
      "The future of React development is here! DASH - AI-powered code editor with live preview. Build modern web apps faster & easier. Experience the difference compared to Bolt and v0.dev.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
