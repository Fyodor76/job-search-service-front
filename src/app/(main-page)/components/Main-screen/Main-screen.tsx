import React from "react";
import block from "bem-cn-lite";
import Button from "@/ui/Button/Button";
import MainScreenPicture from "@/svg/Main-screen-picture";

const b = block("main-screen");

const MainScreen: React.FC = () => {
  return (
    <section className={b()}>
      <div className={b("content")}>
        <div className={b("title")}>
          <h1>Завлекающий заголовок</h1>
        </div>
        <div className={b("subtitle")}>Подзаголовок в одну или пару строк</div>
        <div className={b("button-container")}>
          <Button size="medium" className={b("choose-service-button")}>
            Выбрать услугу
          </Button>
        </div>
      </div>
      <div className={b("image-container")}>
        <MainScreenPicture />
      </div>
    </section>
  );
};

export default MainScreen;
