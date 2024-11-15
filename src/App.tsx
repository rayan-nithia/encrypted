import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DiaryProvider } from "./context/DiaryContext";
import CreateEntryPage from "./pages/CreateEntryPage";
import EntryListPage from "./pages/EntryListPage";
import EditEntryPage from "./pages/EditEntryPage";
import ReadEntryPage from "./pages/ReadEntryPage";

const App: React.FC = () => {
  return (
    <DiaryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<EntryListPage />} />
          <Route path="/create" element={<CreateEntryPage />} />
          <Route path="/edit/:id" element={<EditEntryPage />} />
          <Route path="/read/:id" element={<ReadEntryPage />} />
        </Routes>
      </Router>
    </DiaryProvider>
  );
};

export default App;
