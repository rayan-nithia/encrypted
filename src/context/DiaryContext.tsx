import React, { createContext, useState, ReactNode } from "react";
import { DiaryEntry, DiaryContextType } from "../types/diary";

export const DiaryContext = createContext<DiaryContextType | undefined>(
  undefined
);

interface DiaryProviderProps {
  children: ReactNode;
}

export const DiaryProvider: React.FC<DiaryProviderProps> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const addEntry = (entry: DiaryEntry) => {
    setEntries([...entries, entry]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const updateEntry = (updatedEntry: DiaryEntry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  const getEntry = (id: string) => {
    return entries.find((entry) => entry.id === id);
  };

  return (
    <DiaryContext.Provider
      value={{ entries, addEntry, deleteEntry, updateEntry, getEntry }}
    >
      {children}
    </DiaryContext.Provider>
  );
};
