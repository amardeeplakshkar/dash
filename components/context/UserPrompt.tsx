'use client'
// UserPromptContext.js
import React, { createContext, useState, useContext } from "react";

interface UserPromptContextType {
    userPrompt: string;
    setUserPrompt: (prompt: string) => void;
}

const UserPromptContext = createContext<UserPromptContextType | undefined>(undefined);

// Context Provider
export const UserPromptProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [userPrompt, setUserPrompt] = useState<string>("");

    return (
        <UserPromptContext.Provider value={{ userPrompt, setUserPrompt }}>
            {children}
        </UserPromptContext.Provider>
    );
};

// Custom hook for consuming the context
export const useUserPrompt = (): UserPromptContextType => {
    const context = useContext(UserPromptContext);
    if (!context) {
      throw new Error("useUserPrompt must be used within a UserPromptProvider");
    }
    return context;
  };