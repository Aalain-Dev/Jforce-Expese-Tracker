import express from "express"
import cors from "cors"
import helmet from "helmet"
import authroutes from "./src/routes/auth.route.js"
import expenseroutes from "./src/routes/expense.route.js"
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config()
const app = express()

app.use(cors())
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
app.use("/ap/v1/auth", authroutes)
app.use("/ap/v1/expenses", expenseroutes)

app.get("/health", (res) => {
    res.status(200).json(
        {
            message: "Server is running",
        }
    )
})

export default app;