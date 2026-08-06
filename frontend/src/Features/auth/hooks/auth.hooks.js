import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginuser, register } from "../services/auth.service.js";
import { useAuth } from "../context/auth.context.jsx";

export const useLogin = () => {
    const { saveAuth, setLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async ({ email, password }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginuser({ email, password });
            const { user, token } = response.data;
            saveAuth(user, token);
            navigate("/dashboard/home");
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Login failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, error, isLoading };
};

export const useRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const signup = async ({ username, email, password, full_name }) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await register({ username, email, password, full_name });
            setSuccess(true);
            navigate("/");
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, error, isLoading, success };
};
