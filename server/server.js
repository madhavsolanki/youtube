import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db_connection.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";

dotenv.config();
const app = express();
connectDB();

const allowedOrigins = ['http://localhost:5173'];


  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

const port = process.env.PORT || 5500;

// Server Health Check
app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});