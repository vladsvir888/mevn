import { body } from "express-validator";

const emailValidator = () => {
  return body("email", "Неверный формат электронной почты.").isEmail();
};

const passwordValidator = () => {
  return body("password", "Минимальная длина пароля — 6 символов.").isLength({
    min: 6,
  });
};

const nameValidator = () => {
  return body("name", "Обяазательное поле.").isLength({
    min: 1,
  });
};

const surnameValidator = () => {
  return body("surname", "Обяазательное поле.").isLength({
    min: 1,
  });
};

export const registrationValidator = [
  nameValidator(),
  surnameValidator(),
  emailValidator(),
  passwordValidator(),
];

export const loginValidator = [emailValidator(), passwordValidator()];
