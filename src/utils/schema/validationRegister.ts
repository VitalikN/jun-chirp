import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  userName: Yup.string()
    .min(3, "ім'я може містити від 3 до 50 символів")
    .max(50, "ім'я може містити від 3 до 50 символів")
    .matches(
      /^[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ' -]+$/,
      "Ім’я може містити тільки букви, пробіли, апострофи і дефіси"
    )
    .required("Ім’я не може бути порожнім"),

  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Обов'язкове поле!")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),

  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів.")
    .matches(/[a-z]/, "Пароль має містити принаймні одну малу літеру.")
    .matches(/[A-Z]/, "Пароль має містити принаймні одну велику літеру.")
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
    .test(
      "no-name",
      "Пароль не повинен містити ваше ім'я або прізвище.",
      function (value) {
        const { userName } = this.parent;
        return !value || !new RegExp(userName, "i").test(value);
      }
    )
    .required("Обов'язкове поле!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Паролі повинні збігатися")
    .required("Обов'язкове поле!"),

  rememberMe: Yup.boolean()
    .oneOf(
      [true],
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    )
    .required(
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    ),
});
