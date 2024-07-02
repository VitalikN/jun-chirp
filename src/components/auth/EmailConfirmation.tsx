import React from "react";
import s from "@/sass/components/emailConfirmation.module.scss";

const EmailConfirmation = () => {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2>Підтвердження електронної пошти</h2>
        <p>
          Введіть 6-значний код, який ми надіслали на вашу пошту -
          example@example.com
        </p>
      </div>
    </section>
  );
};

export default EmailConfirmation;
