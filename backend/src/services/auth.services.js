import prisma from "../config/db.js"
import bcrypt from "bcryptjs"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import jwt from "jsonwebtoken"
const signToken = (user) =>
    jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
const createUser = async (data) => {
    const { username, password, email, full_name } = data;

    if (!username || !password || !email || !full_name) {
        throw new Error("All fields are required");
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new Error("Invalid email format");
    }

    const existingUser = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
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

    return user;
};



const signinuser = async (data) => {
    const { email, password } = data;

    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = signToken(user);

    return { user, token };
};
export {
    createUser,
    signinuser
}