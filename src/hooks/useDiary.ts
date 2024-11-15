import { useContext } from "react";
import { DiaryContext } from "../context/DiaryContext";
import { DiaryContextType } from "../types/diary";

export const useDiary = (): DiaryContextType => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return context;
};
