import * as Yup from "yup";

export const rolesValidationSchema = Yup.object({
  role: Yup.string().required(
    "Будь ласка, виберіть однин з кабінетів, щоб продовжити."
  ),
});
