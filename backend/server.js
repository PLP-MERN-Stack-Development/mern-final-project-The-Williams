import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import userRoutes from "./routes/UserRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "RecipeHub API" }));

app.use("/api/v1/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.use(notFound);
app.use(errorHandler);

// Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});
app.set("io", io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
