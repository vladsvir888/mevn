import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    activationLink: {
      type: String,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    recoveryLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
