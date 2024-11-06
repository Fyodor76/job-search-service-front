import React from "react";
import { useForm } from "react-hook-form";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import { GoogleIcon } from "@/svg/GoogleIcon";
import { TelegramIcon } from "@/svg/TelegramIcon";
import { YandexIcon } from "@/svg/YandexIcon";
import Input from "@/ui/Input/Input";
import ClearIcon from "@/svg/ClearIcon";

interface FormData {
  email: string;
}

const b = block("modal-login-template");

const ModalLoginTemplate: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submitted email:", data.email);
  };

  const clearEmail = () => {
    setValue("email", "");
  };

  return (
    <div className={b()}>
      <h2 className={b("title")}>Войдите в аккаунт</h2>
      <p className={b("subtitle")}>Введите свою электронную почту</p>
      <form onSubmit={handleSubmit(onSubmit)} className={b("form")}>
        <Input
          type="email"
          placeholder="example@mail.com"
          size="medium"
          required
          control={control} // Передаем control в Input
          name="email"
          rules={{
            required: "Почта обязательна для заполнения",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Введите корректный email",
            },
          }}
          icon={<ClearIcon className={b("clear-icon")} onClick={clearEmail} />}
        />
        {errors.email && (
          <p className={b("error-message")}>{errors.email.message}</p>
        )}
        <p className={b("modal-subtext")}>
          Найдем вас в системе или зарегистрируем
        </p>
        <Button isFullWidth>Войти</Button>
      </form>
      <p className={b("other-methods")}>Или используйте другие способы</p>
      <div className={b("auth-icons")}>
        <div className={b("icon-block")}>
          <YandexIcon />
        </div>
        <div className={b("icon-block")}>
          <GoogleIcon />
        </div>
        <div className={b("icon-block")}>
          <TelegramIcon />
        </div>
      </div>
      <div className={b("agreement")}>
        <label>
          <input type="checkbox" className={b("checkbox")} /> Авторизируясь в
          Системе, вы подтверждаете, что принимаете условия{" "}
          <a href="/terms">Пользовательского соглашения</a> и даете добровольное
          согласие на обработку ваших персональных данных
        </label>
      </div>
    </div>
  );
};

export default ModalLoginTemplate;
