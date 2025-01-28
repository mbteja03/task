import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Header from "./Header";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";
import useWindowWidth from "./useWindowWidth.js"; // Import the custom hook

function Dashboard() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]); // Store tasks
    const [isModalOpen, setModalOpen] = useState(false); // Modal visibility
    const [currentTask, setCurrentTask] = useState(null); // Task to edit



    const width = useWindowWidth(); // Get current screen width

    // Responsive styles based on screen width
    const responsiveStyles = {
        container: {
            ...styles.container,
        },

        cardStyles: {
            ...styles.cardStyles,
            display: width < 768 ? "none" : "flex",
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); // Set the authenticated user
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    // Handle adding or updating a task
    const saveTask = (task) => {
        if (currentTask) {
            // Edit task
            const updatedTasks = tasks.map((t) => (t.id === currentTask.id ? task : t));
            setTasks(updatedTasks);
        } else {
            // Add new task
            setTasks([...tasks, { ...task, id: Date.now() }]);
        }
        setModalOpen(false);
        setCurrentTask(null);
    };

    // Handle editing a task
    const handleEdit = (task) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    // Handle deleting a task
    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Filter tasks by status
    const filterTasksByStatus = (status) => tasks.filter((task) => task.status === status);

    return (
        <div>
            <Header user={user} />
            <div style={{ textAlign: "right", margin: "20px" }}>
                <button
                    onClick={() => {
                        setModalOpen(true);
                        setCurrentTask(null); // Clear currentTask for new task
                    }}
                    style={{
                        padding: "14px 40px",
                        fontSize: "14px",
                        backgroundColor: "#7B1984",
                        color: "white",
                        border: "none",
                        borderRadius: "40px",
                        cursor: "pointer",
                    }}
                >
                    Add Task
                </button>
            </div>

            <div style={responsiveStyles.cardStyles}>
                <h4 style={styles.nameTxt}>Task name</h4>
                <p style={styles.dueTxt}>Due on</p>
                <p><strong style={styles.statusTask}>Task Status</strong></p>
                <p><strong style={styles.categoryTxt}>Task Category</strong></p>
                <p><strong style={styles.statusTxt}>Status:</strong></p>
                <div style={{ opacity: 0 }}>
                    gjhgjh
                </div>
            </div>

            <div style={responsiveStyles.container}>
                {/* ToDo Section */}
                <div style={styles.card}>
                    <div style={{ ...styles.headingCard, backgroundColor: "#FAC3FF" }}>
                        <h2 style={styles.heading}>ToDo</h2>
                    </div>
                    {filterTasksByStatus("ToDo").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* In-Progress Section */}
                <div style={styles.card}>
                    <div style={{ ...styles.headingCard, backgroundColor: "#85D9F1" }}>
                        <h2 style={styles.heading}>In-Progress</h2>
                    </div>
                    {filterTasksByStatus("In-Progress").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* Completed Section */}
                <div style={styles.card}>
                    <div style={{ ...styles.headingCard, backgroundColor: "#CEFFCC" }}>
                        <h2 style={styles.heading}>Completed</h2>
                    </div>
                    {filterTasksByStatus("Completed").map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            {/* Task Modal */}
            {isModalOpen && (
                <TaskModal
                    onClose={() => setModalOpen(false)}
                    onSave={saveTask}
                    taskToEdit={currentTask}
                />
            )}
        </div>
    );
}

const styles = {
    container: {
        // display: "flex",
        // justifyContent: "space-between",
        padding: "20px",
        paddingTop: 0,
        // marginTop: "20px",
    },
    nameTxt: {
        fontFamily: "'Mulish', serif",
        fontWeight: "bold",
        fontSize: 14,
        color: "#666666",
    },
    dueTxt: {
        fontFamily: "'Mulish', serif",
        fontWeight: "bold",
        fontSize: 14,
        color: "#666666",
    },
    statusTask: {
        fontFamily: "'Mulish', serif",
        fontWeight: "bold",
        fontSize: 14,
        color: "#666666",
    },
    categoryTxt: {
        fontFamily: "'Mulish', serif",
        fontWeight: "bold",
        fontSize: 14,
        color: "#666666",
    },
    statusTxt: {
        fontFamily: "'Mulish', serif",
        fontWeight: "bold",
        fontSize: 14,
        color: "#666666",
    },

    cardStyles: {
        padding: "20px 0px",
        margin: "0 20px",
        borderTop: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",

    },
    card: {
        flex: 1,
        border: "1px solid #ddd",
        borderRadius: "8px 8px 8px 8px",
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F1F1F1",
        marginBottom: 10,

    },
    headingCard: {
        flex: 1,
        // border: "1px solid #ddd",
        borderRadius: "8px 8px 0 0",
        padding: "12px",
    },
    heading: {
        fontSize: "16px",
        fontWeight: "600",
        margin: 0,
        color: "#000000",

    },
};

export default Dashboard;
