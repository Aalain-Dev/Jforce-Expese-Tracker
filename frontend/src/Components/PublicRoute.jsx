import { Navigate } from "react-router-dom";
import { useAuth } from "../Features/auth/context/auth.context.jsx";

/**
 * PublicRoute — wraps auth pages (Login / Sign Up).
 * If the user is already logged in (token exists), redirect them
 * straight to the dashboard so they can't revisit the auth screens.
 */
const PublicRoute = ({ children }) => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/dashboard/home" replace />;
    }

    return children;
};

export default PublicRoute;
