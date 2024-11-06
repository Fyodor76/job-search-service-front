"use client";
import React, { useState } from "react";
import cn from "classnames";
import block from "bem-cn-lite";
import Menu from "./Menu/Menu";
import Logotype from "./Logotype/Logotype";
import Button from "@/ui/Button";
import Modal from "../Modal/Modal";
import ModalLoginTemplate from "@/templates/ModalLoginTemplate/ModalLoginTemplate";

const b = block("header");

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className={cn(b())}>
      <div className={b("container")}>
        <Logotype className={b("logotype")} />
        <Menu className={b("menu")} />
      </div>
      <Button size="medium" className={b("login-button")} onClick={openModal}>
        Войти
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalLoginTemplate />
      </Modal>
    </header>
  );
};

export default Header;
