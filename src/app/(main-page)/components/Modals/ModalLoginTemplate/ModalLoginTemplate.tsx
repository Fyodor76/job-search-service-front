import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import { GoogleIcon } from "@/svg/GoogleIcon";
import { TelegramIcon } from "@/svg/TelegramIcon";
import { YandexIcon } from "@/svg/YandexIcon";
import ClearIcon from "@/svg/ClearIcon";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Link from "next/link";
import { baseUrl } from "@/const/baseUrl";
import InputFieldWithForm from "@/ui/Input/InputFieldWithForm";
import { AuthServices } from "@/services/auth";

interface FormData {
  email: string;
  termsAccepted: boolean;
}

interface ModalLoginTemplateProps {
  setCodeScreenHandler: (email: string) => void;
}

const b = block("modal-login-template");

const ModalLoginTemplate: FC<ModalLoginTemplateProps> = ({
  setCodeScreenHandler,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async ({ email }: FormData) => {
    try {
      setLoading(true);
      const res = await AuthServices.sendEmail(email);
      setCodeScreenHandler(email);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const clearEmail = () => {
    setValue("email", "");
  };

  return (
    <div className={b()}>
      <h5 className={b("title")}>Войдите в аккаунт</h5>
      <p className={b("subtitle")}>Введите свою электронную почту</p>
      <form onSubmit={handleSubmit(onSubmit)} className={b("form")}>
        <InputFieldWithForm
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
        <Button
          isFullWidth
          loading={isLoading}
          disabled={isLoading}
          type="submit"
        >
          Войти
        </Button>
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
            <p
              style={{
                color: errors.termsAccepted ? "red" : "inherit",
              }}
            >
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
