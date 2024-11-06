import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaTelegramPlane } from "react-icons/fa"; // Иконки Google и Telegram
import block from "bem-cn-lite";

// Типы для данных формы
interface FormData {
  email: string;
}

const b = block("modal-login-template"); // Инициализация BEM для модалки

const ModalLoginTemplate: React.FC = () => {
  // Инициализация useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submitted email:", data.email);
  };

  return (
    <div className={b()}>
      <h2 className={b("title")}>Войдите в аккаунт</h2>
      <p className={b("subtitle")}>Введите свою электронную почту</p>

      <form onSubmit={handleSubmit(onSubmit)} className={b("form")}>
        <input
          type="email"
          placeholder="example@mail.com"
          {...register("email", {
            required: "Почта обязательна для заполнения",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Введите корректный email",
            },
          })}
          className={b("input")}
        />
        {errors.email && (
          <p className={b("error-message")}>{errors.email.message}</p>
        )}
        <p className={b("modal-subtext")}>
          Найдем вас в системе или зарегистрируем
        </p>
        <button type="submit" className={b("login-button")}>
          Войти
        </button>
      </form>
      <p className={b("other-methods")}>Или используйте другие способы</p>
      <div className={b("auth-icons")}>
        <FaGoogle className={b("auth-icon")} />
        <FaGoogle className={b("auth-icon")} />
        <FaTelegramPlane className={b("auth-icon")} />
      </div>
      <label className={b("agreement")}>
        <input type="checkbox" className={b("checkbox")} /> Авторизируясь в
        Системе, вы подтверждаете, что принимаете условия{" "}
        <a href="/terms">Пользовательского соглашения</a> и даете добровольное
        согласие на обработку ваших персональных данных
      </label>
    </div>
  );
};

export default ModalLoginTemplate;
