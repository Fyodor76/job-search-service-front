import React from "react";
import { useController, Control } from "react-hook-form";
import cn from "classnames";
import "./Checkbox.scss";
import CheckedIcon from "@/svg/CheckedIcon"; // Импортируем вашу иконку

interface CheckboxProps {
  label?: React.ReactNode; // Сделаем label необязательным
  name: string;
  control: Control<any>;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rules?: object;
  id?: string; // Добавляем id в интерфейс
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  control,
  required = false,
  disabled = false,
  className,
  rules,
  id, // Добавляем id в пропсы
}) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules,
    defaultValue: false,
  });

  return (
    <div className={cn("checkbox-wrapper", className)}>
      <div className="checkbox-container">
        <div>
          <input
            id={id} // Передаем id в input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            ref={ref}
            name={name}
            required={required}
            disabled={disabled}
            className="checkbox-input"
          />
          <span
            className={cn("custom-checkbox", {
              checked: value, // Класс, когда чекбокс отмечен
              disabled: disabled, // Класс для disabled
            })}
          >
            {value && <CheckedIcon />}
          </span>
        </div>
        {label && (
          <label htmlFor={id} className="checkbox-label">
            {label}
          </label>
        )}
      </div>

      {/* Позиционируем ошибку ниже */}
      {fieldError && <div className="checkbox-error">{fieldError.message}</div>}
    </div>
  );
};

export default Checkbox;
