import { apiClient } from "../../apiBase.js"

/**
 * Register a new user.
 * Backend expects: { username, password, email, full_name }
 * @param {{ username: string, email: string, password: string, full_name: string }} payload
 */
export const register = async ({ username, email, password, full_name }) => {
    const data = { username, password, email, full_name };
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
};

/**
 * Login an existing user.
 * Backend expects: { email, password }
 * Returns: { data: { user, token }, message }
 * @param {{ email: string, password: string }} payload
 */
export const loginuser = async ({ email, password }) => {
    const data = { email, password };
    const response = await apiClient.post("/auth/login", data);
    return response.data;
};