import useCountdown from "@/hooks/useCountdown";
import block from "bem-cn-lite";

const b = block("code-verification-template");

const CodeVerificationSuccessScreen = () => {
  const leftTime = useCountdown(3);

  return (
    <div className={b("success-screen")}>
      <div className={b("checkmark-icon")}>✅</div>
      <p className={b("success-text")}>
        Авторизация завершена! Вы будете перенаправлены в систему через{" "}
        {leftTime}
      </p>
    </div>
  );
};

export default CodeVerificationSuccessScreen;
