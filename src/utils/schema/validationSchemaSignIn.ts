import * as Yup from "yup";

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email("Введіть дійсну електронну адресу у форматі username@example.com")
    .required("Поле електронної пошти не може бути порожнім"),

  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів.")
    .required("Будь ласка, введіть пароль"),
});
