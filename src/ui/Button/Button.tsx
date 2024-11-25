import React from "react";
import cn from "classnames";
import "./Button.scss";
import Loader from "@/components/Loader/Loader";

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
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
    >
      {loading ? (
        <Loader position="static" width="28px" height="28px" />
      ) : (
        children || "Button"
      )}
    </button>
  );
};

export default Button;
