import { Schema, model } from "mongoose";

const articleTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const ArticleTypeModel = model("ArticleType", articleTypeSchema);

export default ArticleTypeModel;
