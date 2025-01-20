import { body } from "express-validator";

const userValidator = [
  body("email", "Invalid email").isEmail(),
  body("password", "The minimum password length is 6 characters").isLength({
    min: 6,
  }),
];

export default userValidator;
