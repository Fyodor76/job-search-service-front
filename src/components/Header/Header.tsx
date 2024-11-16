import React from "react";
import cn from "classnames";
import block from "bem-cn-lite";
import Menu from "./Menu/Menu";
import Logotype from "./Logotype/Logotype";
import BlockLogin from "./BlockLogin/BlockLogin";

const b = block("header");

const Header: React.FC = () => {
  return (
    <header className={cn(b())}>
      <div className={b("container")}>
        <Logotype className={b("logotype")} />
        <Menu className={b("menu")} />
      </div>
      <BlockLogin />
    </header>
  );
};

export default Header;
