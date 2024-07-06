import * as Yup from "yup";

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .email("Введіть дійсну електронну адресу у форматі username@example.com")
    .required("Обов'язкове поле!"),

  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів.")
    .required("Обов'язкове поле!"),
});
