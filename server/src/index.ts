import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error-middleware";
import userRouter from "./routers/user-router";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api/auth", userRouter);
app.use(errorMiddleware);

const bootstrap = () => {
  app.listen(PORT, async () => {
    try {
      console.log(`App listening on port ${PORT}`);
      await mongoose.connect(process.env.MONGODB_CONNECT ?? "");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  });
};

bootstrap();
