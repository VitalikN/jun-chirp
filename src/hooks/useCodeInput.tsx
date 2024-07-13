import { useRef } from "react";
import { FormikHelpers } from "formik";

interface FormValues {
  code: string;
}

const useCodeInput = () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"],
    values: FormValues
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = values.code.split("");
      newCode[index] = value;
      setFieldValue("code", newCode.join(""));
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLDivElement>,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"]
  ) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      setFieldValue("code", paste);
      inputRefs.current.forEach((ref, i) => {
        if (ref) ref.value = paste[i];
      });
    }
    e.preventDefault();
  };

  return {
    inputRefs,
    handleChange,
    handlePaste,
  };
};

export default useCodeInput;
