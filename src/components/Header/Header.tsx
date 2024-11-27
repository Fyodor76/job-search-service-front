import React from "react";
import cn from "classnames";
import block from "bem-cn-lite";
import Menu from "./Menu/Menu";
import Logotype from "./Logotype/Logotype";
import BlockLogin from "./BlockLogin/BlockLogin";
import BurgerContainer from "./BurgerIcon/BurgerIcon";

const b = block("header");

const Header: React.FC = () => {
  return (
    <header className={cn(b())}>
      <div className={b("container")}>
        <div className={b("burger-icon")}>
          <BurgerContainer />
        </div>
        <Logotype className={b("logotype")} />
        <Menu className={b("menu")} />
        {/* <BlockLogin screen="mobile"/> */}
      </div>
      <div className={b("block-login-container")}>
        <BlockLogin screen="desktop"/>
      </div>
    </header>
  );
};

export default Header;
