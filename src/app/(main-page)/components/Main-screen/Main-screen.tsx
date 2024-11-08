import React from "react";
import block from "bem-cn-lite";
import MainScreenPicture from "@/svg/Main-screen-picture";
import Header from "@/components/Header/Header";
import ButtonScrollToService from "./ButtonScrollToService";

const b = block("main-screen");

const MainScreen: React.FC = () => {
  return (
    <div className={b()}>
      <Header />
      <section className={b("container")}>
        <div className={b("content")}>
          <div className={b("title")}>
            <h1>Завлекающий заголовок</h1>
          </div>
          <div className={b("subtitle")}>
            Подзаголовок в одну или пару строк
          </div>
          <div className={b("button-container")}>
            <ButtonScrollToService />
          </div>
        </div>
        <div className={b("image-container")}>
          <MainScreenPicture />
        </div>
      </section>
    </div>
  );
};

export default MainScreen;
