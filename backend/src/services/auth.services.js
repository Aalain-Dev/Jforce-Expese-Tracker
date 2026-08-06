import prisma from "../config/db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Creates an HTTP-aware error with a statusCode property.
 * The global error handler reads err.statusCode to set the HTTP status.
 */
const createHttpError = (statusCode, message) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

const signToken = (user) =>
    jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

const createUser = async (data) => {
    const { username, password, email, full_name } = data;

    if (!username || !password || !email || !full_name) {
        throw createHttpError(400, "All fields are required");
    }

    if (!EMAIL_REGEX.test(email)) {
        throw createHttpError(400, "Invalid email format");
    }

    const existingUser = await prisma.users.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw createHttpError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data: {
            username,
            password: hashedPassword,
            email,
            full_name,
        },
    });

    // Don't return the hashed password to the client
    const { password: _, ...safeUser } = user;
    return safeUser;
};

const signinuser = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        throw createHttpError(400, "Email and password are required");
    }

    const user = await prisma.users.findUnique({
        where: { email },
    });

    if (!user) {
        throw createHttpError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw createHttpError(401, "Invalid email or password");
    }

    const token = signToken(user);

    // Don't return the hashed password to the client
    const { password: _, ...safeUser } = user;
    return { user: safeUser, token };
};

export {
    createUser,
    signinuser
}