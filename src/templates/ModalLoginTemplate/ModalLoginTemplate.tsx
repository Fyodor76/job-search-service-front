import React from "react";
import { useForm } from "react-hook-form";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import { GoogleIcon } from "@/svg/GoogleIcon";
import { TelegramIcon } from "@/svg/TelegramIcon";
import { YandexIcon } from "@/svg/YandexIcon";
import Input from "@/ui/Input/Input";
import ClearIcon from "@/svg/ClearIcon";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Link from "next/link";
import { baseUrl } from "@/const/baseUrl";

interface FormData {
  email: string;
  termsAccepted: boolean;
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
    console.log("Submitted email:", data);
  };

  const clearEmail = () => {
    setValue("email", "");
  };

  return (
    <div className={b()}>
      <h5 className={b("title")}>Войдите в аккаунт</h5>
      <p className={b("subtitle")}>Введите свою электронную почту</p>
      <form onSubmit={handleSubmit(onSubmit)} className={b("form")}>
        <Input
          type="email"
          placeholder="example@mail.com"
          size="medium"
          required
          control={control}
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
        <p className={b("modal-subtext")}>
          Найдем вас в системе или зарегистрируем
        </p>
        <Button isFullWidth>Войти</Button>
      </form>
      <p className={b("other-methods")}>Или используйте другие способы</p>
      <div className={b("auth-icons")}>
        <Link href={`${baseUrl}/auth/yandex/`} className={b("icon-block")}>
          <YandexIcon />
        </Link>
        <Link href={`${baseUrl}/auth/google/`} className={b("icon-block")}>
          <GoogleIcon />
        </Link>
        <Link
          href="https://t.me/job_search_service_bot"
          className={b("icon-block")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
        </Link>
      </div>
      <div className={b("agreement")}>
        <Checkbox
          id="termsCheckbox"
          label={
            <p>
              Авторизируясь в Системе, вы подтверждаете, что принимаете условия{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Пользовательского соглашения
              </a>{" "}
              и даете добровольное согласие на обработку ваших персональных
              данных
            </p>
          }
          name="termsAccepted"
          control={control}
          rules={{ required: "Вы должны согласиться с условиями" }}
        />
      </div>
    </div>
  );
};

export default ModalLoginTemplate;
