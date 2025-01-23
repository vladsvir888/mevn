import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/error-middleware";
import userRouter from "./routers/user-router";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", userRouter);
app.use(ErrorMiddleware);

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
