import React from "react";
import cn from "classnames";
import block from "bem-cn-lite";
import Menu from "./Menu/Menu";
import Logotype from "./Logotype/Logotype";
import BlockLogin from "./BlockLogin/BlockLogin";
import Circle from "../Circle/Circle";

const b = block("header");

const Header: React.FC = () => {
  return (
    <header className={cn(b())}>
      <Circle
        width="110px"
        height="110px"
        clipTop="20%" // Обрезка 10% сверху
        top="-38px"
        left="70px"
      />
      <div className={b("container")}>
        <Logotype className={b("logotype")} />
        <Menu className={b("menu")} />
      </div>
      <BlockLogin />
    </header>
  );
};

export default Header;
