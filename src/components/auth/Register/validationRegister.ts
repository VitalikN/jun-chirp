import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  userName: Yup.string()
    .min(3, "Ім'я може містити від 3 до 50 символів")
    .max(50, "Ім'я може містити від 3 до 50 символів")
    .matches(
      /^[a-zA-Zа-яА-ЯЇїЄєІіҐґ' -]+$/,
      "Ім’я може містити тільки літери (a-z, А-Я), пробіли, апострофи та дефіси"
    )
    .required("Ім'я не може бути порожнім"),

  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .required("Поле електронної пошти не може бути порожнім")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)*\.[a-zA-Z]{2,}$/,
      "Введіть дійсну електронну адресу у форматі username@example.com"
    ),
  password: Yup.string()
    .min(8, "Пароль повинен містити щонайменше 8 символів")
    .max(20, "Пароль може містити не більше 20 символів")
    .matches(/[a-zа-я]/, "Пароль має містити принаймні одну малу літеру")
    .matches(/[A-ZА-Я]/, "Пароль має містити принаймні одну велику літеру")
    .matches(/\d/, "Пароль має містити принаймні одну цифру")
    .matches(
      /[!@#$%^&*]/,
      "Пароль повинен містити спеціальний символ (!@#$%^&*)"
    )
    .matches(/^\S*$/, "Пароль не повинен містити пробілів")
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
      "Уникайте очевидних паролів, таких як 'password123'"
    )
    .test("no-name", "Пароль не повинен містити ваше ім'я", function (value) {
      const { userName } = this.parent;
      return !value || !new RegExp(userName, "i").test(value);
    })
    .required("Будь ласка, введіть пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Паролі не збігаються")
    .required("Будь ласка, введіть пароль"),

  rememberMe: Yup.boolean()
    .oneOf(
      [true],
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    )
    .required(
      "Ви повинні погодитись з умовами використання та політикою конфіденційності"
    ),
});
