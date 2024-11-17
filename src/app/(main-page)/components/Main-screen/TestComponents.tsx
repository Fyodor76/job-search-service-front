"use client";
import React from "react";
import apiClient from "../../../../../axios.config";

type TestComponentProps = {
  isAuth?: boolean;
};

export const TestComponent = ({ isAuth = false }: TestComponentProps) => {
  // Функция для выполнения запроса
  const handleClick = async () => {
    try {
      const response = await apiClient.get("/test");
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return !isAuth ? (
    <div onClick={handleClick}>
      You are not authorized. Click to send a request
    </div>
  ) : null;
};
