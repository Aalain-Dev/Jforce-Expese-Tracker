import { Navigate } from "react-router-dom";
import { useAuth } from "../Features/auth/context/auth.context.jsx";

/**
 * ProtectedRoute — wraps dashboard / private pages.
 * If the user is NOT logged in (no token), redirect them back to
 * the login page so they can't access protected content.
 */
const ProtectedRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
