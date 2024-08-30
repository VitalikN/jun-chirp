import * as Yup from "yup";

export const validationSchemaRequestPasswordReset = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Поле електронної пошти не може бути порожнім")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),
});
