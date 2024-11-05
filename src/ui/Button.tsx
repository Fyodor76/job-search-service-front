import React from "react";
import cn from "classnames";
import "./Button.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  color = "#2F2F2F",
  size = "medium",
  disabled = false,
  loading = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className={cn(
        "button",
        `button--${size}`,
        { disabled: disabled || loading },
        className,
      )}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
