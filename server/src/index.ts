import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import ErrorMiddleware from "./middlewares/error-middleware";
import userRouter from "./routers/user-router";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/api/auth", userRouter);
app.use(ErrorMiddleware);

const bootstrap = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECT ?? "");

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

bootstrap();
