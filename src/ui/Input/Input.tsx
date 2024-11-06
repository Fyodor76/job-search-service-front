import React from "react";
import { useController, Control } from "react-hook-form";
import cn from "classnames";
import "./Input.scss";

interface InputProps {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  error?: string;
  className?: string;
  isFullWidth?: boolean;
  name: string;
  required?: boolean;
  pattern?: string;
  icon?: React.ReactNode;
  control: Control<any>;
  rules?: object;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  size = "medium",
  disabled = false,
  className,
  isFullWidth,
  name,
  required = false,
  pattern,
  icon,
  control,
  rules,
}) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  return (
    <div className={cn("input-wrapper", className)}>
      <div className="input-container">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
          required={required}
          pattern={pattern}
          data-size={size}
          data-full-width={isFullWidth ? "true" : "false"}
          data-disabled={disabled ? "true" : "false"}
          data-error={fieldError ? "true" : "false"}
          className={cn("input", `input--${size}`, {
            "input--error": fieldError,
            "input--disabled": disabled,
            "input--full-width": isFullWidth,
          })}
          disabled={disabled}
        />
        {icon && value && <span className="input-icon">{icon}</span>}
      </div>
      {fieldError && <div className="input-error">{fieldError.message}</div>}
    </div>
  );
};

export default Input;
