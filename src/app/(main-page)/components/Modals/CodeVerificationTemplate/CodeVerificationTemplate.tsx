"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import { ArrowLeftIcon } from "@/svg/ArrowLeftIcon";
import InputField from "@/ui/Input/InputField";
import Portal from "@/components/Portal/Portal";
import { AuthServices } from "@/services/auth";
import { emitToast } from "@/helpers/emitToast";
import { delay } from "@/helpers/delay";
import { AnimatePresence, motion } from "framer-motion";
import CodeVerificationSuccessScreen from "./CodeVerificationSuccessScreen";
import { useRouter } from "next/navigation";
const b = block("code-verification-template");

interface CodeVerificationTemplateProps {
  onBack: () => void;
  email?: string;
  chatId?: string;
}

interface FormData {
  code: string[];
}

const CodeVerificationTemplate: React.FC<CodeVerificationTemplateProps> = ({
  onBack,
  email = "",
  chatId = "",
}) => {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      code: Array(6).fill(""),
    },
  });

  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isVerified, setVerified] = useState<boolean>(false);
  const codeValues = watch("code");
  const router = useRouter();

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
      const nextInput = document.getElementById(
        `code-input-${index + 1}`,
      ) as HTMLInputElement;

      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(0, 0);
      }

      if (currentInput) {
        currentInput.blur();
      }
    }
  };

  const handleFormSubmit = async () => {
    console.log(chatId, "chatId");
    try {
      setLoading(true);
      const otp = codeValues.join("");
      if (otp.length === 6) {
        const res = await AuthServices.verifyOtp({ email, chatId, otp });
        console.log(res, "Verification successful");

        setVerified(true);

        await delay(3000);

        const baseUrl = window.location.origin + window.location.pathname;

        window.location.replace(baseUrl);
      }
    } catch (error) {
      console.error("Verification failed", error);
      emitToast("Произошла ошибка авторизации", "error", 2000, "top-right");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (
    index: number, 
    event: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
  
    const pastedData = event.clipboardData.getData("Text");
    if (!/^\d{6}$/.test(pastedData)) {
      emitToast(
        "Произошла ошибка при вставке кода",
        "error",
        2000,
        "bottom-right"
      );
      return;
    }
  
    const updatedValues = pastedData.split("");
    setValue("code", updatedValues);
  
    const nextInput = document.getElementById(
      `code-input-${index}`
    ) as HTMLInputElement | null;
  
    if (nextInput) {
      nextInput.focus();
    }
  };
  
  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await AuthServices.sendEmail(email);
      resendCode();
      emitToast(
        "Новый код для авторизации отправлен Вам на почту!",
        "success",
        2000,
        "bottom-right",
      );
      console.log(res, "send email again");
    } catch (e) {
      emitToast(
        "Произошла ошибка при отправке нового кода",
        "error",
        2000,
        "bottom-right",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!isVerified ? (
        <motion.div
          key="form-screen"
          style={{ height: "100%" }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className={b()}>
            <Portal containerSelector=".modal-content">
              <div className={b("icon-back")} onClick={onBack}>
                <ArrowLeftIcon />
                <span className={b("icon-text-back")}>Назад</span>
              </div>
            </Portal>
            <div className={b("block-form")}>
              <h5 className={b("title")}>Введите код</h5>
              <p className={b("subtitle")}>
                Мы отправили вам на почту код для входа
              </p>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={b("form")}
              >
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
                          onPaste={(e) => handlePaste(index, e)}
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
                  disabled={isLoading}
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
                  <span
                    className={b("resend-info-link-click")}
                    onClick={sendEmail}
                  >
                    Нажмите здесь
                  </span>
                </span>
              ) : (
                <>
                  <span>Новый код отправлен :) </span>
                  <br />
                  <span>
                    {" "}
                    Повторить попытку можно через {resendTimer} секунд
                  </span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="success-screen"
          className={b("success-screen-container")}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <CodeVerificationSuccessScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeVerificationTemplate;
