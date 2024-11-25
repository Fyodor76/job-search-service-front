import React from "react";
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
}

const InputField: React.FC<InputFieldProps> = ({
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
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = e.target.value;
    // Если максимальная длина установлена и значение превышает maxLength
    if (maxLength && newValue.length > maxLength) {
      console.log("dsadaadds");
      // Обрезаем значение до maxLength
      newValue = newValue.slice(0, maxLength);
    }

    console.log(newValue, "sdaadsadsadsdadasdas");
    // Если длина значения достигла maxLength, заменяем последний символ
    if (maxLength && newValue.length === maxLength + 1) {
      console.log("dsadsadds", newValue);
      onChange?.(newValue); // Передаём обновленное значение
    } else {
      onChange?.(newValue); // Если длина меньше maxLength, просто обновляем
    }
  };

  return (
    <div className={cn("input-wrapper")}>
      <div className="input-container">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            name={name}
            id={id}
            required={required}
            data-size={size}
            data-full-width={isFullWidth ? "true" : "false"}
            data-disabled={disabled ? "true" : "false"}
            data-error={error ? "true" : "false"}
            className={cn("input", {
              className,
              "input--error": error,
              "input--disabled": disabled,
              "input--full-width": isFullWidth,
            })}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
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
};

export default InputField;
