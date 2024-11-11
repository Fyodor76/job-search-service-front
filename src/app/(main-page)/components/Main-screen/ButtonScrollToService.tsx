"use client";

import Button from "@/ui/Button/Button";
import block from "bem-cn-lite";

const b = block("main-screen");

const ButtonScrollToService = () => {
  const scrollToServiceSection = () => {
    const targetElement = document.getElementById("services-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      size="large"
      className={b("choose-service-button")}
      onClick={scrollToServiceSection}
    >
      Выбрать услугу
    </Button>
  );
};

export default ButtonScrollToService;
