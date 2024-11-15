import React, { useState } from "react";
import { useDiary } from "../hooks/useDiary";
import { useParams } from "react-router-dom";

const ReadEntryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEntry } = useDiary();
  const entry = getEntry(id || "");

  const [password, setPassword] = useState<string>("");
  const [decryptedContent, setDecryptedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecrypt = () => {
    if (entry) {
      const [entryPassword, encryptedText] = atob(entry.content).split(":");

      if (password === entryPassword) {
        setDecryptedContent(encryptedText);
        setError(null);
      } else {
        setError("Incorrect password");
        setDecryptedContent(null);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{entry?.title}</h2>
      {decryptedContent ? (
        <div style={styles.contentBox}>
          <p>{decryptedContent}</p>
        </div>
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter password to decrypt"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleDecrypt} style={styles.decryptButton}>
            Decrypt Entry
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
};

const styles = {
  input: { padding: "10px", fontSize: "16px", marginBottom: "10px" },
  decryptButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  contentBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  },
} as const;

export default ReadEntryPage;
