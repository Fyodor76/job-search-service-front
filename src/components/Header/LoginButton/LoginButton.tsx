import React from "react";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";

const b = block("header");

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <Button size="medium" className={b("login-button")} onClick={onClick}>
      Войти
    </Button>
  );
};

export default LoginButton;
