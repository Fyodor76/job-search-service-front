"use client";
import React from "react";

type TestComponentProps = {
  isAuth?: boolean;
};

export const TestComponent = ({ isAuth = false }: TestComponentProps) => {
  // Функция для выполнения запроса
  const handleClick = async () => {
    try {
      const response = await fetch("https://api.job-search-service.ru/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Response data:", response);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return !isAuth ? (
    <div onClick={handleClick}>
      You are not authorized. Click to send a request
    </div>
  ) : null;
};
