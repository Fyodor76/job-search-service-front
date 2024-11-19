"use client";
import React, { useState } from "react";
import block from "bem-cn-lite";

const b = block("burger-icon");

interface BurgerIconProps {
  onClick?: () => void;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick(); // Вызов внешней функции, если она передана
  };

  return (
    <div
      className={b({ open: isOpen })} // Добавление модификатора open, если состояние true
      onClick={toggleMenu}
    >
      <div className={b("line")}></div>
      <div className={b("line")}></div>
      <div className={b("line")}></div>
    </div>
  );
};

export default BurgerIcon;
