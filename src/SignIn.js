import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "./firebase.js";
import Task from './asserts/images/task-list.svg';
import circles from './asserts/images/circles.svg';
import Google from './asserts/images/google.svg';
import taskIcon from './asserts/images/task.svg';
import useWindowWidth from "./useWindowWidth.js"; // Import the custom hook

function SignIn() {
    const navigate = useNavigate();
    const width = useWindowWidth(); // Get current screen width

    // Responsive styles based on screen width
    const responsiveStyles = {
        container: {
            ...styles.container,
            flexDirection: width < 768 ? "column" : "row",
            textAlign: width < 768 ? "center" : "left",
            paddingLeft: width < 768 ? "20px" : "80px",
            justifyContent: width < 768 ? "center" : "space-between",
        },
        desc: {
            ...styles.desc,
            fontSize: width < 768 ? "14px" : "11px",
            maxWidth: width < 768 ? "100%" : "300px",
            marginTop: width < 768 ? "10px" : "0px",
        },
        btn: {
            ...styles.btn,
            padding: width < 768 ? "10px 40px" : "14px 60px",
        },
        imageCoile: {
            ...styles.imageCoile,
            bottom: width < 768 ? "100%" : "-10%",
            right: width < 768 ? "10px" : "-10%",
            width: width < 768 ? "100px" : "120%",
        },
        imageBanner: {
            ...styles.imagebanner,
            width: width < 768 ? "80%" : "100%",
            margin: width < 768 ? "0 auto" : "0",
            display: width < 768 ? "none" : "block",
        },
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("User Info:", result.user);
            navigate("/dashboard"); // Redirect to the dashboard
        } catch (error) {
            console.error("Error during sign-in:", error.message);
        }
    };

    return (
        <div style={responsiveStyles.container}>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={taskIcon} alt="taskIcon" />
                    <h4 style={styles.title}>TaskBuddy</h4>
                </div>
                <h1 style={responsiveStyles.desc}>
                    Streamline your workflow and track progress effortlessly with our all-in-one task management app.
                </h1>
                <button onClick={handleGoogleSignIn} style={responsiveStyles.btn}>
                    <img src={Google} alt="Google" />
                    <span style={styles.continue}>Continue with Google</span>
                </button>
            </div>

            <div style={styles.imageContainer}>
                <div style={responsiveStyles.imageCoile}>
                    <img src={circles} alt="circles" />
                </div>
                <div style={responsiveStyles.imageBanner}>
                    <img src={Task} alt="task-list.svg" />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        backgroundColor: '#FFF9F9',
        height: "100%",
        width: "100%",
        paddingLeft: "80px",
        boxSizing: "border-box",
    },
    title: {
        fontWeight: "bold",
        fontSize: "26px",
        margin: "0",
    },
    desc: {
        maxWidth: "300px",
        fontWeight: "500",
        fontSize: "11px",
        textAlign: "left",
    },
    btn: {
        padding: "14px 60px",
        borderRadius: "18px",
        marginTop: "30px",
        backgroundColor: "#292929",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        cursor: "pointer",
    },
    continue: {
        fontFamily: "Urbanist, serif",
        fontOpticalSizing: "auto",
        fontWeight: "bold",
        fontStyle: "normal",
        fontSize: 21,
        color: "#FFFFFF",
        marginLeft: "4px",
    },
    imageContainer: {
        position: 'relative',
    },
    imageCoile: {
        position: 'absolute',
        bottom: "-10%",
        right: 0,
        zIndex: 1,
    },
    imagebanner: {
        position: 'relative',
        zIndex: 2,
    },
};

export default SignIn;
