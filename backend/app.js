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
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                  // max 100 requests per IP per window
    standardHeaders: true,     // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,      // Disable the `X-RateLimit-*` headers
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

// ─── Global Error Handler ────────────────────────────────────────────────────
// Must be defined AFTER all routes. Catches any error passed to next(error)
// or thrown inside an asyncHandler-wrapped route.
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