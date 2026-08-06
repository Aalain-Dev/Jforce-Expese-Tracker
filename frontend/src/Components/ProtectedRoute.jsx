import { Navigate } from "react-router-dom";
import { useAuth } from "../Features/auth/context/auth.context.jsx";

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
