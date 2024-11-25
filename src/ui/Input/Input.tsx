import React from "react";
import { Control } from "react-hook-form";
import "./Input.scss";
import InputFieldWithForm from "./InputFieldWithForm";
import InputField from "./InputField";

interface InputProps {
  type: "text" | "email" | "password" | "number" | "tel" | "date" | "textarea";
  placeholder?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  error?: string;
  className?: string;
  isFullWidth?: boolean;
  name: string; // Имя обязательно для работы с useController
  required?: boolean;
  icon?: React.ReactNode;
  control?: Control<any>; // Параметр для использования с react-hook-form
  rules?: object;
  onChange?: (value: string) => void; // Обычный onChange
  value?: string;
  maxLength?: number;
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
  icon,
  control,
  rules,
  onChange,
  error,
  value,
  maxLength,
}) => {
  const isControlled = Boolean(control);

  return isControlled ? (
    <InputFieldWithForm
      {...{
        type,
        placeholder,
        size,
        disabled,
        className,
        isFullWidth,
        name,
        required,
        icon,
        control,
        rules,
        onChange,
        value,
        maxLength,
        error,
      }}
    />
  ) : (
    <InputField
      {...{
        type,
        placeholder,
        size,
        disabled,
        className,
        isFullWidth,
        name,
        required,
        icon,
        onChange,
        value,
        maxLength,
        error,
      }}
    />
  );
};
