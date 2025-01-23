import { body } from "express-validator";

const userValidator = [
  body("email", "Неверный адрес электронной почты.").isEmail(),
  body("password", "Минимальная длина пароля — 6 символов.").isLength({
    min: 6,
  }),
];

export default userValidator;
