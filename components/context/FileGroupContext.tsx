'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface FileGroupContextType {
    fileGroup: any; // Adjust the type as per your fileGroup structure
    setFileGroup: React.Dispatch<React.SetStateAction<any>>; // Adjust the type as per your fileGroup structure
}

const FileGroupContext = createContext<FileGroupContextType | undefined>(undefined);

export const FileGroupProvider = ({ children }: { children: ReactNode }) => {
    const [fileGroup, setFileGroup] = useState<any>(null); // Adjust the type as per your fileGroup structure

    return (
        <FileGroupContext.Provider value={{ fileGroup, setFileGroup }}>
            {children}
        </FileGroupContext.Provider>
    );
};

export const useFileGroup = () => {
    const context = useContext(FileGroupContext);
    if (!context) {
        throw new Error('useFileGroup must be used within a FileGroupProvider');
    }
    return context;
};