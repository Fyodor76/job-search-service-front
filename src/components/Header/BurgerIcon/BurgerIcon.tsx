"use client";
import React, { useState } from "react";
import block from "bem-cn-lite";
import { Sidebar } from "../Sidebar/Sidebar";

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
      <div
        className={b({ open: isOpen })} // Добавление модификатора open, если состояние true
        onClick={toggleMenu}
      >
        <div className={b("line")}></div>
        <div className={b("line")}></div>
        <div className={b("line")}></div>
      </div>
      <Sidebar isOpen={isOpen} onClose={toggleMenu} />
    </>
  );
};

export default BurgerIcon;
