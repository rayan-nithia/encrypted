import React, { useState } from "react";
import { useDiary } from "../hooks/useDiary";
import { useNavigate } from "react-router-dom";
import { DiaryEntry } from "../types/diary";
import { v4 as uuidv4 } from "uuid";

const CreateEntryPage: React.FC = () => {
  const { addEntry } = useDiary();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const encryptedContent = btoa(`${password}:${content}`);

    const newEntry: DiaryEntry = {
      id: uuidv4(),
      title,
      content: encryptedContent,
      encrypted: true,
    };

    addEntry(newEntry);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Diary Entry</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Write your entry here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="password"
          placeholder="Encryption Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>
          Save Entry
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", fontSize: "16px" },
  textarea: { padding: "10px", fontSize: "16px", minHeight: "100px" },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
} as const;

export default CreateEntryPage;
