import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = model("Token", tokenSchema);

export default TokenModel;
