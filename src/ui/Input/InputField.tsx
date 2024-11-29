import React, { forwardRef } from "react";
import cn from "classnames";

interface InputFieldProps {
  type: "text" | "email" | "password" | "number" | "tel" | "date" | "textarea";
  placeholder?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  isFullWidth?: boolean;
  name?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
  value?: string;
  maxLength?: number;
  id?: string;
  error?: string;
  onPaste?: (
    e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void; // Добавляем onPaste
}

const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(
  (
    {
      type,
      placeholder,
      size = "medium",
      disabled = false,
      className,
      isFullWidth,
      name,
      required = false,
      icon,
      onChange,
      id,
      value,
      maxLength,
      error,
      onPaste, // Пробрасываем onPaste
    },
    ref,
  ) => {
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      let newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) {
        // Обрезаем значение до maxLength
        newValue = newValue.slice(0, maxLength);
      }
      onChange?.(newValue);
    };

    return (
      <div className={cn("input-wrapper")}>
        <div className="input-container">
          {type === "textarea" ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onPaste={onPaste} // Добавляем обработчик onPaste
              name={name}
              id={id}
              required={required}
              data-size={size}
              data-full-width={isFullWidth ? "true" : "false"}
              data-disabled={disabled ? "true" : "false"}
              data-error={error ? "true" : "false"}
              className={cn("input", className, {
                "input--error": error,
                "input--disabled": disabled,
                "input--full-width": isFullWidth,
              })}
              disabled={disabled}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onPaste={onPaste} // Добавляем обработчик onPaste
              name={name}
              id={id}
              required={required}
              data-size={size}
              data-full-width={isFullWidth ? "true" : "false"}
              data-disabled={disabled ? "true" : "false"}
              data-error={error ? "true" : "false"}
              className={cn("input", className, {
                "input--error": error,
                "input--disabled": disabled,
                "input--full-width": isFullWidth,
              })}
              disabled={disabled}
            />
          )}
          {icon && value && <span className="input-icon">{icon}</span>}
        </div>
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  },
);

export default InputField;
