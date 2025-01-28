// src/TaskCard.js
import React from "react";
import useWindowWidth from "./useWindowWidth.js"; // Import the custom hook

function TaskCard({ task, onEdit, onDelete }) {

    const width = useWindowWidth(); // Get current screen width

    const responsiveStyles = {
        dueTxt: {
            ...styles.dueTxt,
            display: width < 768 ? "none" : "flex",
        },

        categoryTxt: {
            ...styles.categoryTxt,
            display: width < 768 ? "none" : "flex",
        },
        statusTxt: {
            ...styles.statusTxt,
            display: width < 768 ? "none" : "flex",
        },
        buttons: {
            ...styles.buttons,
            display: width < 768 ? "none" : "flex",
        }
    };

    return (
        <div style={styles.card}>
            <h4 style={styles.nameTxt}>{task.name}</h4>
            {/* <p>{task.description}</p> */}
            <p style={responsiveStyles.dueTxt}><strong>Due On:</strong> {task.dueOn}</p>
            <p style={responsiveStyles.categoryTxt}><strong>Category:</strong> {task.category}</p>
            <p style={responsiveStyles.statusTxt}><strong>Status:</strong> {task.status}</p>
            <div style={{ ...styles.buttons, flex: 1 }}>
                <button onClick={() => onEdit(task)} style={styles.editButton}>
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)} style={styles.deleteButton}>
                    Delete
                </button>
            </div>
        </div>
    );
}
const styles = {
    card: {
        padding: "10px 6px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    nameTxt: {
        flex: 1,
        fontFamily: "'Mulish', serif",
        fontWeight: "500",
        fontSize: 14,
    },
    dueTxt: {
        flex: 1,
        fontFamily: "'Mulish', serif",
        fontWeight: "500",
        fontSize: 14,
    },
    categoryTxt: {
        flex: 1,
        fontFamily: "'Mulish', serif",
        fontWeight: "500",
        fontSize: 14,
    },
    statusTxt: {
        flex: 1,
        fontFamily: "'Mulish', serif",
        fontWeight: "500",
        fontSize: 14,
    },
    buttons: {
        marginTop: "10px",
        display: "flex",
        // justifyContent: "space-between",
        gap: "20px",
    },
    editButton: {
        padding: "5px 10px",
        color: "#000000",
        border: "1px soild #4CAF50",
        borderRadius: "5px",
        cursor: "pointer",
    },
    deleteButton: {
        padding: "5px 10px",
        color: "#000000",
        border: "1px soild #f44336",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default TaskCard;
