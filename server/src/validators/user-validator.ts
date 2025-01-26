import { body } from "express-validator";

const emailValidator = () => {
  return body("email", "Неверный формат электронной почты.").isEmail();
};

const passwordValidator = () => {
  return body("password", "Минимальная длина пароля — 6 символов.").isLength({
    min: 6,
  });
};

export const userValidator = [emailValidator(), passwordValidator()];
