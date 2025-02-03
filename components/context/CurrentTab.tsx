'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context
interface TabContextType {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

// Create the context with a default value (undefined)
const TabContext = createContext<TabContextType | undefined>(undefined);

// Create a provider component
export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<string>('code');

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
};

// Custom hook to use the Tab context
export const useTab = (): TabContextType => {
  const context = useContext(TabContext);

  // If the context is undefined (not within a TabProvider), throw an error
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }

  return context;
};
