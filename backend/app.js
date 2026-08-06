import express from "express"
import cors from "cors"
import helmet from "helmet"
import authroutes from "./src/routes/auth.route.js"
import expenseroutes from "./src/routes/expense.route.js"
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config()
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: "Too many requests. Please try again after 15 minutes.",
        errors: [],
    },
});

app.use(globalLimiter)
app.use("/api/v1/auth", authroutes)
app.use("/api/v1/expenses", expenseroutes)

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        data: null,
    });
});

export default app;