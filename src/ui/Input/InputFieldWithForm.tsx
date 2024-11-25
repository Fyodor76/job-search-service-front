import React from "react";
import { useController } from "react-hook-form";
import cn from "classnames";

interface InputFieldWithFormProps {
  type: "text" | "email" | "password" | "number" | "tel" | "date" | "textarea";
  placeholder?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  isFullWidth?: boolean;
  name: string;
  required?: boolean;
  icon?: React.ReactNode;
  control: any;
  rules?: object;
  onChange?: (value: string) => void;
  value?: string;
  id?: string;
  maxLength?: number;
  error?: string;
}

const InputFieldWithForm: React.FC<InputFieldWithFormProps> = ({
  type,
  placeholder,
  size = "medium",
  disabled = false,
  className,
  isFullWidth,
  name,
  required = false,
  icon,
  control,
  rules,
  onChange,
  value,
  id,
  maxLength,
  error,
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: value || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    field.onChange(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("input-wrapper", className)}>
      <div className="input-container">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            value={field.value}
            onChange={handleChange}
            onBlur={field.onBlur}
            ref={field.ref}
            name={name}
            id={id}
            required={required}
            data-size={size}
            data-full-width={isFullWidth ? "true" : "false"}
            data-disabled={disabled ? "true" : "false"}
            data-error={fieldState.error ? "true" : "false"}
            className={cn("input", {
              "input--error": fieldState.error,
              "input--disabled": disabled,
              "input--full-width": isFullWidth,
            })}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={field.value}
            onChange={handleChange}
            onBlur={field.onBlur}
            ref={field.ref}
            name={name}
            id={id}
            required={required}
            data-size={size}
            data-full-width={isFullWidth ? "true" : "false"}
            data-disabled={disabled ? "true" : "false"}
            data-error={fieldState.error ? "true" : "false"}
            className={cn("input", {
              "input--error": fieldState.error,
              "input--disabled": disabled,
              "input--full-width": isFullWidth,
            })}
            disabled={disabled}
          />
        )}
        {icon && field.value && <span className="input-icon">{icon}</span>}
      </div>
      {fieldState.error && (
        <div className="input-error">{fieldState.error?.message || error}</div>
      )}
    </div>
  );
};

export default InputFieldWithForm;
