import { menu } from "@/const/menu";
import Link from "next/link";
import React from "react";
import cn from "classnames";

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
  return (
    <nav className={cn(className)}>
      <ul className={cn(`${className}__list`)}>
        {menu?.map((item, index) => (
          <li key={index} className={cn(`${className}__item`)}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
