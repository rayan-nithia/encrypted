import React from "react";
import { useDiary } from "../hooks/useDiary";
import { useNavigate } from "react-router-dom";

const EntryListPage: React.FC = () => {
  const { entries, deleteEntry } = useDiary();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(id);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Encrypted Diary</h1>
      <button onClick={() => navigate("/create")} style={styles.createButton}>
        + New Entry
      </button>
      <div style={styles.listContainer}>
        {entries.length === 0 ? (
          <p>No entries yet. Start writing your thoughts!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={styles.entryCard}>
              <h3>{entry.title}</h3>
              <div style={styles.buttonContainer}>
                <button
                  onClick={() => navigate(`/read/${entry.id}`)}
                  style={styles.button}
                >
                  Read
                </button>
                <button
                  onClick={() => navigate(`/edit/${entry.id}`)}
                  style={styles.button}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  createButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  entryCard: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
} as const;

export default EntryListPage;
