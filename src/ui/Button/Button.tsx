import React from "react";
import cn from "classnames";
import "./Button.scss";

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
      {loading ? "Loading..." : children || "Button"}
    </button>
  );
};

export default Button;
