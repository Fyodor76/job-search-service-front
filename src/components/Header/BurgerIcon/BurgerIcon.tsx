"use client";
import React, { useState } from "react";
import block from "bem-cn-lite";
import { Sidebar } from "../Sidebar/Sidebar";
import Portal from "@/components/Portal/Portal";

const b = block("burger-icon");

interface BurgerIconProps {
  onClick?: () => void;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  return (
    <>
      <div className={b({ open: isOpen })} onClick={toggleMenu}>
        <div className={b("line")}></div>
        <div className={b("line")}></div>
        <div className={b("line")}></div>
      </div>
      <Portal>
        <Sidebar isOpen={isOpen} onClose={toggleMenu} />
      </Portal>
    </>
  );
};

export default BurgerIcon;
