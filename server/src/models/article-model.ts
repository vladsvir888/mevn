import { Schema, model } from "mongoose";

const articleSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    type: {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const ArticleModel = model("Article", articleSchema);

export default ArticleModel;
