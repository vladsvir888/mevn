import mongoose from "mongoose";
import "dotenv/config";
import ArticleTypeModel from "../models/article-type-model";

(async () => {
  const data = [
    { name: "Научная", code: "scientific" },
    { name: "Техническая", code: "technical" },
    { name: "Политическая ", code: "political" },
  ];

  try {
    await mongoose.connect(process.env.MONGODB_CONNECT ?? "");
    await ArticleTypeModel.insertMany(data);
    await mongoose.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
})();
