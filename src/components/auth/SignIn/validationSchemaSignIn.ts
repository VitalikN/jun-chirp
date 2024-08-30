import * as Yup from "yup";

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Поле електронної пошти не може бути порожнім")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),
  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів")
    .required("Будь ласка, введіть пароль"),
});
