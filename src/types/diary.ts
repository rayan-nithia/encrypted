export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  encrypted: boolean;
}

export interface DiaryContextType {
  entries: DiaryEntry[];
  addEntry: (entry: DiaryEntry) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (updatedEntry: DiaryEntry) => void;
  getEntry: (id: string) => DiaryEntry | undefined;
}
