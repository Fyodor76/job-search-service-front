"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import { ArrowLeftIcon } from "@/svg/ArrowLeftIcon";
import InputField from "@/ui/Input/InputField";
import Portal from "@/components/Portal/Portal";
import { AuthServices } from "@/services/auth";

const b = block("code-verification-template");

interface CodeVerificationTemplateProps {
  onBack: () => void;
  email: string;
}

interface FormData {
  code: string[];
}

const CodeVerificationTemplate: React.FC<CodeVerificationTemplateProps> = ({
  onBack,
  email,
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      code: Array(6).fill(""),
    },
  });

  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const codeValues = watch("code");

  useEffect(() => {
    const savedTime = localStorage.getItem("resendTime");
    const emailInStorage = localStorage.getItem("emailAuth");

    if (savedTime && email === emailInStorage) {
      const remainingTime = parseInt(savedTime) - Date.now();
      if (remainingTime > 0) {
        setResendTimer(Math.floor(remainingTime / 1000));
      } else {
        localStorage.removeItem("resendTime");
      }
    }
  }, [email]);

  useEffect(() => {
    if (resendTimer !== null) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev && prev > 0) return prev - 1;
          clearInterval(interval);
          return null;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const resendCode = () => {
    const fiveMinutes = 5 * 60 * 1000;
    const newResendTime = Date.now() + fiveMinutes;
    localStorage.setItem("resendTime", newResendTime.toString());
    localStorage.setItem("emailAuth", email);
    setResendTimer(300);
    console.log("Code resent!");
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updatedValues = [...codeValues];
    updatedValues[index] = value;
    setValue("code", updatedValues);

    if (value && index < 5) {
      const currentInput = document.getElementById(`code-input-${index}`);
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (currentInput) (nextInput as HTMLInputElement).blur();
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const code = codeValues.join("");
      if (code.length === 6) {
        const res = await AuthServices.verifyOtp(email, code);
        console.log(res, "Verification successful");
        window.location.reload();
      }
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.sendEmail(email);
      console.log(res, "send email again");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={b()}>
      <Portal containerSelector=".modal-content">
        <div className={b("icon-back")} onClick={onBack}>
          <ArrowLeftIcon />
          <span className={b("icon-text-back")}>Назад</span>
        </div>
      </Portal>
      <div className={b("block-form")}>
        <h5 className={b("title")}>Введите код</h5>
        <p className={b("subtitle")}>Мы отправили вам на почту код для входа</p>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={b("form")}>
          <div className={b("inputs")}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Controller
                key={index}
                name={`code.${index}` as const}
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    type="text"
                    size="medium"
                    maxLength={1}
                    value={field.value || ""}
                    onChange={(value: string) =>
                      handleInputChange(index, value)
                    }
                    className={b("inputs-input")}
                    id={`code-input-${index}`}
                    placeholder="0"
                  />
                )}
              />
            ))}
          </div>
          <Button
            isFullWidth
            loading={isLoading}
            className={b("button")}
            type="submit"
          >
            Подтвердить
          </Button>
        </form>
      </div>
      <p className={b("resend-info")}>
        {!resendTimer ? (
          <span className={b("resend-info-link")}>
            Не получили код?{" "}
            <span className={b("resend-info-link-click")} onClick={sendEmail}>
              Нажмите здесь
            </span>
          </span>
        ) : (
          `Отправить код повторно можно через ${resendTimer} сек.`
        )}
      </p>
    </div>
  );
};

export default CodeVerificationTemplate;
