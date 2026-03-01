import { useAuth } from "../context/AuthContext";

export default function TopBar() {
    const { user, logout } = useAuth();

    if (!user?.authenticated) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 1000,
            gap: "15px"
        }}>
            <div style={{ textAlign: "right", color: "#333", display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{user.name}</span>
                <span style={{ fontSize: "0.85rem", color: "#666" }}>{user.email}</span>
                <span style={{ fontSize: "0.85rem", color: "#007BFF", fontWeight: "600" }}>Role: {user.role || "NO-ROLE"}</span>
            </div>
            <button onClick={logout} style={{
                padding: "8px 16px",
                backgroundColor: "#FF4D4F",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.2s"
            }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ff7875")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF4D4F")}
            >
                Logout
            </button>
        </div>
    );
}
