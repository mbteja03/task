import React, { useState, useEffect } from "react";

function TaskModal({ onClose, onSave, taskToEdit }) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskCategory, setTaskCategory] = useState("Personal");
  const [taskStatus, setTaskStatus] = useState("ToDo");
  const [dueOn, setDueOn] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDesc(taskToEdit.description);
      setTaskCategory(taskToEdit.category);
      setTaskStatus(taskToEdit.status);
      setDueOn(taskToEdit.dueOn);
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (!taskName || !taskDesc || !dueOn) {
      alert("Please fill in all fields!");
      return;
    }

    const task = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      name: taskName,
      description: taskDesc,
      category: taskCategory,
      status: taskStatus,
      dueOn,
    };

    onSave(task);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{taskToEdit ? "Edit Task" : "Create Task"}</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Task Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          style={styles.textarea}
        ></textarea>
        <select
          value={taskCategory}
          onChange={(e) => setTaskCategory(e.target.value)}
          style={styles.input}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <input
          type="date"
          value={dueOn}
          onChange={(e) => setDueOn(e.target.value)}
          style={styles.input}
        />
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          style={styles.input}
        >
          <option value="ToDo">ToDo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div style={styles.buttons}>

        <button onClick={onClose} style={styles.cancelButton}>
        CANCEL
          </button>
          <button onClick={handleSubmit} style={styles.addButton}>
          UPDATE
          </button>
          
        </div>
      </div>
    </div>
  );
}


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  title: {
    textAlign: 'left',
  },
  input: {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: "80px",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "right",
    gap: "10px",
  },
  addButton: {
    
    padding: "10px 20px",
    backgroundColor: "#7B1984",
    color: "white",
    border: "none",
    borderRadius: "42px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    color: "#090909",
    border: "1px solid #cfcfcf",
    borderRadius: "42px",
    cursor: "pointer",
  },
};

export default TaskModal;
