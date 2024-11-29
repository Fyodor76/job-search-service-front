"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => {
  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<{ message: string; type: string; duration: number; position: string }>) => {
      const { message, type, duration, position } = event.detail;

      const toastOptions = {
        position: position as "top-right" | "top-left" | "bottom-right" | "bottom-left",
        autoClose: duration,
      };

      switch (type) {
        case "success":
          toast.success(message, toastOptions);
          break;
        case "error":
          toast.error(message, toastOptions);
          break;
        case "primary":
        default:
          toast(message, toastOptions);
          break;
      }
    };

    window.addEventListener("app-toast", handleToastEvent as EventListener);

    return () => {
      window.removeEventListener("app-toast", handleToastEvent as EventListener);
    };
  }, []);

  return <ToastContainer />;
};
