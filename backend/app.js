import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.mddleware.js";
import { connectToDb } from "./db/connectToDb.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRoutes);
app.use('/api/messages' , messageRoutes)
app.use('/api/users' , userRoutes)
app.use(errorMiddleware);
app.listen(PORT, async () => {
  await connectToDb();
  console.log(`server is running on port ${PORT} ⚡👺`);
});