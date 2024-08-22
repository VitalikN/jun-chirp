import * as Yup from "yup";

export const validationSchemaConfirm = Yup.object().shape({
  code: Yup.string()
    .length(6, "Код має містити 6 цифр")
    .required("Код не може бути порожнім"),
});
