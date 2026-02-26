import express from "express"
import connectDb from "./config/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Rejection: ${error.message}`);
    server.close(() => process.exit(1));
});

process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});


app.use(errorMiddleware);