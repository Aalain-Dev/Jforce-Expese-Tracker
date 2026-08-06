import { Navigate } from "react-router-dom";
import { useAuth } from "../Features/auth/context/auth.context.jsx";

const PublicRoute = ({ children }) => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/dashboard/home" replace />;
    }

    return children;
};

export default PublicRoute;
