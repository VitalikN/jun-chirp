import * as Yup from "yup";

export const validationSchemaResetPassword = Yup.object().shape({
  code: Yup.string()
    .length(6, "Код має містити рівно 6 цифр.")
    .matches(/^\d{6}$/, "Код повинен складатися тільки з 6 цифр.")
    .required("Обов'язкове поле!"),
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Обов'язкове поле!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),

  newPassword: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів.")
    .matches(/[a-zа-я]/, "Пароль має містити принаймні одну малу літеру.")
    .matches(/[A-ZА-Я]/, "Пароль має містити принаймні одну велику літеру.")
    .matches(/\d/, "Пароль має містити принаймні одну цифру.")
    .matches(
      /[!@#$%^&*]/,
      "Пароль повинен містити спеціальний символ (!@#$%^&*)."
    )
    .matches(/^\S*$/, "Пароль не повинен містити пробілів.")
    .notOneOf(
      [
        "password",
        "123456",
        "12345678",
        "1234",
        "qwerty",
        "12345",
        "dragon",
        "baseball",
        "football",
        "letmein",
        "monkey",
        "696969",
        "abc123",
        "mustang",
        "shadow",
        "master",
        "666666",
        "qwertyuiop",
        "123321",
        "password1",
        "123",
      ],
      "Уникайте очевидних паролів, таких як 'password123'."
    )

    .required("Обов'язкове поле!"),
});
