// ProtectedRoute.jsx
import { Navigate } from "react-router";

export default function ProtectedRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        // Login nai
        return <Navigate to="/login" replace />;
    }


    return children;
}
