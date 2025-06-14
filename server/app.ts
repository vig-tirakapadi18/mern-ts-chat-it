import express, { Request, Response } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./src/db/connectToDB";
import { app, server } from "./src/socketio/socket";

// Routes
import authRoutes from "./src/routes/auth.route";
import userRoutes from "./src/routes/user.route";
import messageRoutes from "./src/routes/message.route";

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5137", process.env.CLIENT_URL as string],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}!`);
  connectToDB();
});
