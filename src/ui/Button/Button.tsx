import React from "react";
import cn from "classnames";
import "./Button.scss";
import Loader from "@/components/Loader/Loader";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  isFullWidth?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color = "#2F2F2F",
  size = "medium",
  type = "button",
  disabled = false,
  loading = false,
  className,
  isFullWidth,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      data-size={size}
      data-full-width={isFullWidth ? "true" : "false"}
      data-disabled={disabled || loading ? "true" : "false"}
      className={cn("button", className)}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <Loader width="28px" height="28px" isLoading={loading} />
      ) : (
        children || "Button"
      )}
    </button>
  );
};

export default Button;
