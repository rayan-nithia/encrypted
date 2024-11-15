import React, { useState, useEffect } from "react";
import { useDiary } from "../hooks/useDiary";
import { useNavigate, useParams } from "react-router-dom";

const EditEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEntry, updateEntry } = useDiary();
  const navigate = useNavigate();
  const entry = getEntry(id || "");

  const [title, setTitle] = useState<string>(entry?.title || "");
  const [content, setContent] = useState<string>(
    entry ? atob(entry.content).split(":")[1] : ""
  );
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (!entry) navigate("/");
  }, [entry, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const encryptedContent = btoa(`${password}:${content}`);

    if (entry) {
      updateEntry({ ...entry, title, content: encryptedContent });
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Diary Entry</h2>
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
          placeholder="Edit your entry here..."
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
          Update Entry
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    minHeight: "100px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
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

export default EditEntryPage;
