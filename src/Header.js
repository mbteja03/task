// src/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Title from "./asserts/images/Title.svg";
import logout from "./asserts/icons/logout.svg";

function Header({ user }) {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate("/"); // Redirect to the sign-in page
        } catch (error) {
            console.error("Error during sign-out:", error.message);
        }
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>
                <img src={Title} alt="Title" />
            </h1>
            {user ? (
                <div >
                    <div style={styles.userContainer}>
                        <img src={user.photoURL} alt="Profile" style={styles.profilePic} />
                        <span style={styles.userName}>{user.displayName}</span>
                    </div>
                    <button onClick={handleSignOut} style={styles.signOutButton}>
                    <img src={logout} alt="logout" />
                        Logout
                    </button>
                </div>
            ) : null}
        </header>
    );
}

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#ffffff",
        color: "white",
    },
    title: {
        margin: 0,
    },
    userContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    profilePic: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "1px solid #ead7e7",
    },
    userName: {
        fontWeight: "bold",
        color: '#000000',
        opacity: "0.6",
    },
    signOutButton: {
        padding: "12px 10px",
        backgroundColor: "#fffaf9",
        color: "#000000",
        border: "1px solid #ead7e7",
        borderRadius: "12px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "5px",
    },
};

export default Header;
