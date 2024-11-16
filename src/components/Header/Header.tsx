import React from "react";
import cn from "classnames";
import block from "bem-cn-lite";
import Menu from "./Menu/Menu";
import Logotype from "./Logotype/Logotype";
import BlockLogin from "./BlockLogin/BlockLogin";
import { checkAuth } from "@/helpers/auth";

const b = block("header");

const Header: React.FC = async () => {
  const { isAuth } = await checkAuth();

  console.log(isAuth, 'isAuth')

  return (
    <header className={cn(b())}>
      <div className={b("container")}>
        <Logotype className={b("logotype")} />
        <Menu className={b("menu")}/>
      </div>
      <BlockLogin isAuth={isAuth}/>
    </header>
  );
};

export default Header;
